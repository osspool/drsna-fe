"use client";

import { Sparkles, Award, Star, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { Section } from "../layout/Section";
import { IconFeatureCard } from "@/components/common/IconFeatureCard";
import { Icon } from "@/components/custom/ui/icon";
import { Badge } from "@/components/ui/badge";

/**
 * Unified Features/Benefits Section Component
 * Consolidates BenefitsBlock, WhyChooseBlock, and BenefitsSection
 *
 * @param {Object} data - Features data
 * @param {string} variant - Display variant: 'default' | 'cards' | 'compact' | 'list'
 * @param {string} layout - Grid layout: 'grid-2' | 'grid-3' | 'grid-4' (only for default/cards variants)
 * @param {boolean} showStats - Show trust badges with stats (only for cards variant)
 * @param {Object} stats - Stats data for trust badges
 */
export function FeaturesSection({
  data,
  variant,
  layout,
  showStats = false,
  stats = null
}) {
  if (!data) return null;

  const { title, subtitle, description, heading, features, items, enabled = true } = data;
  const resolvedVariant = variant ?? data.variant ?? "default";
  const resolvedLayout = layout ?? data.layout ?? "grid-3";
  const resolvedShowStats = showStats || data.showStats;
  const resolvedStats = stats || data.stats;

  // Support both 'features' and 'items' property names
  const featureList = features || items || [];

  if (!enabled || !featureList.length) return null;

  const gridCols = {
    "grid-2": "md:grid-cols-2",
    "grid-3": "md:grid-cols-3 lg:grid-cols-3",
    "grid-4": "md:grid-cols-2 lg:grid-cols-4"
  };

  // List variant - compact list format
  if (resolvedVariant === "list") {
    return (
      <div className="space-y-4">
        {featureList.map((feature, index) => (
          <FeatureListItem key={index} feature={feature} index={index} />
        ))}
      </div>
    );
  }

  // Section variants with full header
  return (
    <Section background="muted-dark" padding="default">
      <Container>
        {/* Section Header */}
        {(title || heading || subtitle) && (
          <div className="text-center mb-8 md:mb-10">
            {subtitle && (
              <div className="mb-3">
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase bg-muted-foreground/10 border-muted-foreground/20 text-muted-foreground"
                >
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  {subtitle}
                </Badge>
              </div>
            )}

            {(title || heading) && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-3">
                {title || heading}
              </h2>
            )}

            {description && (
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        {resolvedVariant === "default" && (
          <DefaultFeaturesGrid features={featureList} layout={gridCols[resolvedLayout]} />
        )}

        {resolvedVariant === "cards" && (
          <CardsFeaturesGrid features={featureList} layout={gridCols[resolvedLayout]} />
        )}

        {resolvedVariant === "compact" && (
          <CompactFeaturesGrid features={featureList} />
        )}

        {/* Trust Badges - only for cards variant */}
        {resolvedVariant === "cards" && resolvedShowStats && resolvedStats && (
          <TrustBadges stats={resolvedStats} />
        )}
      </Container>
    </Section>
  );
}

// Default variant - Simple cards with hover effects (from BenefitsBlock)
function DefaultFeaturesGrid({ features, layout }) {
  return (
    <div className={cn("grid gap-5", layout)}>
      {features.map((feature, index) => (
        <IconFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          variant="default"
          iconBg="primary"
          iconSize="md"
          className="rounded-xl p-5 bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
          iconClassName="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20"
          titleClassName="text-base font-semibold"
          descriptionClassName="text-sm text-muted-foreground"
          animationDelay={index * 0.05}
        />
      ))}
    </div>
  );
}

// Cards variant - Enhanced cards (simplified from WhyChooseBlock)
function CardsFeaturesGrid({ features, layout }) {
  return (
    <div className={cn("grid gap-6", layout)}>
      {features.map((feature, index) => (
        <IconFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          variant="default"
          iconBg="primary"
          iconSize="md"
          className="rounded-2xl h-full"
          iconClassName="w-12 h-12 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
          titleClassName="text-lg group-hover:text-primary transition-colors duration-300"
          descriptionClassName="text-sm"
          animationDelay={index * 0.05}
        />
      ))}
    </div>
  );
}

// Compact variant - Minimal cards (from BenefitsSection)
function CompactFeaturesGrid({ features }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <IconFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          variant="default"
          iconBg="primary"
          iconSize="md"
          className="p-6 md:p-7 rounded-2xl"
          iconClassName="w-12 h-12 rounded-xl group-hover:bg-primary/20 transition-colors duration-200"
          titleClassName="text-lg md:text-xl group-hover:text-primary transition-colors"
          descriptionClassName="text-sm md:text-base"
          hover={true}
          animationDelay={index * 0.05}
        />
      ))}
    </div>
  );
}

// List variant item - compact list format (from BenefitsListCompact)
function FeatureListItem({ feature, index }) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon name={feature.icon} size={20} className="text-primary" />
      </div>
      <div className="flex-1">
        {feature.title && (
          <h4 className="font-heading font-bold mb-1 text-foreground">
            {feature.title}
          </h4>
        )}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.description || feature}
        </p>
      </div>
    </div>
  );
}

// Trust badges (simplified from WhyChooseBlock)
function TrustBadges({ stats }) {
  const defaultStats = [
    { icon: Award, value: "5,000+", label: "Treatments", key: "treatments" },
    { icon: Star, value: "5.0", label: "Rating", key: "rating", fill: true },
    { icon: Users, value: "98%", label: "Satisfaction", key: "satisfaction" }
  ];

  const statsToShow = stats.custom || defaultStats.map(stat => ({
    ...stat,
    value: stats[stat.key] || stat.value
  }));

  return (
    <div className="mt-8 flex items-center justify-center gap-4 md:gap-6 flex-wrap">
      {statsToShow.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="flex items-center gap-3 bg-card/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-border shadow-sm"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className={cn(
                "w-6 h-6 md:w-7 md:h-7 text-primary",
                stat.fill && "fill-primary"
              )} />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

