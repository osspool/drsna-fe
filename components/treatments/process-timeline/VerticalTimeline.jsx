"use client";

import { Clock, Lightbulb } from "lucide-react";
import { getIconComponent } from "./utils";

export function VerticalTimeline({ steps }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        <div className="hidden sm:block absolute left-6 md:left-8 top-8 bottom-8 w-px bg-linear-to-b from-transparent via-primary/25 to-transparent" />

        <div className="space-y-4 md:space-y-5">
          {steps.map((step, index) => {
            const Icon = getIconComponent(step.icon);

            return (
              <div
                key={index}
                className="opacity-0 animate-fade-in-up relative flex gap-4 md:gap-6"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="shrink-0 flex items-start">
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full shadow-md shadow-primary/25 z-10">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
                  </div>
                </div>

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
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground"
                            >
                              <span className="flex items-center justify-center w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
