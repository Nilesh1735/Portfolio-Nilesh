"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react"; // Switched from react-icons to lucide-react
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

const SocialMediaButtons = () => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={config.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="GitHub"
      >
        <Github className="w-5 h-5" />
      </Link>
      <Link
        href={config.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </Link>
    </div>
  );
};

export default SocialMediaButtons;