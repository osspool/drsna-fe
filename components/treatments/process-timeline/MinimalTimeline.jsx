"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Lightbulb,
} from "lucide-react";
import { getIconComponent } from "./utils";

export function MinimalTimeline({ steps }) {
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
      <div className="opacity-0 animate-fade-in-up mb-8 md:mb-12">
        <div className="relative">
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
      </div>

      <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border border-primary/10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 border border-primary/40 rounded-full text-foreground font-semibold text-xs uppercase tracking-wider shadow-sm">
                Step {activeIndex + 1}
              </span>
              {activeStep.duration && (
                <span
                  className="opacity-0 animate-slide-in-left inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full text-muted-foreground text-xs"
                  style={{ animationDelay: "200ms" }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {activeStep.duration}
                </span>
              )}
            </div>
          </div>

          <div
            className="opacity-0 animate-fade-in-up mb-6"
            style={{ animationDelay: "100ms" }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary mb-3 md:mb-4">
              {activeStep.title}
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          {activeStep.tips && activeStep.tips.length > 0 && (
            <div
              className="opacity-0 animate-fade-in-up bg-linear-to-br from-primary/5 via-secondary/30 to-primary/5 border border-primary/15 rounded-2xl p-5 md:p-6 mb-6"
              style={{ animationDelay: "200ms" }}
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
                  <li
                    key={idx}
                    className="opacity-0 animate-slide-in-left flex items-start gap-3 text-sm md:text-base text-foreground/80"
                    style={{ animationDelay: `${300 + idx * 100}ms` }}
                  >
                    <span className="flex items-center justify-center w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
      </div>
    </div>
  );
}

function StepCircle({ icon: Icon, isActive, isComplete, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 ${
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
        <div className="absolute inset-0 rounded-full border-2 border-primary animate-scale-in" />
      )}
    </button>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative w-12 md:w-20 h-0.5 mx-1 md:mx-2">
      <div className="absolute inset-0 bg-border rounded-full" />
      <div
        className={`absolute inset-0 bg-primary rounded-full transition-transform duration-500 origin-left ${
          isComplete ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </div>
  );
}
