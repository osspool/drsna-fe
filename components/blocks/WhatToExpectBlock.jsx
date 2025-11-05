"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Check, Clock } from "lucide-react";

const cardBaseClasses =
  "relative h-full rounded-3xl bg-white/90 backdrop-blur-xl border border-dark-brown/5 shadow-[0px_25px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_35px_80px_rgba(15,23,42,0.18)] overflow-hidden";

const CardShell = ({ children, className = "" }) => (
  <div className={`${cardBaseClasses} ${className}`}>
    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-transparent to-gold/10 opacity-80" />
    <span className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-gold/70 via-gold to-transparent opacity-80" />
    <div className="relative z-10 p-5 md:p-6">{children}</div>
  </div>
);

const SectionChrome = ({ children, accent = "right" }) => (
  <div className="relative overflow-hidden rounded-[40px] border border-gold/10 bg-gradient-to-br from-cream/40 via-white to-gold/5 px-4 py-10 md:px-10">
    <div className="pointer-events-none absolute inset-x-10 top-6 h-24 rounded-full bg-gold/10 blur-3xl" />
    <div
      className={`pointer-events-none absolute ${
        accent === "right" ? "-right-16" : "-left-16"
      } bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl`}
    />
    {children}
  </div>
);

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
      <Section background={background}>
        <SectionChrome accent="right">
          <Container>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 max-w-3xl mx-auto"
            >
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-3">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-base md:text-lg text-gold font-medium mb-2">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-sm md:text-base text-dark-brown/60">
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
                  <CardShell className="group">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-dark-brown/40 font-semibold">
                          Step
                        </p>
                        <div className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gold/15 text-gold font-semibold">
                          {step.number || index + 1}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-dark-brown/40">
                          Duration
                        </p>
                        {step.duration ? (
                          <div className="mt-1 flex items-center justify-end gap-1.5 text-xs font-medium text-gold">
                            <Clock className="h-3.5 w-3.5" />
                            {step.duration}
                          </div>
                        ) : (
                          <div className="mt-1 text-xs text-dark-brown/30">Varies</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <h3 className="text-lg font-semibold text-dark-brown group-hover:text-gold transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-dark-brown/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardShell>
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
              <div className="rounded-3xl border border-gold/20 bg-white/80 p-6 shadow-[0px_25px_65px_rgba(15,23,42,0.08)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark-brown mb-1">Quick & Professional</h4>
                    <p className="text-sm text-dark-brown/70">
                      The entire appointment takes under an hour, and you can return to normal activities immediately.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </SectionChrome>
      </Section>
    );
  }

  // Default Timeline Variant
  return (
    <Section background={background}>
      <SectionChrome accent="left">
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gold font-medium mb-2">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-base text-dark-brown/60">
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
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-[0px_20px_40px_rgba(15,23,42,0.08)] border border-gold/20 flex items-center justify-center text-gold font-bold">
                    {step.number || index + 1}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <CardShell className="group">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-dark-brown/40 font-semibold">
                          Phase {step.number || index + 1}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-dark-brown group-hover:text-gold transition-colors">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm text-dark-brown/70 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Tips */}
                        {step.tips && step.tips.length > 0 && (
                          <div className="mt-4 space-y-2 rounded-2xl bg-cream/60 p-3">
                            {step.tips.map((tip, tipIndex) => (
                              <div key={tipIndex} className="flex items-start gap-2 text-xs text-dark-brown/70">
                                <Check className="mt-0.5 h-3.5 w-3.5 text-gold" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Duration */}
                      <div className="shrink-0 rounded-2xl border border-gold/30 bg-gold/5 px-4 py-3 text-center">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                          Time
                        </div>
                        {step.duration ? (
                          <div className="mt-2 flex items-center justify-center gap-1 text-sm font-semibold text-gold">
                            <Clock className="h-4 w-4" />
                            {step.duration}
                          </div>
                        ) : (
                          <div className="mt-2 text-sm text-dark-brown/40">Varies</div>
                        )}
                      </div>
                    </div>
                  </CardShell>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionChrome>
    </Section>
  );
}
