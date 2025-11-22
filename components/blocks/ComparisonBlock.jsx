"use client";

import { Check, Sparkles, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getSectionPreset } from "@/lib/section-presets";
import { generateStableKey } from "@/lib/utils";

export function ComparisonBlock({ data }) {
  const hasCompetitors = Array.isArray(data?.competitors) && data.competitors.length > 0;
  const hasComparisons = Array.isArray(data?.comparisons) && data.comparisons.length > 0;

  if (!hasCompetitors && !hasComparisons) {
    return null;
  }

  const aspects = hasComparisons
    ? Object.keys(data.comparisons[0]).filter(key => key !== "treatment")
    : [];

  const formatAspectLabel = label =>
    label
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .trim()
      .replace(/^./, char => char.toUpperCase());

  // Get preset with data overrides
  const headerPreset = getSectionPreset('comparison', {
    ...(data?.title && { title: data.title }),
    ...(data?.subtitle && { subtitle: data.subtitle })
  });

  const ctaText = data?.ctaText ?? "Experience the difference that expertise and care make";
  const ctaHighlight = data?.ctaHighlight ?? "Choose Excellence, Choose Dr. SNA Clinic";
  const shouldShowCta = Boolean(ctaText || ctaHighlight);

  return (
    <Section background="muted">
      <Container>
        <SectionHeader {...headerPreset} />

        {hasCompetitors && (
          <div
            className="opacity-0 animate-fade-in-up bg-white rounded-3xl border-2 border-dark-brown/10 overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-3 bg-dark-brown text-white">
              <div className="p-6 font-heading font-bold text-lg">Feature</div>
              <div className="p-6 font-heading font-bold text-lg bg-gold text-center text-dark-brown">
                Dr. SNA Clinic
              </div>
              <div className="p-6 font-heading font-bold text-lg text-center">Others</div>
            </div>

            {data.competitors.map((item, index) => (
              <div
                key={generateStableKey(item, index, "competitor-row")}
                className={`opacity-0 animate-slide-in-left grid grid-cols-3 ${
                  index % 2 === 0 ? "bg-cream/30" : "bg-white"
                } ${item.highlight ? "border-l-4 border-gold" : ""}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6 font-semibold text-dark-brown flex items-center">
                  {item.feature}
                </div>

                <div
                  className={`p-6 flex items-center justify-center ${
                    item.highlight ? "bg-gold/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-dark-brown font-medium">{item.us}</span>
                  </div>
                </div>

                <div className="p-6 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-dark-brown/60">{item.others}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasComparisons && (
          <div
            className={`opacity-0 animate-fade-in-up bg-cream/30 rounded-3xl overflow-hidden border border-dark-brown/10 ${
              hasCompetitors ? "mt-16" : ""
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-cream/50 border-b border-dark-brown/10">
                    <th className="p-6 text-left font-heading font-bold text-dark-brown">
                      Treatment
                    </th>
                    {aspects.map((aspect, index) => (
                      <th
                        key={generateStableKey(aspect, index, "comparison-aspect-header")}
                        className="p-6 text-center font-heading font-bold text-dark-brown"
                      >
                        {formatAspectLabel(aspect)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.comparisons.map((comparison, index) => (
                    <tr
                      key={generateStableKey(comparison.treatment || comparison, index, "comparison-row")}
                      className="border-b border-dark-brown/5 hover:bg-white/60 transition-colors"
                    >
                      <td className="p-6 font-semibold text-dark-brown">
                        {comparison.treatment}
                      </td>
                      {aspects.map(aspect => (
                        <td key={aspect} className="p-6 text-center text-dark-brown/70">
                          {comparison[aspect]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {shouldShowCta && (
          <div
            className="opacity-0 animate-fade-in-up mt-12 text-center"
          >
            {ctaText && (
              <p className="text-xl text-dark-brown/70 mb-6">{ctaText}</p>
            )}
            {ctaHighlight && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 rounded-full border border-gold/20">
                <Check className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold">{ctaHighlight}</span>
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
