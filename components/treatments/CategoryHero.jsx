"use client";

import { motion } from "framer-motion";
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
              className={`object-cover ${settings.backgroundOpacity}`}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70 z-0" />
        </>
      )}

      <Container className={`relative z-10 text-center ${settings.containerPadding}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: settings.animationDuration }}
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
          >
            {data.hero?.headline || data.title}
          </motion.h1>

          {/* Subheadline */}
          {data.hero?.subheadline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isCategory ? 0.5 : 0.4 }}
              className={`text-lg md:text-xl ${isCategory ? "lg:text-2xl text-white/90 max-w-4xl mb-8" : "text-primary max-w-3xl mb-6"} mx-auto font-light leading-relaxed`}
            >
              {data.hero.subheadline}
            </motion.p>
          )}

          {/* Description */}
          {data.longDescription && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isCategory ? 0.6 : 0.5 }}
              className={`text-lg ${isCategory ? "md:text-xl text-white/80 mb-12" : "text-white/80 mb-10"} mx-auto leading-relaxed space-y-4`}
            >
              {data.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>
          )}

          {/* Stats Row - only for category */}
          {isCategory && showStats && data.hero?.stats && (
            <StatsSection stats={data.hero.stats} />
          )}

          {/* CTA Buttons */}
          <CTAButtons 
            cta={data.hero?.cta}
            delay={isCategory ? 0.8 : 0.6}
          />
        </motion.div>
      </Container>

      {/* Scroll Indicator - only for category */}
      {settings.showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

// Sub-components for better organization and reusability

function Breadcrumb({ categoryId, categoryName }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex items-center justify-center gap-2 text-white/70 text-sm mb-6"
    >
      <Link href="/treatments" className="hover:text-primary transition-colors">
        Treatments
      </Link>
      <span>/</span>
      <Link href={`/treatments/${categoryId}`} className="hover:text-primary transition-colors">
        {categoryName || "Category"}
      </Link>
    </motion.div>
  );
}

function TaglineBadge({ tagline }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full mb-8"
    >
      <Sparkles className="w-4 h-4 text-primary" />
      <span className="text-primary text-sm font-semibold tracking-wider uppercase">
        {tagline}
      </span>
    </motion.div>
  );
}

function StatsSection({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="flex flex-wrap items-center justify-center gap-12 mb-12"
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
    </motion.div>
  );
}

function CTAButtons({ cta, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <Button
        asChild
        size="lg"
        className="btn-primary-gradient text-base px-10 h-12 group"
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
        className="glass-card border-2 border-white/30 text-white hover:bg-primary hover:border-primary text-base px-10 h-12 shadow-lg transition-all"
      >
        <Link href="#treatments">
          Explore Treatments
        </Link>
      </Button>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
    >
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 bg-primary rounded-full"
        />
      </div>
    </motion.div>
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
