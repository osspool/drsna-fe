"use client";

import { cn } from "@/lib/utils";
import { IconBox } from "./IconBox";
import { CheckCircle2 } from "lucide-react";

/**
 * Feature Item Component
 *
 * Compact feature/benefit item with icon and text.
 * Used in lists, grids, and comparison sections.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Custom icon component
 * @param {string} props.text - Feature text
 * @param {'horizontal'|'vertical'} [props.layout='horizontal'] - Layout direction
 * @param {'default'|'card'} [props.variant='default'] - Style variant
 * @param {string} [props.className] - Additional classes
 */
export function FeatureItem({
  icon,
  text,
  layout = "horizontal",
  variant = "default",
  className,
}) {
  const Icon = icon || CheckCircle2;

  const layoutClasses = {
    horizontal: "flex items-center gap-3",
    vertical: "flex flex-col items-center text-center gap-2",
  };

  const variantClasses = {
    default: "",
    card: "bg-card rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20",
  };

  return (
    <div className={cn(layoutClasses[layout], variantClasses[variant], "group", className)}>
      <div className="shrink-0">
        <IconBox size="sm" variant="default" hoverScale={variant === "card"}>
          {typeof Icon === "function" ? <Icon className="w-5 h-5" /> : Icon}
        </IconBox>
      </div>
      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
        {text}
      </p>
    </div>
  );
}
