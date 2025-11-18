"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

/**
 * CheckItem Component
 *
 * Reusable check/list item with icon and hover effects.
 * Used for growth factors, bullet lists, and similar patterns.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Item content
 * @param {string} [props.className] - Additional classes
 * @param {'default'|'compact'} [props.variant] - Size variant
 */
export function CheckItem({
  children,
  className,
  variant = "default",
}) {
  const variants = {
    default: "p-4 gap-3",
    compact: "p-3 gap-2",
  };

  return (
    <div
      className={cn(
        "flex items-center bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group",
        variants[variant],
        className
      )}
    >
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
          <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {children}
        </p>
      </div>
    </div>
  );
}
