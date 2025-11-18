"use client";

import { cn } from "@/lib/utils";

/**
 * Icon Box Component
 *
 * Consistent icon container with size and color variants.
 * Used in cards, lists, and feature sections.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Icon component
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Icon box size
 * @param {'default'|'primary'|'gradient'} [props.variant='default'] - Color variant
 * @param {boolean} [props.hoverScale=false] - Scale on parent hover
 * @param {string} [props.className] - Additional classes
 */
export function IconBox({
  children,
  size = "md",
  variant = "default",
  hoverScale = false,
  className,
}) {
  const sizes = {
    sm: "w-10 h-10 rounded-lg",
    md: "w-12 h-12 rounded-xl",
    lg: "w-14 h-14 rounded-xl",
  };

  const variants = {
    default: "bg-primary/10 text-primary",
    primary: "bg-primary text-primary-foreground",
    gradient: "bg-linear-to-br from-primary/30 to-primary/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center transition-all duration-300",
        sizes[size],
        variants[variant],
        hoverScale && "group-hover:scale-110",
        className
      )}
    >
      {children}
    </div>
  );
}
