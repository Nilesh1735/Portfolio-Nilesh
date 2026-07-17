"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Omit native drag events to prevent conflict with Framer Motion's onDrag
interface MagneticButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  strength?: number;
  children: React.ReactNode;
}

const MagneticButton = React.forwardRef<HTMLDivElement, MagneticButtonProps>(
  ({ strength = 0.3, children, className, ...props }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 200, damping: 15, mass: 0.1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={ref}
        style={{ x: xSpring, y: ySpring }}
        className={className ? `inline-block ${className}` : "inline-block"}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;