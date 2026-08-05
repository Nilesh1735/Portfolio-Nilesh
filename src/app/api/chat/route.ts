import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { SYSTEM_PROMPT } from "@/data/knowledge";

// DeepSeek is OpenAI-API compatible, so we point the OpenAI provider at its base URL.
const deepseek = process.env.DEEPSEEK_API_KEY
  ? createOpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com/v1",
    })
  : null;

// Basic in-memory rate limit (per warm instance) to keep costs bounded.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const MAX_MESSAGES = 12;
const MAX_CHARS = 2000;

type IncomingMessage = { role: "user" | "assistant"; content: unknown };

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many messages. Please slow down and try again shortly." },
        { status: 429 },
      );
    }

    if (!deepseek) {
      return Response.json(
        { error: "The AI assistant is not configured yet (missing DEEPSEEK_API_KEY)." },
        { status: 503 },
      );
    }

    const body = await req.json().catch(() => null);
    const rawMessages = body?.messages;
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    // Sanitize: only keep user/assistant text roles, cap length and count.
    const messages: ModelMessage[] = (rawMessages as IncomingMessage[])
      .filter(
        (m) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string",
      )
      .slice(-MAX_MESSAGES)
      .map((m) => ({
        role: m.role,
        content: (m.content as string).slice(0, MAX_CHARS),
      }));

    if (messages.length === 0) {
      return Response.json({ error: "No valid messages provided." }, { status: 400 });
    }

    const result = streamText({
      model: deepseek("deepseek-chat"),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.4,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
