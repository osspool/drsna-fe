"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Glow from "@/components/custom/ui/glow";
import { Clock, Check } from "lucide-react";

export function DetailedTimeline({ data, steps, schemaMarkup }) {
  return (
    <Section background="muted" padding="none" ripple={true}>
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMarkup }}
        />
      )}
      <div className="relative flex w-full flex-col items-start justify-start overflow-hidden py-16 md:py-24">
        <Glow variant="center" className="opacity-30" />

        <Container className="relative z-10 w-full">
          <div className="opacity-0 animate-fade-in-up text-center mb-12 max-w-3xl mx-auto">
            {data.title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-3">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-lg md:text-xl text-primary font-medium mb-2">
                {data.subtitle}
              </p>
            )}
            {data.description && (
              <p className="text-base text-muted-foreground">{data.description}</p>
            )}
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="opacity-0 animate-slide-in-left flex gap-4 group"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-card shadow-lg border border-primary/20 flex items-center justify-center text-primary font-bold">
                    {step.number || index + 1}
                  </div>
                </div>

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

                        {step.tips && step.tips.length > 0 && (
                          <div className="mt-4 space-y-2 rounded-2xl bg-secondary/60 p-3">
                            {step.tips.map((tip, tipIndex) => (
                              <div
                                key={tipIndex}
                                className="flex items-start gap-2 text-xs text-muted-foreground"
                              >
                                <Check className="mt-0.5 h-3.5 w-3.5 text-primary" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

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
                          <div className="mt-2 text-sm text-muted-foreground/70">
                            Varies
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
