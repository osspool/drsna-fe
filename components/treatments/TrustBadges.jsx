"use client";

import { ShieldCheck, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { IconFeatureCard } from "@/components/common/IconFeatureCard";
import { Icon } from "@/components/custom/ui/icon";
import { generateStableKey } from "@/lib/utils";

export function TrustBadges({ certifications, variant = "default" }) {
  if (!certifications || certifications.length === 0) return null;

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {certifications.map((cert, index) => (
          <div
            key={generateStableKey(cert, index, "trust-badge-inline")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-dark-brown/10 hover:border-gold/30 transition-colors"
          >
            <Icon name={cert.icon} size={16} className="text-gold flex-shrink-0" />
            <span className="text-sm font-semibold text-dark-brown whitespace-nowrap">
              {cert.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {certifications.map((cert, index) => (
          <StatCard
            key={generateStableKey(cert, index, "trust-badge-compact")}
            icon={cert.icon}
            label={cert.name}
            variant="minimal"
            iconBg="gold"
            iconSize="md"
            className="p-4 bg-cream/50 rounded-xl border border-dark-brown/5 hover:border-gold/20"
            iconClassName="w-10 h-10 rounded-full"
            labelClassName="text-xs font-semibold text-dark-brown"
            animate={false}
          />
        ))}
      </div>
    );
  }

  // Default variant - cards with descriptions
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <div
          key={generateStableKey(cert, index, "trust-badge-default")}
          className="bg-white rounded-2xl p-6 border border-dark-brown/10 hover:border-gold/30 hover:shadow-lg transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
              <Icon name={cert.icon} size={24} className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-dark-brown mb-1 text-lg">
                {cert.name}
              </h3>
              {cert.description && (
                <p className="text-sm text-dark-brown/60 leading-relaxed">
                  {cert.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Safety section with badges
export function SafetySection({ data }) {
  if (!data) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-cream/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Safety & Quality
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-dark-brown mb-6">
            {data.title || "Your Safety is Our Priority"}
          </h2>
          {data.content && (
            <p className="text-xl text-dark-brown/70 max-w-3xl mx-auto leading-relaxed">
              {data.content}
            </p>
          )}
        </div>

        {/* Certifications */}
        {data.certifications && (
          <div className="mb-12">
            <TrustBadges certifications={data.certifications} variant="default" />
          </div>
        )}

        {/* Products Used */}
        {data.products && data.products.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-dark-brown mb-6">
              Premium Products We Use
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.products.map((product, index) => (
                <div
                  key={generateStableKey(product, index, "trust-product")}
                  className="px-6 py-3 bg-white rounded-full border-2 border-gold/20 hover:border-gold/40 transition-colors"
                >
                  <span className="text-dark-brown font-semibold">{product}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Simple trust indicators for hero/header
export function TrustIndicators({ indicators = ["CQC Registered", "GMC Certified", "Fully Insured"] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {indicators.map((indicator, index) => (
        <div key={generateStableKey(indicator, index, "simple-trust-indicator")} className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
          <span className="text-sm md:text-base font-medium text-dark-brown">
            {indicator}
          </span>
        </div>
      ))}
    </div>
  );
}
