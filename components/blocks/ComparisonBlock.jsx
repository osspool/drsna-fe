"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

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

  const ctaText = data?.ctaText ?? "Experience the difference that expertise and care make";
  const ctaHighlight = data?.ctaHighlight ?? "Choose Excellence, Choose Dr. SNA Clinic";
  const shouldShowCta = Boolean(ctaText || ctaHighlight);

  return (
    <Section background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Honest Comparison
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-4">
            {data?.title || "See How We Compare"}
          </h2>
          {data?.subtitle && (
            <p className="text-lg md:text-xl text-dark-brown/60 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </motion.div>

        {hasCompetitors && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border-2 border-dark-brown/10 overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-3 bg-dark-brown text-white">
              <div className="p-6 font-heading font-bold text-lg">Feature</div>
              <div className="p-6 font-heading font-bold text-lg bg-gold text-center text-dark-brown">
                Dr. SNA Clinic
              </div>
              <div className="p-6 font-heading font-bold text-lg text-center">Others</div>
            </div>

            {data.competitors.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? "bg-cream/30" : "bg-white"
                } ${item.highlight ? "border-l-4 border-gold" : ""}`}
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
              </motion.div>
            ))}
          </motion.div>
        )}

        {hasComparisons && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-cream/30 rounded-3xl overflow-hidden border border-dark-brown/10 ${
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
                    {aspects.map(aspect => (
                      <th
                        key={aspect}
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
                      key={comparison.treatment || index}
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
          </motion.div>
        )}

        {shouldShowCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
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
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
