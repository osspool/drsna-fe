"use client";

import { cn } from "@/lib/utils";
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
    white: "bg-card",
    "royal-blue": "bg-royal-blue",
    "royal-blue-900": "bg-royal-blue-900",
    "foreground": "bg-foreground",
    cream: "bg-secondary",
    "gradient-cream": "bg-linear-to-b from-secondary/30 via-background to-secondary/20",
    gold: "bg-primary",
    muted: "bg-muted/70",
    "muted-dark": "bg-muted"
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
      <div
        className="opacity-0 animate-fade-in-up"
      >
        {content}
      </div>
    );
  }

  if (ripple) {
    return (
      <section className="relative overflow-hidden">
        <BackgroundRippleEffect />
        {content}
      </section>
    );
  }

  return content;
}
