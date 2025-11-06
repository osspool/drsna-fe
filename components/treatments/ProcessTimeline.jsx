"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Lightbulb,
  Sparkles,
  icons,
} from "lucide-react";

function getIconComponent(icon) {
  if (!icon) return Sparkles;

  const pascal = icon
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");

  return icons[pascal] || Sparkles;
}

export function ProcessTimeline({ data, variant = "default" }) {
  if (!data || !data.steps || !data.steps.length) return null;

  const steps = data.steps;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-linear-to-b from-background via-secondary/20 to-background">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-full mb-4 md:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4"
          >
            {data.title || "Your Treatment Journey"}
          </motion.h2>

          {data.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {data.subtitle}
            </motion.p>
          )}
        </div>

        {/* Timeline */}
        {variant === "vertical" ? (
          <VerticalTimeline steps={steps} />
        ) : (
          <MinimalTimeline steps={steps} />
        )}
      </Container>
    </section>
  );
}

function MinimalTimeline({ steps }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];
  const totalSteps = steps.length;

  const handleNext = () => {
    if (activeIndex < totalSteps - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Horizontal Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 md:mb-12"
      >
        <div className="relative">
          {/* Mobile: Scrollable container */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex items-center justify-start min-w-max gap-3">
              {steps.map((step, index) => {
                const Icon = getIconComponent(step.icon);
                const isActive = index === activeIndex;
                const isComplete = index < activeIndex;

                return (
                  <div key={index} className="flex items-center gap-3">
                    <StepCircle
                      icon={Icon}
                      isActive={isActive}
                      isComplete={isComplete}
                      onClick={() => setActiveIndex(index)}
                    />
                    {index < steps.length - 1 && (
                      <StepConnector isComplete={isComplete} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Centered layout */}
          <div className="hidden md:flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = getIconComponent(step.icon);
              const isActive = index === activeIndex;
              const isComplete = index < activeIndex;

              return (
                <div key={index} className="flex items-center">
                  <StepCircle
                    icon={Icon}
                    isActive={isActive}
                    isComplete={isComplete}
                    onClick={() => setActiveIndex(index)}
                  />
                  {index < steps.length - 1 && (
                    <StepConnector isComplete={isComplete} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card border border-border rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="p-6 md:p-10 lg:p-12">
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full text-primary font-semibold text-xs uppercase tracking-wider">
                  Step {activeIndex + 1}
                </span>
                {activeStep.duration && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full text-muted-foreground text-xs"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {activeStep.duration}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Title and Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3 md:mb-4">
                {activeStep.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {activeStep.description}
              </p>
            </motion.div>

            {/* Tips Section */}
            {activeStep.tips && activeStep.tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-linear-to-br from-primary/5 via-secondary/30 to-primary/5 border border-primary/15 rounded-2xl p-5 md:p-6 mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/15 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Pro Tips
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {activeStep.tips.map((tip, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3 text-sm md:text-base text-foreground/80"
                    >
                      <span className="flex items-center justify-center w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                      <span>{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground/80">
                {activeIndex + 1} of {totalSteps}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border text-foreground text-sm font-semibold transition-all hover:bg-secondary/50 hover:border-border disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === totalSteps - 1}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StepCircle({ icon: Icon, isActive, isComplete, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 ${
        isActive
          ? "bg-primary shadow-lg shadow-primary/40"
          : isComplete
            ? "bg-primary shadow-md shadow-primary/20"
            : "bg-secondary/50 border-2 border-border"
      }`}
    >
      <Icon
        className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
          isActive || isComplete ? "text-primary-foreground" : "text-muted-foreground"
        }`}
      />
      {isActive && (
        <motion.div
          layoutId="activeRing"
          className="absolute inset-0 rounded-full border-2 border-primary"
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1.15, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative w-12 md:w-20 h-0.5 mx-1 md:mx-2">
      <div className="absolute inset-0 bg-border rounded-full" />
      <motion.div
        className="absolute inset-0 bg-primary rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isComplete ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

function VerticalTimeline({ steps }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Vertical Line */}
        <div className="hidden sm:block absolute left-6 md:left-8 top-8 bottom-8 w-px bg-linear-to-b from-transparent via-primary/25 to-transparent" />

        <div className="space-y-4 md:space-y-5">
          {steps.map((step, index) => {
            const Icon = getIconComponent(step.icon);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative flex gap-4 md:gap-6"
              >
                {/* Icon Circle */}
                <div className="shrink-0 flex items-start">
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full shadow-md shadow-primary/25 z-10">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-card rounded-2xl p-5 md:p-6 border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg md:text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {step.title}
                      </h3>
                      {step.duration && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary/50 rounded-lg text-xs text-muted-foreground font-medium whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </span>
                      )}
                    </div>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Tips */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Lightbulb className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            Pro Tips
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {step.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                              <span className="flex items-center justify-center w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
