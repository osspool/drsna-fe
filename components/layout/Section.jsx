"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BackgroundRippleEffect } from "../aceternity/background-ripple-effect";

export function Section({
  children,
  className,
  id,
  background = "default",
  padding = "default",
  animate = false,
  ripple = false,
}) {
  const backgrounds = {
    default: "bg-background",
    white: "bg-white",
    cream: "bg-[var(--cream)]",
    "gradient-cream": "bg-gradient-to-b from-cream/30 via-white to-cream/20",
    dark: "bg-dark-gradient text-white",
    gold: "bg-gold-gradient",
    muted: "bg-muted",
  };

  const paddings = {
    none: "",
    sm: "py-12 md:py-16",
    default: "py-16 md:py-24",
    lg: "py-24 md:py-32",
    xl: "py-32 md:py-40",
  };

  const content = (
    <section
      id={id}
      className={cn(backgrounds[background], paddings[padding], className)}
    >
      {children}
    </section>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  if (ripple) {
    return (
      <section className="">
        <BackgroundRippleEffect />
        {content}
      </section>
    );
  }

  return content;
}
