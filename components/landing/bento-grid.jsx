"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Animation variants for each grid item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};



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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        // Core grid layout: 1 col on mobile, 3 on desktop
        "grid w-full grid-cols-1 gap-6 md:grid-cols-3",
        // Defines 6 explicit rows on medium screens and up (for proper 50/50 middle split)
        "md:grid-rows-[repeat(6,minmax(180px,1fr))]",
        className
      )}
    >
      {/* Left Column - 3 blocks, each spanning 2 rows */}
      {/* Slot 1: Left Top - Col 1, Rows 1-2 */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2"
      >
        {leftTop}
      </motion.div>

      {/* Slot 2: Middle Top (Doctor) - Col 2, Rows 1-3 (50% of column) */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-3"
      >
        {middleTop}
      </motion.div>

      {/* Slot 3: Right Top - Col 3, Rows 1-2 */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-2"
      >
        {rightTop}
      </motion.div>

      {/* Slot 4: Left Middle - Col 1, Rows 3-4 */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-1 md:col-span-1 md:row-start-3 md:row-span-2"
      >
        {leftMiddle}
      </motion.div>

      {/* Slot 5: Right Middle - Col 3, Rows 3-4 */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-2"
      >
        {rightMiddle}
      </motion.div>

      {/* Slot 6: Left Bottom - Col 1, Rows 5-6 */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-1 md:col-span-1 md:row-start-5 md:row-span-2"
      >
        {leftBottom}
      </motion.div>

      {/* Slot 7: Middle Bottom - Col 2, Rows 4-6 (50% of column) */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-2 md:col-span-1 md:row-start-4 md:row-span-3"
      >
        {middleBottom}
      </motion.div>

      {/* Slot 8: Right Bottom - Col 3, Rows 5-6 */}
      <motion.div
        variants={itemVariants}
        className="md:col-start-3 md:col-span-1 md:row-start-5 md:row-span-2"
      >
        {rightBottom}
      </motion.div>
    </motion.section>
  );
};