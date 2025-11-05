"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundLines = ({ children, className, svgOptions }) => {
  return (
    <div className={cn("relative flex items-center justify-center w-full", className)}>
      <Svg svgOptions={svgOptions} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const Svg = ({ svgOptions }) => {
  const defaultOptions = {
    duration: 10,
    size: 100,
    ...svgOptions,
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full opacity-10">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#cda55c", stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: "#e6c89f", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        {[...Array(20)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${(i * defaultOptions.size) / 20}%`}
            y1="0%"
            x2={`${(i * defaultOptions.size) / 20}%`}
            y2="100%"
            stroke="url(#grad1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: defaultOptions.duration,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
    </div>
  );
};
