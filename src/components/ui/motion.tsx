"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

// Standard editorial spring / cubic-bezier curve
const easeOutCubic = [0.22, 1, 0.36, 1] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 32,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (shouldReduceMotion || !mounted) {
    return <div className={className}>{children}</div>;
  }

  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "scale":
        return { opacity: 0, scale: 0.94 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "scale":
        return { opacity: 1, scale: 1 };
      case "fade":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: easeOutCubic,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered list container
export function ScrollStaggerContainer({
  children,
  className,
  staggerDelay = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (shouldReduceMotion || !mounted) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className,
  yOffset = 28,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOutCubic,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// Gentle floating animation for hero specimen
export function MotionFloatingNotebook({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (shouldReduceMotion || !mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.9,
        ease: easeOutCubic,
      }}
      className={className}
    >
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotateZ: [-0.4, 0.4, -0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function MotionScaleOnHover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
