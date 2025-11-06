"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, ArrowRight, Sparkles } from "lucide-react";
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

  const handleSlideChange = (index) => {
    if (index !== currentSlide) {
      setCurrentSlide(index);
    }
  };

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

      {/* Animated gradient orbs for luxury feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              {/* Award Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-linear-to-r from-primary via-primary/70 to-primary/80 px-6 py-3 rounded-full mb-8 shadow-lg shadow-primary/50"
              >
                <Award className="w-4 h-4 text-primary-foreground" />
                <span className="text-primary-foreground font-bold text-xs tracking-wider uppercase">
                  {currentContent.badge}
                </span>
              </motion.div>

              {/* Main Headline - Two Lines with Different Styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6"
              >
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
                  {currentContent.headline}
                  <br />
                  <span className="bg-linear-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent drop-shadow-lg">
                    {currentContent.subheadline}
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base md:text-lg lg:text-xl text-white/90 drop-shadow-md mb-4 leading-relaxed max-w-3xl mx-auto font-light"
              >
                {currentContent.description}
              </motion.p>

              {/* Emphasis Text */}
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-sm md:text-base text-primary font-semibold drop-shadow-sm mb-10 tracking-wide"
              >
                {currentContent.emphasis}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="group bg-linear-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground px-10 py-7 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/50 hover:shadow-primary hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      {currentContent.cta}
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>

                <Link href="/treatments">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white hover:text-primary-foreground bg-transparent border-2 border-white/70 hover:bg-primary hover:border-primary px-10 py-7 text-lg rounded-2xl transition-all duration-300 shadow-lg font-semibold"
                  >
                    View All Treatments
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Trust Indicators - Static */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20 flex flex-wrap justify-center gap-8 text-white/80 text-sm md:text-base font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <span>CQC Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <span>GMC Certified Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <span>10,000+ Happy Patients</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent" />
        <div className="h-24 bg-linear-to-t from-secondary/10 to-transparent" />
      </div>

      {/* Sparkle effects for luxury feel */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/40" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
