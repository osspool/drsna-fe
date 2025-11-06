"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { MovingBorderButton } from "@/components/aceternity/moving-border";

export function CTASection({ data, variant = "default" }) {
  // Conditional rendering - use default if no data provided
  const ctaData = data || {
    title: "Ready to Begin Your Journey?",
    subtitle: "Book a consultation with our expert team and discover your personalized treatment plan",
    primaryButton: "Book Consultation",
    secondaryButton: "Contact Us",
  };

  if (variant === "inline") {
    return <InlineCTA data={ctaData} />;
  }

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-background">
      <BackgroundBeams />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Overline */}
          {ctaData.overline && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-8"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {ctaData.overline}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6"
          >
            {ctaData.title}
          </motion.h2>

          {/* Subtitle */}
          {ctaData.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 font-light leading-relaxed"
            >
              {ctaData.subtitle}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <MovingBorderButton
              as={Link}
              href="/booking"
              borderRadius="2rem"
              className="bg-gradient-to-br from-card to-card text-foreground font-semibold text-xl px-12 py-8 hover:bg-gradient-to-br hover:from-accent hover:to-accent transition-all"
              containerClassName="w-full sm:w-auto"
            >
              <span className="flex items-center gap-3">
                {ctaData.primaryButton || "Book Consultation"}
                <ArrowRight className="w-6 h-6" />
              </span>
            </MovingBorderButton>

            {ctaData.secondaryButton && (
              <Button
                asChild
                size="lg"
                className="glass-card border-2 border-border text-foreground hover:bg-accent hover:border-primary text-xl px-12 py-8 transition-all shadow-lg"
              >
                <Link href="/contact">
                  {ctaData.secondaryButton}
                </Link>
              </Button>
            )}
          </motion.div>

          {/* Contact Info */}
          {(ctaData.phone || ctaData.note) && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {ctaData.phone && (
                <a
                  href={`tel:${ctaData.phone}`}
                  className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors text-lg"
                >
                  <Phone className="w-5 h-5" />
                  {ctaData.phone}
                </a>
              )}
              {ctaData.note && (
                <p className="text-muted-foreground text-sm">
                  {ctaData.note}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

// Inline CTA variant for use within content sections
function InlineCTA({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-12 md:p-16 text-center"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10" />

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-foreground mb-6">
          {data.title}
        </h3>
        {data.subtitle && (
          <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MovingBorderButton
            as={Link}
            href="/booking"
            borderRadius="1.5rem"
            className="bg-card text-foreground hover:bg-accent text-lg px-10 py-6 font-semibold shadow-xl"
            containerClassName="w-full sm:w-auto"
          >
            <span className="flex items-center gap-2">
              {data.primaryButton || "Book Now"}
              <ArrowRight className="w-5 h-5" />
            </span>
          </MovingBorderButton>
          {data.secondaryButton && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 text-lg px-10 py-6"
            >
              <Link href="/contact">
                {data.secondaryButton}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Compact CTA card for sidebars or smaller spaces
export function CTACard({ title, description, buttonText, buttonHref }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground"
    >
      <Calendar className="w-12 h-12 mb-4 opacity-90" />
      <h3 className="text-2xl font-heading font-bold mb-3">
        {title || "Book Your Consultation"}
      </h3>
      <p className="text-primary-foreground/90 mb-6 leading-relaxed">
        {description || "Get personalized advice from our expert practitioners"}
      </p>
      <MovingBorderButton
        as={Link}
        href={buttonHref || "/booking"}
        borderRadius="1rem"
        className="w-full bg-card text-foreground hover:bg-accent font-semibold py-3"
        containerClassName="w-full"
      >
        <span className="flex items-center justify-center gap-2">
          {buttonText || "Book Now"}
          <ArrowRight className="w-4 h-4" />
        </span>
      </MovingBorderButton>
    </motion.div>
  );
}
