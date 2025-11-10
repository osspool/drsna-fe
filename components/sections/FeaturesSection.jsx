"use client";

import {
  Award, Heart, Shield, Users, Star, CheckCircle2, Sparkles,
  Clock, TrendingUp, Zap, Stethoscope, Dna, Leaf, MapPin, Check,
  UserCheck, MapPinned, CalendarCheck, Calendar
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

// Consolidated icon mapping from all three components
const iconMap = {
  award: Award,
  heart: Heart,
  shield: Shield,
  "shield-check": Shield,
  users: Users,
  user: Users,
  userCheck: UserCheck,
  "user-check": UserCheck,
  star: Star,
  "check-circle": CheckCircle2,
  checkCircle2: CheckCircle2,
  sparkles: Sparkles,
  clock: Clock,
  calendar: Calendar,
  calendarCheck: CalendarCheck,
  "calendar-check": CalendarCheck,
  "trending-up": TrendingUp,
  trendingUp: TrendingUp,
  zap: Zap,
  palette: Sparkles,
  "graduation-cap": Award,
  stethoscope: Stethoscope,
  dna: Dna,
  leaf: Leaf,
  "map-pin": MapPin,
  mapPin: MapPin,
  mapPinned: MapPinned,
  "map-pinned": MapPinned,
  check: Check,
};

/**
 * Unified Features/Benefits Section Component
 * Consolidates BenefitsBlock, WhyChooseBlock, and BenefitsSection
 *
 * @param {Object} data - Features data
 * @param {string} variant - Display variant: 'default' | 'cards' | 'compact' | 'list'
 * @param {string} layout - Grid layout: 'grid-2' | 'grid-3' | 'grid-4' (only for default/cards variants)
 * @param {string} background - Background color: 'default' | 'muted' | 'secondary'
 * @param {boolean} showStats - Show trust badges with stats (only for cards variant)
 * @param {Object} stats - Stats data for trust badges
 */
export function FeaturesSection({
  data,
  variant = "default",
  layout = "grid-3",
  background = "default",
  showStats = false,
  stats = null
}) {
  if (!data) return null;

  const { title, subtitle, description, heading, features, items, enabled = true } = data;

  // Support both 'features' and 'items' property names
  const featureList = features || items || [];

  if (!enabled || !featureList.length) return null;

  const gridCols = {
    "grid-2": "md:grid-cols-2",
    "grid-3": "md:grid-cols-3 lg:grid-cols-3",
    "grid-4": "md:grid-cols-2 lg:grid-cols-4"
  };

  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted",
    secondary: "bg-secondary"
  };

  // List variant - compact list format
  if (variant === "list") {
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
    <section className={cn("py-16 md:py-24", bgClasses[background])}>
      <Container>
        {/* Section Header */}
        {(title || heading || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {subtitle && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs md:text-sm font-semibold tracking-wider uppercase">
                  {subtitle}
                </span>
              </div>
            )}

            {(title || heading) && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                {title || heading}
              </h2>
            )}

            {description && (
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        {variant === "default" && (
          <DefaultFeaturesGrid features={featureList} layout={gridCols[layout]} />
        )}

        {variant === "cards" && (
          <CardsFeaturesGrid features={featureList} layout={gridCols[layout]} />
        )}

        {variant === "compact" && (
          <CompactFeaturesGrid features={featureList} />
        )}

        {/* Trust Badges - only for cards variant */}
        {variant === "cards" && showStats && stats && (
          <TrustBadges stats={stats} />
        )}
      </Container>
    </section>
  );
}

// Default variant - Simple cards with hover effects (from BenefitsBlock)
function DefaultFeaturesGrid({ features, layout }) {
  return (
    <div className={cn("grid gap-6 md:gap-8", layout)}>
      {features.map((feature, index) => {
        const Icon = getIcon(feature.icon);

        return (
          <div
            key={index}
            className="group flex flex-col h-full p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Icon className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-heading font-bold mb-3 text-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed flex-grow">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// Cards variant - Enhanced cards (simplified from WhyChooseBlock)
function CardsFeaturesGrid({ features, layout }) {
  return (
    <div className={cn("grid gap-6", layout)}>
      {features.map((feature, index) => {
        const Icon = getIcon(feature.icon);

        return (
          <div
            key={index}
            className="group h-full bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// Compact variant - Minimal cards (from BenefitsSection)
function CompactFeaturesGrid({ features }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = getIcon(feature.icon);

        return (
          <div
            key={index}
            className="group p-6 md:p-7 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-200">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-heading font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// List variant item - compact list format (from BenefitsListCompact)
function FeatureListItem({ feature, index }) {
  const Icon = getIcon(feature.icon);

  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
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
    <div className="mt-12 flex items-center justify-center gap-6 md:gap-8 flex-wrap">
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

// Helper function to get icon component
function getIcon(iconName) {
  if (!iconName) return Sparkles;

  // Handle both kebab-case and camelCase
  const normalizedName = iconName.toLowerCase().replace(/-/g, '');
  const icon = Object.keys(iconMap).find(key =>
    key.toLowerCase().replace(/-/g, '') === normalizedName
  );

  return iconMap[icon] || Sparkles;
}
