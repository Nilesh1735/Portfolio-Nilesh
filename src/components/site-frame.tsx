"use client";

import { usePathname } from "next/navigation";
import SiteNav from "@/components/v2/site-nav";
import Footer from "@/components/footer/footer";
import AiChat from "@/components/ai-chat";

/**
 * App shell.
 *
 * The decorative overlay stack (particle canvas, elastic cursor, radial
 * menu, scroll spotlight, GSAP scroll-pinning, smooth-scroll) is
 * deliberately not mounted here. Those were measured as the cause of the
 * old design's scroll jank — the particle canvas alone cost ~9fps, and
 * every one of them competes for the same frame budget. The components
 * are still in the repo if any of them is wanted back.
 */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/components") ?? false;

  if (bare) return <>{children}</>;

  return (
    <>
      <SiteNav />
      {children}
      <Footer />
      <AiChat />
    </>
  );
}
