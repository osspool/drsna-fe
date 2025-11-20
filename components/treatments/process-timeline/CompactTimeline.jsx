"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Glow from "@/components/custom/ui/glow";
import { Clock, Check } from "lucide-react";

export function CompactTimeline({ data, steps, schemaMarkup }) {
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
          <div className="opacity-0 animate-fade-in-up text-center mb-10 max-w-3xl mx-auto">
            {data.title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-3">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-2">
                {data.subtitle}
              </p>
            )}
            {data.description && (
              <p className="text-sm md:text-base text-muted-foreground">
                {data.description}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
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
                        <div className="mt-1 text-xs text-muted-foreground/50">
                          Varies
                        </div>
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
              </div>
            ))}
          </div>

          <div className="opacity-0 animate-fade-in-up mt-8 max-w-2xl mx-auto">
            <div className="rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">
                    Quick & Professional
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    The entire appointment takes under an hour, and you can
                    return to normal activities immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
