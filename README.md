# Nilesh Raj — Portfolio

A fast, quiet, dark portfolio for [Nilesh Raj](https://github.com/Nilesh1735), Founder and AI Engineer at [AgentNine](https://agentnine.pro).

Built with Next.js 16, React 19 and TypeScript. The motion is plain CSS, there is no animation library, and nothing on the page uses `backdrop-filter`. That is deliberate, and the reason it holds 60fps while scrolling.

**Live:** https://nileshraj-portfolio.vercel.app

## Performance

Measured in a headless Chromium throttled to 4x slower CPU, which approximates a mid-range laptop:

| Metric | Value |
|---|---|
| Scroll | 61fps, 17ms worst frame |
| Long tasks | 0 |
| Transferred | 116KB |
| DOM nodes | 330 |
| First Contentful Paint | 330-830ms across runs |

Scroll, long tasks, transfer size and node count are stable run to run.
First paint is not: it swings with server cold-start and with whatever
else the machine is doing, so it is quoted as a range rather than a
flattering single number.

How it stays there, in rough order of how much each mattered:

- **No blur.** `backdrop-filter` and large `blur()` radii are the most expensive things you can put on a page that moves. An earlier revision of this site ran at 24fps; removing blur, box shadows and a particle canvas accounted for most of the gap.
- **No animation library and no scroll-driven animation.** Entrance motion is CSS keyframes fired once on load with staggered delays. Nothing recalculates on scroll.
- **Only `transform` and `opacity` animate**, so every transition runs on the compositor rather than triggering layout or paint.
- **No icon CDN.** The skill list is text, not 23 SVGs fetched from a third party on every page load.
- **Images are WebP**, sized close to their display size, and letterboxed to the card aspect so the browser never scales or crops at runtime.

## Features

- **Hero** with the name set on an SVG arc and a portrait that swaps to a blushing variant on hover, cross-faded on opacity alone.
- **Highlights** with a pill filter across `agentic ai`, `rag`, `ml`, `web` and `books`. Nothing selected shows every project; `books` swaps the panel for the reading list.
- **Experience** with per-role disclosures that animate their height via `grid-template-rows: 0fr -> 1fr`, the only way to transition to an unknown height without measuring it in JavaScript. Collapsed panels are `inert`, so their contents stay out of the tab order and the accessibility tree.
- **GitHub activity** pulled live from the GitHub API: stars, repository count, followers, contribution graph and top repositories. The section hides itself entirely if the API is unreachable or rate-limited.
- **"Ask my portfolio" assistant**, a streamed chatbot (DeepSeek through the OpenAI-compatible Vercel AI SDK) grounded only in `src/data/knowledge.ts`.
- **Accessibility:** one `<h1>` per route, alt text on every image, visible focus rings on every interactive element, and all motion disabled under `prefers-reduced-motion` without leaving any content hidden.

## Tech stack

| Layer | What |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS, a few Radix primitives |
| Type | Inter (400/500 only, no bold) and Instrument Serif |
| Motion | CSS keyframes and transitions. No GSAP, no Lenis, no Framer Motion |
| AI chat | Vercel AI SDK with DeepSeek |
| Email | Resend (see the note under Environment) |
| Hosting | Vercel |

## Getting started

```bash
git clone https://github.com/Nilesh1735/Portfolio-Nilesh.git
cd Portfolio-Nilesh
npm install
cp .env.example .env.local   # then fill in what you need
npm run dev
```

Open http://localhost:3000. Node 18 or newer.

### Environment

Every variable is optional. The site renders fully without any of them; the features below simply switch off.

| Variable | Enables |
|---|---|
| `DEEPSEEK_API_KEY` | The "ask my portfolio" assistant. Without it the chat replies that it is unavailable. |
| `RESEND_API_KEY` | The `/api/send` contact endpoint. Note that the `/contact` page is a list of links and does not post to it, so this is unused unless you wire a form back up. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics. |
| `UMAMI_DOMAIN`, `UMAMI_SITE_ID` | Umami analytics. Both are required together. |

## Making it yours

Everything personal lives in `src/data`:

| File | Holds |
|---|---|
| `config.ts` | Name, title, email, site URL, social links, SEO keywords, and the GitHub repo the activity section features |
| `constants.ts` | Work experience. The experience section renders straight from here |
| `highlights.ts` | Projects: title, blurb, categories, card image, live and code links |
| `stack.ts` | The grouped skill stack, education, certifications and books |
| `knowledge.ts` | The grounding text and system prompt for the AI assistant. Keep it in step with the rest, or the bot will contradict the page |

Assets:

| Path | What |
|---|---|
| `public/images/avatar.webp` | Hero portrait, resting state |
| `public/images/avatar-blush.webp` | Hero portrait, hover state |
| `src/app/icon.png`, `favicon.ico`, `apple-icon.png` | Tab and touch icons. Generated from the resting portrait so they match |
| `public/resume.pdf` | Served by the `/resume` route |
| `public/images/*.webp` | Project card images, 16:10 |
| `public/llms.txt` | Plain-text summary for language models |

The Open Graph and Twitter preview images are generated at request time from `src/app/opengraph-image.tsx`. If you edit them, give every element with more than one child an explicit `display`, because Satori throws without it and the route then returns nothing at all.

## Routes

| Route | |
|---|---|
| `/` | Hero, highlights, GitHub activity, experience, skill stack, education |
| `/about` | Long-form bio |
| `/contact` | Email, LinkedIn, GitHub, AgentNine |
| `/resume` | Embedded PDF viewer |

## Notes for anyone picking this up

- **The site is dark only.** A light palette still exists in `globals.css`, but no theme toggle is mounted.
- **There is unused code in the tree.** An earlier revision of this portfolio used Spline, ReactFlow, GSAP ScrollTrigger, Lenis, a particle canvas, a custom cursor and a realtime chat. Those are gone from the rendered site, but roughly 60 modules remain unreachable in `src/components`. They are tree-shaken, so visitors never download them.
- **Some dependencies are now dead too**, `gsap`, `lenis`, `@splidejs/react-splide` and `canvas-confetti` among them. They can be uninstalled once the unused modules go.

## Credits

Originally based on the [3d-portfolio](https://github.com/Naresh-Khatri/3d-portfolio) template by [Naresh Khatri](https://github.com/Naresh-Khatri). Little of that template survives in the current design, but it was the starting point and deserves the credit.

Licensed MIT, inherited from that template. No `LICENSE` file is committed yet; add one if you want the terms stated explicitly in the repo.
