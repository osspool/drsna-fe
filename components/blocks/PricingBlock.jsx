"use client";

import { Check, Star, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Pricing Block Component
 *
 * Flexible pricing display supporting single price or multi-package layouts.
 * Includes consultation fees, included items, financing options, and disclaimers.
 *
 * @param {Object} props
 * @param {Object} props.data - Block data
 * @param {string} props.data.title - Section title
 * @param {string} [props.data.subtitle] - Section subtitle
 * @param {string} [props.data.disclaimer] - Legal disclaimer text
 * @param {Object} [props.data.singlePrice] - Single price configuration
 * @param {string} props.data.singlePrice.currentPrice - Current price (e.g., "£299")
 * @param {string} [props.data.singlePrice.originalPrice] - Original price for strike-through
 * @param {string} props.data.singlePrice.currency - Currency label (e.g., "GBP")
 * @param {Object} [props.data.singlePrice.consultationFee] - Consultation fee details
 * @param {Array} [props.data.packages] - Multiple pricing packages
 * @param {Object} props.data.packages[].name - Package name
 * @param {string} props.data.packages[].price - Package price
 * @param {string[]} props.data.packages[].features - Package features
 * @param {boolean} [props.data.packages[].popular] - Mark as popular
 * @param {string[]} [props.data.includes] - What's included in the price
 * @param {Object} [props.data.financing] - Financing options
 *
 * @example
 * // Single Price
 * <PricingBlock data={{
 *   title: "Treatment Pricing",
 *   singlePrice: {
 *     currentPrice: "£299",
 *     originalPrice: "£399",
 *     currency: "GBP",
 *     consultationFee: { amount: "£50", refundable: true }
 *   },
 *   includes: ["Initial consultation", "Follow-up care"],
 *   disclaimer: "Prices may vary based on individual needs"
 * }} />
 *
 * @example
 * // Multi-Package
 * <PricingBlock data={{
 *   title: "Treatment Packages",
 *   packages: [
 *     { name: "Basic", price: "£299", features: ["1 session", "Aftercare"] },
 *     { name: "Premium", price: "£599", features: ["3 sessions", "Premium aftercare"], popular: true }
 *   ]
 * }} />
 */
export function PricingBlock({ data }) {
  const { title, subtitle, disclaimer, packages, singlePrice, includes, financing } = data;
  
  // Determine if this is a single price or multi-package pricing
  const isSinglePrice = singlePrice && !packages;

  return (
    <Section background="gradient-cream">
      <Container>
        {/* Single Price Display */}
        {isSinglePrice && (
          <div className="max-w-2xl mx-auto">
            <SectionHeader title={title} subtitle={subtitle} spacing="md" />

            {/* Single Price Card */}
            <div
              className="opacity-0 animate-scale-in bg-linear-to-br from-primary/5 via-card to-primary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20 shadow-xl"
              style={{ animationDelay: '200ms' }}
            >
              {/* Price Display */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  {singlePrice.originalPrice && (
                    <span className="text-2xl md:text-3xl font-heading text-foreground/70 line-through">
                      {singlePrice.originalPrice}
                    </span>
                  )}
                  <span className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary">
                    {singlePrice.currentPrice.replace('£', '')}
                  </span>
                </div>
                <span className="text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wider">
                  {singlePrice.currency}
                </span>
              </div>

              {/* Consultation Info */}
              {singlePrice.consultationFee && (
                <div className="bg-card/80 rounded-2xl p-6 mb-6 border border-border">
                  <div className="flex items-start gap-3 mb-2">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-foreground/80 font-medium mb-1">
                        {singlePrice.consultationNote}
                      </p>
                      {singlePrice.consultationDisclaimer && (
                        <p className="text-sm text-foreground">
                          {singlePrice.consultationDisclaimer}
                        </p>
                      )}
                    </div>
                  </div>
                  {disclaimer && (
                    <p className="text-sm text-foreground italic text-center mt-3 pt-3 border-t border-border">
                      {disclaimer}
                    </p>
                  )}
                </div>
              )}

              {/* Financing Button */}
              {financing?.available && (
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contact">
                    {financing.buttonText || "Book Your Consultation"}
                  </Link>
                </Button>
              )}
            </div>

            {/* What's Included */}
            {includes && includes.length > 0 && (
              <div
                className="opacity-0 animate-fade-in-up mt-12 bg-card rounded-3xl p-8 md:p-10 border border-border"
                style={{ animationDelay: '300ms' }}
              >
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
                  What's Included
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground/80 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Multi-Package Display (Original Design) */}
        {!isSinglePrice && packages && (
          <>
            <SectionHeader title={title} subtitle={subtitle}>
              {disclaimer && (
                <p className="text-sm text-foreground/80 max-w-2xl mx-auto italic mt-4">
                  {disclaimer}
                </p>
              )}
            </SectionHeader>

            {/* Pricing Packages */}
            <div className="flex flex-wrap justify-center gap-6 mb-16 max-w-6xl mx-auto">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="opacity-0 animate-fade-in-up relative w-full sm:w-[320px] md:w-[340px] lg:w-[360px]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex flex-col w-full h-full rounded-3xl p-8 border-2 transition-all duration-300 ${
                      pkg.popular
                        ? "bg-card border-primary shadow-2xl scale-105"
                        : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
                    }`}
                  >
                    {/* Package Name */}
                    <h3 className="text-xl font-heading font-bold text-primary mb-2">
                      {pkg.name}
                    </h3>

                    {/* Description */}
                    <p className="text-foreground text-sm mb-4">
                      {pkg.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-3xl font-heading font-bold text-primary mb-2">
                        {pkg.price}
                      </div>
                      {pkg.savings && (
                        <div className="text-sm text-green-600 font-semibold">
                          {pkg.savings}
                        </div>
                      )}
                    </div>

                {/* Areas/Details */}
                {pkg.areas && (
                  <p className="text-sm text-foreground mb-6 leading-relaxed grow">
                        {pkg.areas}
                      </p>
                    )}

                    {/* Includes (if specific to package) */}
                    {pkg.includes && (
                      <p className="text-xs text-foreground italic mt-auto">
                        {pkg.includes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What's Included */}
            {includes && includes.length > 0 && (
              <div
                className="opacity-0 animate-fade-in-up max-w-6xl mx-auto bg-card rounded-3xl p-8 md:p-12 border border-border mb-12"
              >
                <h3 className="text-2xl font-heading font-bold text-primary mb-8 text-center">
                  Every Treatment Includes
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financing */}
            {financing?.available && (
              <div
                className="opacity-0 animate-fade-in-up max-w-6xl mx-auto text-center bg-primary/5 rounded-3xl p-8 border border-primary/20"
              >
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  Flexible Payment Options Available
                </h3>
                <p className="text-foreground mb-6">
                  Finance plans available to help spread the cost of your treatment
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  <Link href="/contact">{financing.buttonText || "Learn More About Financing"}</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}

