"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { usePerfProfile } from "@/hooks/use-perf-profile";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-sm text-gray-500 animate-pulse font-mono">Loading 3D Engine...</span>
    </div>
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallbackImage?: string;
}

export default function SplineScene({ scene, className, fallbackImage }: SplineSceneProps) {
  const { reducedMotion, disable3D } = usePerfProfile();

  // Fallback for accessibility and low-end devices
  if (reducedMotion || disable3D) {
    return (
      <div className={className}>
        {fallbackImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={fallbackImage} 
            alt="3D Scene Static Fallback" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-black/20 flex items-center justify-center">
            <span className="text-gray-600 font-mono text-sm">3D Disabled (Reduced Motion)</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Suspense fallback={<div>Loading 3D...</div>}>
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
}