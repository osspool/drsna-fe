"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/heroes/shared/hero-carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const defaultSlides = [
  {
    id: 1,
    image: "/images/drsnaclinic/hero-new.jpg",
    mobileImage: "/images/drsnaclinic/hero-mobile.jpg",
    badge: "GLOBAL RECOGNITION AWARD 2024",
    headline: "Award-Winning",
    subheadline: "Dr Syed Nadeem Abbas",
    description: "Experience transformative care from London's most distinguished aesthetic medicine specialist",
    primaryCta: {
      text: "Meet Dr Abbas",
      href: "/dr-syed-nadeem-abbas",
    },
  },
  {
    id: 2,
    image: "/images/drsnaclinic/clinic-outside.jpg",
    badge: "CUTTING-EDGE TREATMENTS",
    headline: "Rediscover Your",
    subheadline: "Natural Radiance",
    description: "Advanced regenerative therapies tailored to enhance your inherent beauty with precision and artistry",
    primaryCta: {
      text: "Explore Treatments",
      href: "/treatments",
    },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80",
    badge: "LUXURY AESTHETIC MEDICINE",
    headline: "Embrace Your",
    subheadline: "Best Self",
    description: "Bespoke treatments in an exclusive environment where sophistication meets clinical excellence",
    primaryCta: {
      text: "Book Consultation",
      href: "/booking",
    },
  },
];

const defaultSecondaryCta = {
  text: "View Treatments",
  href: "/treatments",
};

export function HeroSectionV2({ data }) {
  const slides = data?.slides?.length ? data.slides : defaultSlides;
  const secondaryCta = data?.secondaryCta || defaultSecondaryCta;
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const currentContent = slides[currentSlide] || slides[0];
  const primaryCta = currentContent?.primaryCta || {
    text: currentContent?.cta || "Book Consultation",
    href: "/booking",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Hero Carousel Background */}
      <HeroCarousel
        images={slides.map((slide) => ({
          url: isMobile && slide.mobileImage ? slide.mobileImage : slide.image,
          alt: slide.headline,
          objectPosition: "object-center"
        }))}
        autoPlayInterval={8000}
        showControls={false}
        showIndicators={true}
        overlayVariant="minimal"
        onSlideChange={handleSlideChange}
        enableKenBurns={true}
      />

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-4 py-12 sm:py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div
            key={currentSlide}
            className="opacity-0 animate-fade-in-up text-left max-w-full sm:max-w-2xl"
          >
              {/* Award Badge */}
              <div className="inline-flex items-center gap-2 bg-royal-blue/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 md:mb-8">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
                <span className="text-white font-semibold text-[9px] sm:text-[10px] md:text-xs tracking-wide uppercase">
                  {currentContent.badge}
                </span>
              </div>

              {/* Main Headline - Clean and Bold */}
              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-[1.1] tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.2)' }}>
                {currentContent.headline}
                <br />
                <span className="text-primary">
                  {currentContent.subheadline}
                </span>
              </h1>

              {/* Description - Smaller and More Subtle */}
              <p className="text-[11px] sm:text-sm md:text-base text-white/80 mb-5 sm:mb-8 md:mb-10 leading-relaxed max-w-xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.15)' }}>
                {currentContent.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-start">
                <Link href={primaryCta.href}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base py-2.5 sm:py-3"
                  >
                    {primaryCta.text}
                    <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href={secondaryCta.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/60 hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-all text-sm sm:text-base py-2.5 sm:py-3"
                  >
                    {secondaryCta.text}
                  </Button>
                </Link>
              </div>
            </div>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/40 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
