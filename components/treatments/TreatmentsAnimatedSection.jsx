"use client";

import { Sparkles } from "lucide-react";

export function AnimatedSectionHeader({ title, subtitle, badge }) {
  return (
    <div className="text-center mb-16">
      <div
        className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">
          {badge}
        </span>
      </div>

      <h2
        className="opacity-0 animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6"
        style={{ animationDelay: '100ms' }}
      >
        {title}
      </h2>

      <p
        className="opacity-0 animate-fade-in text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
        style={{ animationDelay: '200ms' }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export function AnimatedFeatureList({ items }) {
  return (
    <div className="space-y-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="opacity-0 animate-fade-in-up flex gap-4"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-primary rounded-full" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold text-primary mb-2">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AnimatedImage({ src, alt, className }) {
  return (
    <div
      className={`opacity-0 animate-slide-in-right ${className}`}
    >
      {/* Image content will be passed as children */}
    </div>
  );
}

export function AnimatedContent({ children, direction = "left" }) {
  return (
    <div
      className={`opacity-0 ${direction === "left" ? "animate-slide-in-left" : "animate-slide-in-right"}`}
    >
      {children}
    </div>
  );
}
