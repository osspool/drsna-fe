"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/custom/ui/hero-carousel";
import { motion, AnimatePresence } from "framer-motion";

// Three powerful slides with emotional messaging
const heroSlides = [
  {
    id: 1,
    image: "/images/drsnaclinic/doctor-hero.jpg",
    badge: "GLOBAL RECOGNITION AWARD 2024",
    headline: "Award-Winning",
    subheadline: "Dr Syed Nadeem Abbas",
    description: "Experience transformative care from London's most distinguished aesthetic medicine specialist",
    cta: "Meet Dr Abbas",
    emphasis: "Excellence Redefined",
  },
  {
    id: 2,
    image: "/images/drsnaclinic/clinic-outside.jpg",
    badge: "CUTTING-EDGE TREATMENTS",
    headline: "Rediscover Your",
    subheadline: "Natural Radiance",
    description: "Advanced regenerative therapies tailored to enhance your inherent beauty with precision and artistry",
    cta: "Explore Treatments",
    emphasis: "Transform with Confidence",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80",
    badge: "LUXURY AESTHETIC MEDICINE",
    headline: "Embrace Your",
    subheadline: "Best Self",
    description: "Bespoke treatments in an exclusive environment where sophistication meets clinical excellence",
    cta: "Book Consultation",
    emphasis: "Elevate Your Journey",
  },
];

export function HeroSectionV2() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const currentContent = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Hero Carousel Background */}
      <HeroCarousel
        images={heroSlides.map(slide => ({
          url: slide.image,
          alt: slide.headline
        }))}
        autoPlayInterval={8000}
        showControls={false}
        showIndicators={true}
        overlayVariant="minimal"
        onSlideChange={handleSlideChange}
        enableKenBurns={true}
      />

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-4 py-20 sm:py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-left max-w-full sm:max-w-2xl"
            >
              {/* Award Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 md:mb-8">
                <Award className="w-3.5 h-3.5 text-primary-foreground flex-shrink-0" />
                <span className="text-primary-foreground font-semibold text-[10px] sm:text-xs tracking-wide uppercase">
                  {currentContent.badge}
                </span>
              </div>

              {/* Main Headline - Clean and Bold */}
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
                {currentContent.headline}
                <br />
                <span className="text-primary">
                  {currentContent.subheadline}
                </span>
              </h1>

              {/* Description - Smaller and More Subtle */}
              <p className="text-xs sm:text-sm md:text-base text-white/80 mb-8 md:mb-10 leading-relaxed max-w-xl">
                {currentContent.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
                <Link href={currentSlide === 0 ? "/dr-syed-nadeem-abbas" : "/booking"}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {currentContent.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/treatments">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/60 hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-all"
                  >
                    View Treatments
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/40 to-transparent z-20 pointer-events-none" />
    </section>
  );
}
