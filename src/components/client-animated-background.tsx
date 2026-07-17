"use client";

import dynamic from "next/dynamic";

// Dynamically import the AnimatedBackground, disabling SSR for this component only
const AnimatedBackground = dynamic(() => import("@/components/animated-background"), {
  ssr: false,
  loading: () => null, // Return null while loading so it doesn't block the layout
});

export default function ClientAnimatedBackground() {
  return <AnimatedBackground />;
}