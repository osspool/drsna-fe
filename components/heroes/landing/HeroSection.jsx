"use client";

import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/aceternity/flip-words";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { Spotlight } from "@/components/aceternity/spotlight";
import { FadeInUp, ScaleIn, FadeIn } from "@/components/common/AnimatedWrapper";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with ReactPlayer
const BackgroundVideo = dynamic(
  () => import("@/components/landing/BackgroundVideo"),
  { ssr: false }
);

/**
 * Hero Section Component
 *
 * Full-screen hero section with video background, animated text, and CTAs.
 * Features Aceternity UI components for sophisticated animations.
 *
 * @param {Object} props
 * @param {string} [props.videoUrl] - YouTube video URL for background
 * @param {string} [props.badge] - Award/recognition badge text
 * @param {string} [props.headline] - Main headline text
 * @param {string} [props.headlinePrefix] - Optional text before headline
 * @param {string[]} [props.flipWords] - Array of words to animate
 * @param {string} [props.subheadline] - Subheadline HTML string
 * @param {string[]} [props.highlightedWords] - Words to highlight in subheadline
 * @param {string} [props.primaryCTA] - Primary button text
 * @param {string} [props.primaryCTAHref] - Primary button link
 * @param {string} [props.secondaryCTA] - Secondary button text
 * @param {string} [props.secondaryCTAHref] - Secondary button link
 * @param {string[]} [props.trustIndicators] - Array of trust indicator strings
 */
export function HeroSection({
  videoUrl = "https://www.youtube.com/watch?v=nUqENQZHd80",
  badge = "GLOBAL RECOGNITION AWARD 2024",
  headline = "Aesthetic Medicine",
  headlinePrefix = null,
  flipWords = ["Excellence", "Precision", "Artistry", "Innovation"],
  subheadline = null,
  highlightedWords = ["precision", "safety", "expertise"],
  primaryCTA = "Book Consultation",
  primaryCTAHref = "/booking",
  secondaryCTA = "Discover Our Approach",
  secondaryCTAHref = "#about",
  trustIndicators = [
    "CQC Registered",
    "GMC Certified Doctors",
    "15+ Years Experience",
    "10,000+ Happy Patients"
  ]
}) {
  const words = flipWords;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background Layer */}
      <div className="absolute inset-0">
        <BackgroundVideo url={videoUrl} />
      </div>

      {/* Sophisticated gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />

      {/* Spotlight effects - Using CSS variables for theme awareness */}
      <Spotlight className="-top-40 left-0 md:left-60" fill="hsl(var(--primary))" />
      <Spotlight className="top-10 right-0 md:right-60" fill="hsl(var(--primary) / 0.8)" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <FadeInUp>
          <div className="max-w-4xl mx-auto text-center">
            {/* Award Badge */}
            {badge && (
              <ScaleIn delay={300}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-5 py-2.5 rounded-full mb-6 shadow-primary-lg">
                  <Award className="w-4 h-4 text-primary-foreground" />
                  <span className="text-primary-foreground font-bold text-xs tracking-wider">
                    {badge}
                  </span>
                </div>
              </ScaleIn>
            )}

            {/* Main Headline with Flip Words */}
            <FadeInUp delay={500}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6 leading-tight">
                {headlinePrefix && (
                  <>
                    {headlinePrefix}
                    <br />
                  </>
                )}
                {headline}
                {words && words.length > 0 && (
                  <>
                    {" "}
                    <span className="inline-block">
                      <FlipWords words={words} className="text-primary drop-shadow-lg" />
                    </span>
                  </>
                )}
              </h1>
            </FadeInUp>

            {/* Subheadline */}
            {subheadline && (
              <FadeInUp delay={800}>
                <p
                  className="text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-md mb-10 leading-relaxed max-w-2xl mx-auto font-light"
                  dangerouslySetInnerHTML={{ __html: subheadline }}
                />
              </FadeInUp>
            )}

            {/* CTA Buttons */}
            <FadeInUp delay={1100}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href={primaryCTAHref}>
                  <MovingBorderButton
                    borderRadius="1.5rem"
                    className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground px-8 py-3.5 font-bold text-base shadow-primary-lg hover:shadow-primary transition-all duration-300"
                    borderClassName="bg-gradient-to-r from-primary via-primary/90 to-primary/70"
                  >
                    <span className="flex items-center gap-2">
                      {primaryCTA}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </MovingBorderButton>
                </Link>

                {secondaryCTA && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-white hover:text-primary-foreground bg-transparent border-2 border-primary hover:bg-primary px-8 py-6 rounded-2xl transition-all duration-300 shadow-lg font-semibold"
                  >
                    <Link href={secondaryCTAHref}>
                      {secondaryCTA}
                    </Link>
                  </Button>
                )}
              </div>
            </FadeInUp>

            {/* Trust Indicators */}
            {trustIndicators && trustIndicators.length > 0 && (
              <FadeIn delay={1500}>
                <div className="flex flex-wrap justify-center gap-6 text-white/80 text-xs md:text-sm font-medium">
                  {trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-primary" />
                      <span>{indicator}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </FadeInUp>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="h-20 bg-gradient-to-t from-secondary/10 to-transparent" />
      </div>
    </section>
  );
}
