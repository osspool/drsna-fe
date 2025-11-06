"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Glow from "@/components/custom/ui/glow";
import { Check, Clock } from "lucide-react";

export function WhatToExpectBlock({ data }) {
  const {
    title,
    subtitle,
    description,
    steps = [],
    background = "white",
    variant = "timeline",
    enabled = true,
  } = data;

  if (!enabled) return null;

  // Compact Timeline Variant
  if (variant === "compact-timeline") {
    return (
      <Section background={background} padding="none" ripple={true}>
        <div className="relative flex w-full flex-col items-start justify-start overflow-hidden py-16 md:py-24">
          {/* Glow Effect */}
          <Glow variant="center" className="opacity-30" />

          {/* Content Layer */}
          <Container className="relative z-10 w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 max-w-3xl mx-auto"
            >
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-base md:text-lg text-primary font-medium mb-2">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-sm md:text-base text-muted-foreground">
                  {description}
                </p>
              )}
            </motion.div>

            {/* Compact Step Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="group h-full bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/10 hover:border-primary/30">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70 font-semibold">
                          Step
                        </p>
                        <div className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary font-semibold">
                          {step.number || index + 1}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                          Duration
                        </p>
                        {step.duration ? (
                          <div className="mt-1 flex items-center justify-end gap-1.5 text-xs font-medium text-primary">
                            <Clock className="h-3.5 w-3.5" />
                            {step.duration}
                          </div>
                        ) : (
                          <div className="mt-1 text-xs text-muted-foreground/50">Varies</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <div className="rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Quick & Professional</h4>
                    <p className="text-sm text-muted-foreground">
                      The entire appointment takes under an hour, and you can return to normal activities immediately.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </div>
      </Section>
    );
  }

  // Default Timeline Variant
  return (
    <Section background={background} padding="none" ripple={true}>
      <div className="relative flex w-full flex-col items-start justify-start overflow-hidden py-16 md:py-24">
        {/* Glow Effect */}
        <Glow variant="center" className="opacity-30" />

        {/* Content Layer */}
        <Container className="relative z-10 w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-primary font-medium mb-2">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-base text-muted-foreground">
                {description}
              </p>
            )}
          </motion.div>

          {/* Timeline Steps */}
          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 group"
              >
                {/* Step Number */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-card shadow-lg border border-primary/20 flex items-center justify-center text-primary font-bold">
                    {step.number || index + 1}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="h-full bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/10 hover:border-primary/30">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/70 font-semibold">
                          Phase {step.number || index + 1}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>

                        {/* Tips */}
                        {step.tips && step.tips.length > 0 && (
                          <div className="mt-4 space-y-2 rounded-2xl bg-secondary/60 p-3">
                            {step.tips.map((tip, tipIndex) => (
                              <div key={tipIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <Check className="mt-0.5 h-3.5 w-3.5 text-primary" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Duration */}
                      <div className="shrink-0 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-center">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                          Time
                        </div>
                        {step.duration ? (
                          <div className="mt-2 flex items-center justify-center gap-1 text-sm font-semibold text-primary">
                            <Clock className="h-4 w-4" />
                            {step.duration}
                          </div>
                        ) : (
                          <div className="mt-2 text-sm text-muted-foreground/70">Varies</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
