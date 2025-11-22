"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, CheckCircle } from "lucide-react";
import Link from "next/link";
import { generateStableKey } from "@/lib/utils";

export function PShotHero({ data }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Optional Background Image - Add your image to /public/images/pshot-hero-bg.jpg */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl py-20 md:py-28">
          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-6 border-primary/40 bg-primary/5 text-primary font-semibold px-4 py-2 text-sm"
          >
            {data.badge}
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            {data.headline}
          </h1>

          {/* Subheading */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-heading text-primary mb-6 font-medium">
            {data.subheadline}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="text-base h-14 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/contact">
                {data.cta.primary}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-14 px-8 border-2 hover:bg-muted"
            >
              <a href="tel:+447955836986" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {data.cta.secondary || "Call Now"}
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl">
            {data.trustIndicators.map((indicator, index) => (
              <div
                key={generateStableKey(indicator, index, "pshot-indicator")}
                className="flex items-center gap-3 text-sm font-medium text-foreground"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{indicator}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
