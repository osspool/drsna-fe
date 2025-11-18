"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A responsive, animated 3-column bento grid layout component.
 * It arranges eight content slots in a 3-column layout:
 * - Left column: 3 blocks (each spanning 2 rows)
 * - Middle column: 2 blocks (each spanning 3 rows - 50/50 split)
 * - Right column: 3 blocks (each spanning 2 rows)
 * Grid uses 6 rows total to enable perfect 50/50 split in middle column.
 */
export const BentoGridShowcase = ({
  leftTop,
  leftMiddle,
  leftBottom,
  middleTop,
  middleBottom,
  rightTop,
  rightMiddle,
  rightBottom,
  className,
}) => {
  return (
    <section
      className={cn(
        // Core grid layout: 1 col on mobile, 3 on desktop
        "grid w-full grid-cols-1 gap-6 md:grid-cols-3",
        // Defines 6 explicit rows on medium screens and up (for proper 50/50 middle split)
        "md:grid-rows-[repeat(6,minmax(180px,1fr))]",
        "opacity-0 animate-fade-in",
        className
      )}
    >
      {/* Left Column - 3 blocks, each spanning 2 rows */}
      {/* Slot 1: Left Top - Col 1, Rows 1-2 */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2"
        style={{ animationDelay: '0ms' }}
      >
        {leftTop}
      </div>

      {/* Slot 2: Middle Top (Doctor) - Col 2, Rows 1-3 (50% of column) */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-3"
        style={{ animationDelay: '100ms' }}
      >
        {middleTop}
      </div>

      {/* Slot 3: Right Top - Col 3, Rows 1-2 */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-2"
        style={{ animationDelay: '200ms' }}
      >
        {rightTop}
      </div>

      {/* Slot 4: Left Middle - Col 1, Rows 3-4 */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-2"
        style={{ animationDelay: '300ms' }}
      >
        {leftMiddle}
      </div>

      {/* Slot 5: Right Middle - Col 3, Rows 3-4 */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-2"
        style={{ animationDelay: '400ms' }}
      >
        {rightMiddle}
      </div>

      {/* Slot 6: Left Bottom - Col 1, Rows 5-6 */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-1 md:col-span-1 md:row-start-5 md:row-span-2"
        style={{ animationDelay: '500ms' }}
      >
        {leftBottom}
      </div>

      {/* Slot 7: Middle Bottom - Col 2, Rows 4-6 (50% of column) */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-2 md:col-span-1 md:row-start-4 md:row-span-3"
        style={{ animationDelay: '600ms' }}
      >
        {middleBottom}
      </div>

      {/* Slot 8: Right Bottom - Col 3, Rows 5-6 */}
      <div
        className="opacity-0 animate-fade-in-up md:col-start-3 md:col-span-1 md:row-start-5 md:row-span-2"
        style={{ animationDelay: '700ms' }}
      >
        {rightBottom}
      </div>
    </section>
  );
};