"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Section } from "@/components/layout/Section";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { getIconComponent } from "@/lib/icon-utils";
import { generateStableKey } from "@/lib/utils";

export function CTASection({ data, variant = "default" }) {
  const ctaData = data || {
    title: "Ready to Begin Your Journey?",
    subtitle: "Book a consultation with our expert team and discover your personalized treatment plan",
    primaryButton: "Book Consultation",
    secondaryButton: "Contact Us",
  };

  if (variant === "inline") {
    return (
      <div
        className="opacity-0 animate-fade-in-up relative rounded-3xl overflow-hidden bg-linear-to-br from-primary to-primary/80 p-12 md:p-16 text-center"
      >
        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10" />

        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-royal-blue mb-6">
            {ctaData.title}
          </h3>
          {ctaData.subtitle && (
            <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              {ctaData.subtitle}
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
                {ctaData.primaryButton || "Book Now"}
                <ArrowRight className="w-5 h-5" />
              </span>
            </MovingBorderButton>
            {ctaData.secondaryButton && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-royal-blue text-royal-blue hover:bg-royal-blue/20 text-lg px-10 py-6"
              >
                <Link href="/contact">
                  {ctaData.secondaryButton}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className="opacity-0 animate-fade-in-up bg-linear-to-br from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground"
      >
        <Calendar className="w-12 h-12 mb-4 opacity-90" />
        <h3 className="text-2xl font-heading font-bold mb-3">
          {ctaData.title || "Book Your Consultation"}
        </h3>
        <p className="text-primary-foreground/90 mb-6 leading-relaxed">
          {ctaData.subtitle || "Get personalized advice from our expert practitioners"}
        </p>
        <MovingBorderButton
          as={Link}
          href={ctaData.primaryButtonHref || "/booking"}
          borderRadius="1rem"
          className="w-full bg-card text-foreground hover:bg-accent font-semibold py-3"
          containerClassName="w-full"
        >
          <span className="flex items-center justify-center gap-2">
            {ctaData.primaryButton || "Book Now"}
            <ArrowRight className="w-4 h-4" />
          </span>
        </MovingBorderButton>
      </div>
    );
  }

  if (variant === "contact") {
    const contactInfo = data?.contactInfo || [
      {
        icon: Phone,
        label: "Call Us",
        value: "+44 7955 836986",
        href: "tel:+447955836986",
      },
      {
        icon: Mail,
        label: "Email",
        value: "info@drsnaclinic.com",
        href: "mailto:info@drsnaclinic.com",
      },
      {
        icon: MapPin,
        label: "Visit Us",
        value: "48 Wimpole Street, London W1G 8SF",
        href: "https://maps.google.com/?q=48+Wimpole+Street+London",
      },
    ];

    const openingHours = data?.openingHours || {
      days: "Monday - Saturday",
      hours: "9:00 AM - 6:00 PM"
    };

    return (
      <Section background="default" padding="lg" className="relative">
        <Container className="relative z-20">
          <div
            className="opacity-0 animate-fade-in-up text-center max-w-4xl mx-auto"
            style={{ animationDelay: '0ms' }}
          >
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-8">
              {ctaData.title || "Begin Your Journey"}
              <br />
              <span className="text-primary">{ctaData.titleAccent || "To Natural Beauty"}</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light">
              {ctaData.subtitle || "Book your consultation today and discover how Dr Abbas and his expert team can help you achieve your aesthetic goals with precision and care"}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/booking">
                <MovingBorderButton
                  borderRadius="1.5rem"
                  className="bg-card text-foreground px-12 py-6 font-bold text-lg"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {ctaData.primaryButton || "Book Your Consultation"}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </MovingBorderButton>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {contactInfo.map((info, index) => {
                const InfoIcon = getIconComponent(info.icon, Phone);
                return (
                <a
                  key={generateStableKey(info, index, "cta-contact")}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="opacity-0 animate-fade-in-up group glass-card rounded-2xl p-6 border border-border hover:bg-card/80 hover:border-primary transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <InfoIcon className="w-6 h-6 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                </a>
                );
              })}
            </div>

            <div
              className="opacity-0 animate-fade-in mt-12 text-muted-foreground text-sm"
            >
              <p className="mb-2">Open {openingHours.days}</p>
              <p className="text-lg font-semibold text-foreground">{openingHours.hours}</p>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-background">
      <BackgroundBeams />

      <Container className="relative z-10">
        <div
          className="opacity-0 animate-fade-in-up text-center max-w-4xl mx-auto"
          style={{ animationDelay: '0ms' }}
        >
          {ctaData.overline && (
            <div
              className="opacity-0 animate-scale-in inline-flex items-center gap-2 px-6 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-8"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {ctaData.overline}
              </span>
            </div>
          )}

          <h2
            className="opacity-0 animate-fade-in-up text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6"
            style={{ animationDelay: '100ms' }}
          >
            {ctaData.title}
          </h2>

          {ctaData.subtitle && (
            <p
              className="opacity-0 animate-fade-in text-lg md:text-xl text-muted-foreground mb-8 font-light leading-relaxed"
              style={{ animationDelay: '200ms' }}
            >
              {ctaData.subtitle}
            </p>
          )}

          <div
            className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            style={{ animationDelay: '300ms' }}
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
          </div>

          {(ctaData.phone || ctaData.note) && (
            <div
              className="opacity-0 animate-fade-in space-y-4"
              style={{ animationDelay: '400ms' }}
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
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
