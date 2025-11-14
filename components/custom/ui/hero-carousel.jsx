"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modern Hero Carousel Component
 * Features: Auto-play, smooth transitions, Ken Burns effect, accessible controls
 * Optimized for React 19 - no unnecessary memoization
 */
export function HeroCarousel({ 
  images = [], 
  autoPlayInterval = 8000,
  showControls = true,
  showIndicators = true,
  className,
  overlayVariant = "default",
  onSlideChange,
  enableKenBurns = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState("next");

  const totalSlides = images.length || 1;
  const hasMultipleImages = images.length > 1;

  const goToNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || !hasMultipleImages) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, hasMultipleImages, autoPlayInterval, goToNext]);

  useEffect(() => {
    if (typeof onSlideChange === "function") {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  // Pause on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    // Resume after 10 seconds
    const timeout = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  if (!images.length) {
    return (
      <div className={cn("absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20", className)} />
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Image Slides */}
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={image.url || index}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0",
              direction === "next" && isActive && "animate-slideInRight",
              direction === "prev" && isActive && "animate-slideInLeft"
            )}
          >
            <Image
              src={image.url || image}
              alt={image.alt || `Slide ${index + 1}`}
              fill
              priority={index === 0}
              quality={90}
              className={cn(
                "object-cover object-center",
                enableKenBurns && isActive && "animate-kenburns"
              )}
              sizes="100vw"
            />
          </div>
        );
      })}

      {overlayVariant === "light" ? (
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/65 via-white/35 to-transparent z-20" />
      ) : overlayVariant === "minimal" ? (
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/30 via-black/40 to-transparent z-20" />
      ) : overlayVariant === "luxury" ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/65 via-black/40 to-black/60 z-20" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent z-20" />
          <div className="pointer-events-none absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 blur-3xl opacity-30 z-20" />
        </>
      ) : overlayVariant === "none" ? null : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/60 via-slate-950/40 to-slate-900/55 z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-primary/25 blur-3xl opacity-40 z-20" />
        </>
      )}

      {hasMultipleImages && (
        <>
          {/* Navigation Controls - More Visible */}
      {showControls && hasMultipleImages && (
            <>
              <button
                onClick={() => {
                  goToPrev();
                  handleUserInteraction();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full border border-white/50 bg-black/35 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => {
                  goToNext();
                  handleUserInteraction();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full border border-white/50 bg-black/35 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black/20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* Slide Indicators - More Visible */}
          {showIndicators && (
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-black/40 backdrop-blur-sm px-4 py-2.5 rounded-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    goToSlide(index);
                    handleUserInteraction();
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/70",
                    currentIndex === index 
                      ? "w-10 bg-white shadow-lg shadow-white/50" 
                      : "w-2 bg-white/50 hover:bg-white/70"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

