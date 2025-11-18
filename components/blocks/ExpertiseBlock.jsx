"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/custom/ui/icon";
import { Badge } from "@/components/ui/badge";

/**
 * Expertise Block
 *
 * Creative, visually striking expertise section with bento-style grid
 */
export function ExpertiseBlock({ data }) {
  if (!data) return null;

  const { badge, title, subtitle, description, features, approach } = data;

  return (
    <Section background="default" padding="xl" className="overflow-hidden relative">
      {/* Gradient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Header Section - Large and Centered */}
        <div className="opacity-0 animate-fade-in-up text-center mb-16">
          {badge && (
            <Badge variant="outline" className="mb-4 text-sm font-semibold uppercase tracking-wider">
              {badge}
            </Badge>
          )}

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-xl md:text-2xl text-primary font-medium mb-6">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Bento-Style Features Grid */}
        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {features.map((feature, index) => {
              // Create visual variety with different sizes
              const isLarge = index === 0 || index === 5;
              const gridClass = isLarge ? "md:col-span-2" : "";

              return (
                <div
                  key={index}
                  className={`opacity-0 animate-fade-in-up group relative ${gridClass}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-full bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 md:p-10 border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      {/* Large Icon with Gradient Background */}
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500">
                          {feature.icon && (
                            <Icon
                              name={feature.icon}
                              size={40}
                              className="text-primary group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>

                      {feature.description && (
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Approach Section - Split Layout */}
        {approach && (
          <div className="opacity-0 animate-fade-in-up relative">
            <div className="bg-gradient-to-br from-muted via-muted to-muted/50 rounded-3xl overflow-hidden border border-border">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Title */}
                <div className="p-8 md:p-12 lg:p-16 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
                      <Icon name="link-2" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
                      {approach.title}
                    </h3>
                  </div>
                </div>

                {/* Right Side - Points */}
                <div className="p-8 md:p-12 lg:p-16 space-y-6">
                  {approach.points && approach.points.map((point, index) => (
                    <div
                      key={index}
                      className="opacity-0 animate-slide-in-right flex items-start gap-4 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="text-primary font-bold text-lg">{index + 1}</span>
                      </div>
                      <p className="text-lg text-foreground leading-relaxed font-medium pt-1">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
