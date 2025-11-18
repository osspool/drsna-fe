"use client";

import { cn } from "@/lib/utils";

/**
 * Animated Card Component
 *
 * Reusable card with hover effects, gradients, and animations.
 * Use this as the base for all card-style components.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional classes
 * @param {'default'|'glass'|'gradient'|'bordered'} [props.variant='default'] - Card style variant
 * @param {boolean} [props.hover=true] - Enable hover effects
 * @param {boolean} [props.hoverGradient=false] - Show gradient on hover
 */
export function AnimatedCard({
  children,
  className,
  variant = "default",
  hover = true,
  hoverGradient = false,
}) {
  const variants = {
    default: "bg-card border border-border",
    glass: "bg-card/50 backdrop-blur-sm border-border/50",
    gradient: "bg-linear-to-br from-card to-secondary/30 border border-primary/10",
    bordered: "bg-card border-2 border-border",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 overflow-hidden transition-all duration-300",
        variants[variant],
        hover && "hover:shadow-xl hover:border-primary/30",
        "group",
        className
      )}
    >
      {/* Hover gradient overlay */}
      {hoverGradient && (
        <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner accent on hover */}
      {hover && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
    </div>
  );
}
