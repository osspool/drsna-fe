"use client";

import { Clock, Syringe, Calendar, Zap, DollarSign, User, Activity, Timer } from "lucide-react";

const iconMap = {
  duration: Clock,
  anesthesia: Syringe,
  downtime: Activity,
  resultsVisible: Zap,
  resultsLast: Calendar,
  painLevel: Activity,
  price: DollarSign,
  sessions: User,
};

const labelMap = {
  duration: "Treatment Duration",
  anesthesia: "Anesthesia",
  downtime: "Downtime",
  resultsVisible: "Results Visible",
  resultsLast: "Results Last",
  painLevel: "Discomfort Level",
  price: "Starting Price",
  sessions: "Sessions Required",
};

export function TreatmentStats({ stats, variant = "default" }) {
  if (!stats) return null;

  const statEntries = Object.entries(stats).filter(([_, value]) => value);

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statEntries.map(([key, value]) => {
          const Icon = iconMap[key] || Timer;
          return (
            <div
              key={key}
              className="flex items-center gap-3 p-4 bg-cream/50 rounded-xl border border-dark-brown/5"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-dark-brown/60 font-medium uppercase tracking-wider mb-0.5">
                  {labelMap[key] || key}
                </div>
                <div className="text-sm font-heading font-bold text-dark-brown truncate">
                  {value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {statEntries.map(([key, value]) => {
          const Icon = iconMap[key] || Timer;
          return (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 border border-dark-brown/10 hover:border-gold/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-gold" />
              </div>
              <div className="text-xs text-dark-brown/50 font-semibold uppercase tracking-wider mb-2">
                {labelMap[key] || key}
              </div>
              <div className="text-lg font-heading font-bold text-dark-brown">
                {value}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default variant - elegant minimal
  return (
    <div className="bg-gradient-to-br from-cream to-white rounded-3xl p-8 md:p-10 border border-dark-brown/10 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statEntries.map(([key, value]) => {
          const Icon = iconMap[key] || Timer;
          return (
            <div key={key} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-dark-brown mb-1">
                {value}
              </div>
              <div className="text-xs text-dark-brown/60 font-medium uppercase tracking-wider">
                {labelMap[key] || key}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Highlight variant for hero sections
export function TreatmentStatsHighlight({ stats }) {
  if (!stats) return null;

  const keyStats = [
    { key: "duration", label: "Duration" },
    { key: "downtime", label: "Downtime" },
    { key: "resultsLast", label: "Lasts" },
    { key: "price", label: "Price" },
  ].filter((stat) => stats[stat.key]);

  return (
    <div className="inline-flex items-center gap-6 md:gap-8 bg-dark-brown/80 backdrop-blur-xl rounded-full px-6 md:px-8 py-4 border border-white/10">
      {keyStats.map(({ key, label }) => {
        const Icon = iconMap[key] || Timer;
        return (
          <div key={key} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gold" />
            <div className="text-white">
              <span className="text-sm font-medium">{stats[key]}</span>
              <span className="text-xs text-white/60 ml-1">{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
