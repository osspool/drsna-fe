"use client";

import {
  Clock, Syringe, Calendar, Zap, DollarSign, User,
  Activity, Timer, TrendingUp, BedDouble
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Consolidated icon mapping from all three components
const iconMap = {
  duration: Clock,
  anesthesia: Syringe,
  downtime: BedDouble,
  resultsVisible: Zap,
  resultsLast: Calendar,
  results: TrendingUp,
  longevity: Calendar,
  painLevel: Activity,
  discomfort: Zap,
  price: DollarSign,
  sessions: User,
  experience: Clock,
  patients: User,
  awards: TrendingUp,
  successRate: Activity,
};

// Consolidated label mapping
const labelMap = {
  duration: "Duration",
  anesthesia: "Anesthesia",
  downtime: "Downtime",
  resultsVisible: "Results Visible",
  resultsLast: "Results Last",
  results: "Results",
  longevity: "Longevity",
  painLevel: "Pain Level",
  discomfort: "Discomfort",
  price: "Price",
  sessions: "Sessions",
  experience: "Experience",
  patients: "Patients",
  awards: "Awards",
  successRate: "Success Rate",
};

/**
 * Unified Stats Section Component
 * Consolidates QuickStatsBlock, TreatmentStats, and AtAGlanceBlock
 *
 * @param {Object} data - Stats object with keys like duration, price, etc.
 * @param {string} variant - Display variant: 'default' | 'compact' | 'cards' | 'minimal' | 'highlight'
 * @param {string} title - Section title (optional)
 * @param {string} subtitle - Section subtitle (optional)
 * @param {string} badge - Badge text (optional)
 * @param {boolean} showSection - Wrap in section with container (default: true)
 */
export function StatsSection({
  data,
  variant = "default",
  title = "Quick Treatment Facts",
  subtitle = "Everything you need to know before booking—timelines, comfort level, and investment.",
  badge = "Treatment At A Glance",
  showSection = true
}) {
  if (!data) return null;

  // Filter out empty values and create stat entries
  const statEntries = Object.entries(data).filter(([_, value]) => value);

  if (!statEntries.length) return null;

  const content = (
    <>
      {/* Section Header - only show for variants that need it */}
      {showSection && (variant === "default" || variant === "cards") && (
        <div className="text-center mb-12">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs font-semibold tracking-wider uppercase">{badge}</span>
            </div>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">{title}</h2>
          )}
          {subtitle && (
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      {/* Stats Grid - variant-specific rendering */}
      {variant === "default" && <StatsDefault statEntries={statEntries} />}
      {variant === "compact" && <StatsCompact statEntries={statEntries} />}
      {variant === "cards" && <StatsCards statEntries={statEntries} />}
      {variant === "minimal" && <StatsMinimal statEntries={statEntries} />}
      {variant === "highlight" && <StatsHighlight statEntries={statEntries} />}
    </>
  );

  if (!showSection) {
    return content;
  }

  return (
    <section className={cn(
      "py-16 sm:py-24",
      variant === "minimal" ? "bg-muted border-y border-border" : "bg-background"
    )}>
      <Container>
        {content}
      </Container>
    </section>
  );
}

// Default variant - Elegant cards with hover effects (simplified from QuickStatsBlock)
function StatsDefault({ statEntries }) {
  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
      {statEntries.map(([key, value]) => {
        const Icon = iconMap[key] || Timer;
        const label = labelMap[key] || key;

        return (
          <div
            key={key}
            className={cn(
              "group relative rounded-3xl bg-card border border-border p-6",
              "hover:border-primary/40 hover:shadow-lg",
              "transition-all duration-300 hover:-translate-y-1"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-primary text-[0.65rem] font-semibold tracking-wider uppercase">
                  {label}
                </span>
              </div>
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <p className="text-xl font-semibold text-foreground leading-tight">
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// Compact variant - Minimal cards with icons (from TreatmentStats)
function StatsCompact({ statEntries }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statEntries.map(([key, value]) => {
        const Icon = iconMap[key] || Timer;
        const label = labelMap[key] || key;

        return (
          <div
            key={key}
            className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                {label}
              </div>
              <div className="text-sm font-heading font-bold text-foreground truncate">
                {value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Cards variant - Individual cards with hover effects (from TreatmentStats)
function StatsCards({ statEntries }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statEntries.map(([key, value]) => {
        const Icon = iconMap[key] || Timer;
        const label = labelMap[key] || key;

        return (
          <div
            key={key}
            className={cn(
              "bg-card rounded-2xl p-6 border border-border text-center",
              "hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            )}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">
              {label}
            </div>
            <div className="text-lg font-heading font-bold text-foreground">
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Minimal variant - Simple grid with icons (from AtAGlanceBlock)
function StatsMinimal({ statEntries }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-4">
      {statEntries.map(([key, value]) => {
        const Icon = iconMap[key] || Timer;
        const label = labelMap[key] || key;

        return (
          <div key={key} className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-1 text-sm">{label}</h3>
            <p className="text-sm text-muted-foreground">{value}</p>
          </div>
        );
      })}
    </div>
  );
}

// Highlight variant - For hero sections (from TreatmentStatsHighlight)
function StatsHighlight({ statEntries }) {
  // Limit to 4 key stats for hero sections
  const keyStats = statEntries.slice(0, 4);

  return (
    <div className="inline-flex items-center gap-6 md:gap-8 bg-card/80 backdrop-blur-xl rounded-full px-6 md:px-8 py-4 border border-border">
      {keyStats.map(([key, value]) => {
        const Icon = iconMap[key] || Timer;
        const label = labelMap[key] || key;

        return (
          <div key={key} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" />
            <div className="text-foreground">
              <span className="text-sm font-medium">{value}</span>
              <span className="text-xs text-muted-foreground ml-1">{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
