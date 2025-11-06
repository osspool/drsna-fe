"use client";

import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/aceternity/flip-words";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { Spotlight } from "@/components/aceternity/spotlight";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with ReactPlayer
const BackgroundVideo = dynamic(
  () => import("@/components/landing/BackgroundVideo"),
  { ssr: false }
);

export function HeroSection() {
  const flipWords = ["Excellence", "Precision", "Artistry", "Innovation"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background Layer */}
      <div className="absolute inset-0">
        <BackgroundVideo url="https://www.youtube.com/watch?v=nUqENQZHd80" />
      </div>

      {/* Sophisticated gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />

      {/* Spotlight effects - Using CSS variables for theme awareness */}
      <Spotlight className="-top-40 left-0 md:left-60" fill="hsl(var(--primary))" />
      <Spotlight className="top-10 right-0 md:right-60" fill="hsl(var(--primary) / 0.8)" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Award Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-5 py-2.5 rounded-full mb-6 shadow-primary-lg"
          >
            <Award className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground font-bold text-xs tracking-wider">
              GLOBAL RECOGNITION AWARD 2024
            </span>
          </motion.div>

          {/* Main Headline with Flip Words */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6 leading-tight"
          >
            Aesthetic Medicine
            <br />
            Redefined by{" "}
            <span className="inline-block">
              <FlipWords words={flipWords} className="text-primary drop-shadow-lg" />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-md mb-10 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Enhancing your natural beauty with{" "}
            <span className="text-primary font-semibold drop-shadow-sm">precision</span>,{" "}
            <span className="text-primary font-semibold drop-shadow-sm">safety</span>, and{" "}
            <span className="text-primary font-semibold drop-shadow-sm">expertise</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/booking">
              <MovingBorderButton
                borderRadius="1.5rem"
                className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground px-8 py-3.5 font-bold text-base shadow-primary-lg hover:shadow-primary transition-all duration-300"
                borderClassName="bg-gradient-to-r from-primary via-primary/90 to-primary/70"
              >
                <span className="flex items-center gap-2">
                  Book Consultation
                  <ArrowRight className="w-5 h-5" />
                </span>
              </MovingBorderButton>
            </Link>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white hover:text-primary-foreground bg-transparent border-2 border-primary hover:bg-primary px-8 py-6 rounded-2xl transition-all duration-300 shadow-lg font-semibold"
            >
              <Link href="#about">
                Discover Our Approach
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 text-white/80 text-xs md:text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-primary" />
              <span>CQC Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-primary" />
              <span>GMC Certified Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-primary" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-primary" />
              <span>10,000+ Happy Patients</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="h-20 bg-gradient-to-t from-secondary/10 to-transparent" />
      </div>
    </section>
  );
}
