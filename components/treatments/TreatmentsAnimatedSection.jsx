"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AnimatedSectionHeader({ title, subtitle, badge }) {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">
          {badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

export function AnimatedFeatureList({ items }) {
  return (
    <div className="space-y-6">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="flex gap-4"
        >
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-primary rounded-full" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function AnimatedImage({ src, alt, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      {/* Image content will be passed as children */}
    </motion.div>
  );
}

export function AnimatedContent({ children, direction = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
