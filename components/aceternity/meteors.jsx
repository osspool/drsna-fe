"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";
import { ClientOnly } from "@/components/custom/ui/client-only";

/**
 * Meteors Component
 * Uses ClientOnly wrapper (React 19.2 best practice) instead of useEffect
 * for better performance and proper SSR handling
 */

function MeteorsContent({ number = 20, className }) {
  // Generate random styles on the client side
  const meteorStyles = new Array(number).fill(true).map(() => ({
    left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
    animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
    animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteorStyles.map((style, idx) => {
        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-linear-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: 0,
              ...style,
            }}
          ></span>
        );
      })}
    </motion.div>
  );
}

export const Meteors = ({ number, className }) => {
  return (
    <ClientOnly>
      <MeteorsContent number={number} className={className} />
    </ClientOnly>
  );
};
