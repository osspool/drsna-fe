"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/lib/utils";
import { getSectionHeaderProps } from "@/lib/section-presets";
import { Clock } from "lucide-react";

export function TimelineBlock({ data, id, background = "muted", padding = "lg" }) {
  const headerProps = getSectionHeaderProps(data, 'pshot.process');
  const steps = data.steps || [];

  return (
    <Section id={id} background={background} padding={padding}>
      <Container>
        <SectionHeader {...headerProps} />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={cn(
                "relative flex flex-col md:flex-row gap-8 md:gap-0 items-start",
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              )}>
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary z-10 -translate-x-[calc(50%-1.5px)] md:-translate-x-1/2 flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>

                {/* Content */}
                <div className={cn(
                  "pl-12 md:pl-0 md:w-1/2 flex flex-col",
                  index % 2 === 0 ? "md:pr-16 items-start md:text-right" : "md:pl-16 items-start md:text-left"
                )}>
                  <div className={cn(
                    "bg-background p-6 rounded-2xl border border-border shadow-sm w-full hover:shadow-md transition-shadow duration-300",
                    index % 2 === 0 ? "md:items-end" : "md:items-start"
                  )}>
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                        {step.step || index + 1}
                      </div>
                      <span className="uppercase tracking-wider text-xs">Step {step.step || index + 1}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                    
                    {step.duration && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {step.duration}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

