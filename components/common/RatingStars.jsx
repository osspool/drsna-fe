"use client";

import { Star } from "lucide-react";
import { cn, generateStableKey } from "@/lib/utils";

/**
 * Reusable RatingStars Component
 *
 * Displays star ratings with consistent styling.
 *
 * @param {Object} props
 * @param {number} props.rating - Rating value (default: 5)
 * @param {number} props.maxRating - Maximum rating (default: 5)
 * @param {string} props.size - Size variant: 'sm' | 'md' | 'lg'
 * @param {string} props.color - Star color class (default: "text-primary fill-primary")
 * @param {string} props.className - Custom container styling
 * @param {boolean} props.showValue - Show rating value text (default: false)
 * @param {string} props.valueClassName - Custom value text styling
 */
export function RatingStars({
  rating = 5,
  maxRating = 5,
  size = "md",
  color = "text-primary fill-primary",
  className,
  showValue = false,
  valueClassName,
}) {
  // Size variants
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const starCount = Math.min(Math.max(0, Math.floor(rating)), maxRating);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={generateStableKey("rating-star", i, "rating-star")}
            className={cn(
              sizeClasses[size],
              i < starCount ? color : "text-muted-foreground"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn("text-sm font-medium text-foreground ml-1", valueClassName)}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
