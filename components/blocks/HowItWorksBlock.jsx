"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Spotlight } from "@/components/aceternity/spotlight";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { AnimatedCard, IconBox, CheckItem } from "@/components/common/primitives";
import { generateStableKey } from "@/lib/utils";
import {
  Activity,
  Layers,
  Sparkles,
  Shield,
  Zap,
  Heart,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

const iconMap = {
  activity: Activity,
  layers: Layers,
  sparkles: Sparkles,
  shield: Shield,
  zap: Zap,
  heart: Heart,
  "trending-up": TrendingUp,
  check: CheckCircle2,
};

export function HowItWorksBlock({ data }) {
  const { 
    title, 
    subtitle,
    content,
    benefits = [],
    growthFactors = [],
    variant = "default",

    enabled = true 
  } = data;

  if (!enabled) return null;

  // Dark Glass Variant with Spotlight
  if (variant === "dark-glass") {
    return (
      <Section background="muted-dark" padding="default" className="relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(var(--primary) / 0.3)" />

        <Container>
          {/* Header */}
          <div className="max-w-3xl mx-auto relative z-10 mb-10">
            <SectionHeader
              title={title}
              subtitle={subtitle}
              subtitleClassName="font-medium"
            >
              {content && (
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
                  {content}
                </p>
              )}
            </SectionHeader>
          </div>

          {/* Benefits Grid with Spotlight Cards */}
          {benefits && benefits.length > 0 && (
            <div className={`grid md:grid-cols-2 lg:grid-cols-${Math.min(benefits.length, 4)} gap-5 relative z-10 ${growthFactors?.length > 0 ? 'mb-10' : ''}`}>
              {benefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Activity;

                return (
                  <div key={generateStableKey(benefit, index, "how-it-works-benefit-spotlight")}>
                    <CardSpotlight
                      radius={300}
                      color="#c69255"
                      className="h-full bg-card/50 backdrop-blur-sm border-border/50 p-6 group"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {benefit.description}
                      </p>
                    </CardSpotlight>
                  </div>
                );
              })}
            </div>
          )}

          {/* Growth Factors Section */}
          {growthFactors && growthFactors.length > 0 && (
            <div className="relative z-10">
              <CardSpotlight
                radius={500}
                color="#d4a574"
                spotlightOpacity={0.25}
                className="bg-card/90 backdrop-blur-sm p-8 lg:p-12 border-primary/30 relative z-10"
              >
                <div className="text-center mb-8 relative z-20">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Key Growth Factors in PRP
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    The powerhouse proteins that drive tissue regeneration and healing
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-20">
                  {growthFactors.map((factor, index) => (
                    <div
                      key={generateStableKey(factor, index, "how-it-works-factor-spotlight")}
                      className="flex items-center gap-3 bg-secondary/80 rounded-xl p-4 border border-primary/20 hover:border-primary/50 hover:bg-secondary transition-all duration-300 group"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-all duration-300">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                          {factor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardSpotlight>
            </div>
          )}
        </Container>
      </Section>
    );
  }

  return (
    <Section background="muted-dark" padding="default">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <SectionHeader
            title={title}
            titleClassName="text-foreground"
            subtitle={subtitle}
            subtitleClassName="text-primary font-medium"
            maxWidth={4}
          >
            {content && (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mt-4">
                {content}
              </p>
            )}
          </SectionHeader>
        </div>

        {/* Benefits Grid */}
        {benefits && benefits.length > 0 && (
          <div className={`grid md:grid-cols-2 lg:grid-cols-${Math.min(benefits.length, 4)} gap-5 ${growthFactors?.length > 0 ? 'mb-10' : ''}`}>
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || Activity;

              return (
                <AnimatedCard
                  key={generateStableKey(benefit, index, "how-it-works-benefit")}
                  variant="gradient"
                  hoverGradient
                  className="h-full"
                >
                  <IconBox variant="gradient" size="lg" hoverScale>
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </IconBox>

                  <h3 className="text-xl font-bold text-foreground mb-2 mt-4 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </AnimatedCard>
              );
            })}
          </div>
        )}

        {/* Growth Factors Section */}
        {growthFactors && growthFactors.length > 0 && (
          <div className="bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/20 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Key Growth Factors in PRP
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The powerhouse proteins that drive tissue regeneration and healing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {growthFactors.map((factor, index) => (
                <CheckItem key={generateStableKey(factor, index, "how-it-works-factor")}>{factor}</CheckItem>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

