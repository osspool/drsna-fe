"use client";

import { motion } from "framer-motion";
import { Check, Star, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-linear-to-br from-primary/5 via-card to-primary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20 shadow-xl"
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
            </motion.div>

            {/* What's Included */}
            {includes && includes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 bg-card rounded-3xl p-8 md:p-10 border border-border"
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
              </motion.div>
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative w-full sm:w-[320px] md:w-[340px] lg:w-[360px]"
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
                </motion.div>
              ))}
            </div>

            {/* What's Included */}
            {includes && includes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto bg-card rounded-3xl p-8 md:p-12 border border-border mb-12"
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
              </motion.div>
            )}

            {/* Financing */}
            {financing?.available && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto text-center bg-primary/5 rounded-3xl p-8 border border-primary/20"
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
              </motion.div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}

