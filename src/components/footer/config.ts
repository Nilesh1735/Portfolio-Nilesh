import { config } from "@/data/config";

// Sourced from config so these can never drift from the rest of the site.
const footer: { title: string; href: string }[] = [
  {
    title: "AgentNine",
    href: "https://agentnine.pro",
  },
  {
    title: "GitHub",
    href: config.social.github,
  },
  {
    title: "LinkedIn",
    href: config.social.linkedin,
  },
];

export { footer };