"use client";
import React, { useState, useEffect, useRef } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  variant = "default",
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(var(--primary)) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(var(--primary)) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(var(--primary)) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(var(--primary)) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  const variantStyles = {
    default: {
      container: "bg-card/20 hover:bg-card/10 text-foreground border-border",
      inner: "bg-card text-foreground",
      fill: "bg-card",
      highlight:
        "radial-gradient(75% 181.15942028985506% at 50% 50%, hsl(var(--primary) / 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
    },
    dark: {
      container: "bg-black/20 hover:bg-black/10 text-white border-white/10",
      inner: "bg-black text-white",
      fill: "bg-black",
      highlight:
        "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)",
    },
    light: {
      container: "bg-white/70 hover:bg-white text-dark-brown/80 border-white/70",
      inner: "bg-white text-dark-brown",
      fill: "bg-white/90",
      highlight:
        "radial-gradient(75% 181% at 50% 50%, rgba(255,237,199,0.9) 0%, rgba(255,255,255,0) 85%)",
    },
  };

  const tones = variantStyles[variant] || variantStyles.default;
  const highlight = tones.highlight;

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return (
    <Tag
      onMouseEnter={(event) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        tones.container,
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto z-10 px-4 py-2 rounded-[inherit]",
          tones.inner,
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div
        className={cn(
          "absolute z-1 flex-none inset-[2px] rounded-[inherit]",
          tones.fill
        )}
      />
    </Tag>
  );
}
