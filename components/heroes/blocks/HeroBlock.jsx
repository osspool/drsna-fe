"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function HeroBlock({ data }) {
  const { type, media, title, subtitle, description, cta } = data;

  return (
    <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dark-brown">
      {/* Background Image/Video */}
      {type === "image" && media && (
        <div className="absolute inset-0 z-0">
          <Image
            src={media}
            alt={title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      )}

      {/* Dark gradient background when no image */}
      {(!media || type !== "image") && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-dark-brown via-charcoal to-dark-brown">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(205,165,92,0.15),transparent_50%)]" />
        </div>
      )}

      {/* Content */}
      <Container className="relative z-10">
        <div className="opacity-0 animate-fade-in-up max-w-3xl">
          {/* Title */}
          <h1
            className="opacity-0 animate-fade-in-up font-heading text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6"
            style={{ animationDelay: '200ms' }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className="opacity-0 animate-fade-in-up text-2xl md:text-3xl font-accent text-gold-light drop-shadow-lg mb-4"
            style={{ animationDelay: '400ms' }}
          >
            {subtitle}
          </p>

          {/* Description */}
          {description && (
            <p
              className="opacity-0 animate-fade-in-up text-lg text-gray-200 drop-shadow-md mb-8 max-w-2xl"
              style={{ animationDelay: '500ms' }}
            >
              {description}
            </p>
          )}

          {/* CTAs */}
          <div
            className="opacity-0 animate-fade-in-up flex flex-wrap gap-4"
            style={{ animationDelay: '600ms' }}
          >
            {cta?.primary && (
              <Button
                asChild
                size="lg"
                className="btn-gold text-lg px-8 py-6 shadow-gold-lg hover:shadow-gold transition-all duration-300"
              >
                <Link href={cta.primary.link}>
                  {cta.primary.text}
                </Link>
              </Button>
            )}
            {cta?.secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white bg-transparent border-2 border-gold-light hover:bg-gold hover:border-gold hover:text-dark-brown transition-all duration-300 shadow-lg"
              >
                <Link href={cta.secondary.link}>
                  {cta.secondary.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>

      {/* Decorative Gold Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient shadow-gold" />
    </div>
  );
}
