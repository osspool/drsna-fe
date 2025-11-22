"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/lib/utils";
import { getSectionHeaderProps } from "@/lib/section-presets";

export function StatsBlock({ data, id, background = "default", padding = "lg" }) {
  // Support both data formats: flat object or array of items
  const stats = Array.isArray(data.items) ? data.items : [
    { label: "Procedures Performed", value: data.procedures },
    { label: "Patient Satisfaction", value: data.satisfaction },
    { label: "Size Increase", value: data.sizeIncrease },
    { label: "Results Duration", value: data.duration },
  ].filter(item => item.value); // Filter out undefineds

  const headerProps = getSectionHeaderProps(data, 'pshot.stats');
  
  // Determine text colors based on background
  const isDarkBg = ['primary', 'gold', 'royal-blue', 'foreground'].includes(background);
  const textColor = isDarkBg ? "text-primary-foreground" : "text-foreground";
  const subTextColor = isDarkBg ? "text-primary-foreground/80" : "text-muted-foreground";

  return (
    <Section id={id} background={background} padding={padding} className={cn("relative overflow-hidden", textColor)}>
      {/* Decorative elements only for dark backgrounds to add depth */}
      {isDarkBg && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      )}
      
      <Container className="relative z-10">
         <SectionHeader 
            {...headerProps}
            titleClassName={textColor}
            subtitleClassName={subTextColor}
            badgeVariant={isDarkBg ? "gold" : "primary"}
         />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={cn(
                "text-4xl md:text-5xl font-heading font-bold mb-2 transition-colors", 
                isDarkBg ? "text-white" : "text-primary"
              )}>
                {stat.value}
              </div>
              <div className={cn(
                "text-sm md:text-base font-medium uppercase tracking-wide", 
                subTextColor
              )}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
