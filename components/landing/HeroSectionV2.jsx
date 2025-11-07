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
        overlayVariant="luxury"
        onSlideChange={handleSlideChange}
        enableKenBurns={true}
      />

      {/* Gradient orbs for luxury feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-4 py-16 sm:py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left max-w-full sm:max-w-3xl"
            >
              {/* Award Badge */}
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-linear-to-r from-primary via-primary/70 to-primary/80 px-3 py-2 md:px-6 md:py-3 rounded-full mb-6 md:mb-8 shadow-lg shadow-primary/50">
                <Award className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground flex-shrink-0" />
                <span className="text-primary-foreground font-bold text-[10px] md:text-xs tracking-wider uppercase leading-tight">
                  {currentContent.badge}
                </span>
              </div>

              {/* Main Headline - Two Lines with Different Styling */}
              <div className="mb-4 md:mb-6">
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
                  {currentContent.headline}
                  <br />
                  <span className="bg-linear-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent drop-shadow-lg">
                    {currentContent.subheadline}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-white/90 drop-shadow-md mb-3 md:mb-4 leading-relaxed font-light">
                {currentContent.description}
              </p>

              {/* Emphasis Text */}
              <p className="text-xs sm:text-sm md:text-base text-primary font-semibold drop-shadow-sm mb-6 md:mb-8 tracking-wide">
                {currentContent.emphasis}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-start w-full sm:w-auto">
                <Link href={currentSlide === 0 ? "/dr-syed-nadeem-abbas" : "/booking"} className="w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-auto group bg-linear-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base font-semibold rounded-lg md:rounded-xl shadow-xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {currentContent.cta}
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>

                <Link href="/treatments" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-white hover:text-primary-foreground bg-transparent border-2 border-white/70 hover:bg-primary hover:border-primary px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl transition-all duration-300 font-semibold"
                  >
                    View All Treatments
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust Indicators - Static */}
          <div className="mt-10 md:mt-16 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-3 md:gap-6 lg:gap-8 text-white/80 text-xs sm:text-sm md:text-base font-medium max-w-3xl">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shadow-lg shadow-primary/50 flex-shrink-0" />
              <span className="leading-tight">CQC Registered</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shadow-lg shadow-primary/50 flex-shrink-0" />
              <span className="leading-tight">GMC Certified Doctors</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shadow-lg shadow-primary/50 flex-shrink-0" />
              <span className="leading-tight">15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shadow-lg shadow-primary/50 flex-shrink-0" />
              <span className="leading-tight">10,000+ Happy Patients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent" />
        <div className="h-24 bg-linear-to-t from-secondary/10 to-transparent" />
      </div>
    </section>
  );
}
