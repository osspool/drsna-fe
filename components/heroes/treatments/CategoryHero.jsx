"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Spotlight } from "@/components/aceternity/spotlight";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

/**
 * Unified Hero Component for Category and Subcategory Pages
 * @param {Object} data - Hero data including title, description, etc.
 * @param {string} variant - 'category' (default) or 'subcategory'
 * @param {boolean} showStats - Display stats section (only for category variant)
 * @param {Object} breadcrumb - Breadcrumb data for subcategory (categoryId, categoryName)
 */
export function CategoryHero({ 
  data, 
  variant = "category",
  showStats = false,
  breadcrumb = null 
}) {
  const isCategory = variant === "category";
  
  // Variant-specific configurations
  const config = {
    category: {
      minHeight: "min-h-[85vh]",
      backgroundOpacity: "opacity-20",
      overlayGradient: "bg-gradient-to-br from-background/60 via-background/50 to-secondary/90",
      containerPadding: "py-32",
      animationDuration: 0.8,
      showBeams: true,
      showScrollIndicator: true,
    },
    subcategory: {
      minHeight: "min-h-[60vh]",
      backgroundOpacity: "opacity-30",
      overlayGradient: "bg-gradient-to-b from-background/40 to-background/60",
      containerPadding: "py-24",
      animationDuration: 0.6,
      showBeams: false,
      showScrollIndicator: false,
    }
  };

  const settings = config[variant];

  return (
    <section className={`relative ${settings.minHeight} flex items-center justify-center overflow-hidden bg-black`}>
      {/* Spotlight Effect */}
      <Spotlight className="-top-40 left-0 md:left-60" fill="hsl(var(--primary))" />

      {/* Background Beams - only for category */}
      {settings.showBeams && <BackgroundBeams />}

      {/* Background Image with Overlay */}
      {data.hero?.backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={data.hero.backgroundImage}
              alt={data.title}
              fill
              sizes="100vw"
              className={`object-cover ${settings.backgroundOpacity}`}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/50 to-black/70 z-0" />
        </>
      )}

      <Container className={`relative z-10 text-center ${settings.containerPadding}`}>
        <div
          className="opacity-0 animate-fade-in-up"
        >
          {/* Breadcrumb - only for subcategory */}
          {!isCategory && breadcrumb?.categoryId && (
            <Breadcrumb 
              categoryId={breadcrumb.categoryId}
              categoryName={breadcrumb.categoryName}
            />
          )}

          {/* Tagline Badge - only for category */}
          {isCategory && data.tagline && (
            <TaglineBadge tagline={data.tagline} />
          )}

          {/* Main Headline */}
          <h1
            className="opacity-0 animate-fade-in-up text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-6 leading-tight"
            style={{ animationDelay: '300ms' }}
          >
            {data.hero?.headline || data.title}
          </h1>

          {/* Subheadline */}
          {data.hero?.subheadline && (
            <p
              className={`opacity-0 animate-fade-in text-lg md:text-xl ${isCategory ? "lg:text-2xl text-white/90 max-w-4xl mb-8" : "text-primary max-w-3xl mb-6"} mx-auto font-light leading-relaxed`}
              style={{ animationDelay: isCategory ? '500ms' : '400ms' }}
            >
              {data.hero.subheadline}
            </p>
          )}

          {/* Description */}
          {data.longDescription && (
            <div
              className={`opacity-0 animate-fade-in text-lg ${isCategory ? "md:text-xl text-white/80 mb-12" : "text-white/80 mb-10"} mx-auto leading-relaxed space-y-4`}
              style={{ animationDelay: isCategory ? '600ms' : '500ms' }}
            >
              {data.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Stats Row - only for category */}
          {isCategory && showStats && data.hero?.stats && (
            <StatsSection stats={data.hero.stats} />
          )}

          {/* CTA Buttons */}
          <CTAButtons
            cta={data.hero?.cta}
            delay={isCategory ? '800ms' : '600ms'}
          />
        </div>
      </Container>

      {/* Scroll Indicator - only for category */}
      {settings.showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

// Sub-components for better organization and reusability

function Breadcrumb({ categoryId, categoryName }) {
  return (
    <div
      className="opacity-0 animate-fade-in flex items-center justify-center gap-2 text-white/70 text-sm mb-6"
      style={{ animationDelay: '200ms' }}
    >
      <Link href="/treatments" className="hover:text-primary transition-colors">
        Treatments
      </Link>
      <span>/</span>
      <Link href={`/treatments/${categoryId}`} className="hover:text-primary transition-colors">
        {categoryName || "Category"}
      </Link>
    </div>
  );
}

function TaglineBadge({ tagline }) {
  return (
    <div
      className="opacity-0 animate-scale-in inline-flex items-center gap-2 px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full mb-8"
      style={{ animationDelay: '200ms' }}
    >
      <Sparkles className="w-4 h-4 text-primary" />
      <span className="text-primary text-sm font-semibold tracking-wider uppercase">
        {tagline}
      </span>
    </div>
  );
}

function StatsSection({ stats }) {
  return (
    <div
      className="opacity-0 animate-fade-in-up flex flex-wrap items-center justify-center gap-12 mb-12"
      style={{ animationDelay: '700ms' }}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-5xl md:text-6xl font-heading font-bold text-primary mb-2">
            {stat.value}
          </div>
          <div className="text-white/80 text-sm md:text-base tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CTAButtons({ cta, delay }) {
  return (
    <div
      className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4"
      style={{ animationDelay: delay }}
    >
      <Button
        asChild
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-10 h-12 group shadow-lg font-semibold"
      >
        <Link href="/booking">
          {cta || "Book Consultation"}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-black hover:border-white text-base px-10 h-12 shadow-lg transition-all font-semibold"
      >
        <Link href="#treatments">
          Explore Treatments
        </Link>
      </Button>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div
      className="opacity-0 animate-fade-in absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      style={{ animationDelay: '1200ms' }}
    >
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
        <div
          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
        />
      </div>
    </div>
  );
}

// Legacy export for backward compatibility
export function SubcategoryHero({ data }) {
  return (
    <CategoryHero 
      data={data} 
      variant="subcategory"
      breadcrumb={{
        categoryId: data.categoryId,
        categoryName: "Aesthetic Medicine"
      }}
    />
  );
}
