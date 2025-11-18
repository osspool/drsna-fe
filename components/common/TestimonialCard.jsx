"use client";

import { cn } from "@/lib/utils";
import { RatingStars } from "./RatingStars";
import { CheckCircle } from "lucide-react";

/**
 * Reusable TestimonialCard Component
 *
 * Provides consistent testimonial card styling across the application.
 *
 * @param {Object} props
 * @param {Object} props.testimonial - Testimonial data object
 * @param {string} props.testimonial.name - Patient name
 * @param {string} props.testimonial.quote - Testimonial quote text
 * @param {number} props.testimonial.rating - Rating (1-5)
 * @param {string} props.testimonial.treatment - Treatment name (optional)
 * @param {boolean} props.testimonial.verified - Verified status (optional)
 * @param {string} props.testimonial.results - Results achieved (optional)
 * @param {string} props.testimonial.location - Patient location (optional)
 * @param {string} props.variant - Card style: 'default' | 'compact' | 'detailed'
 * @param {string} props.className - Custom card styling
 * @param {boolean} props.animate - Enable animation (default: true)
 * @param {number} props.animationDelay - Animation delay in seconds
 */
export function TestimonialCard({
  testimonial,
  variant = "default",
  className,
  animate = true,
  animationDelay = 0,
}) {
  const {
    name,
    quote,
    rating = 5,
    treatment,
    verified,
    results,
    location,
  } = testimonial;

  // Compact variant - minimal card
  if (variant === "compact") {
    const content = (
      <div
        className={cn(
          "bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300",
          className
        )}
      >
        {rating && <RatingStars rating={rating} className="mb-4" />}

        {quote && (
          <p className="text-foreground/80 leading-relaxed mb-4 italic">
            &ldquo;{quote}&rdquo;
          </p>
        )}

        <div className="flex items-center gap-2">
          <p className="font-semibold text-foreground">{name}</p>
          {verified && (
            <CheckCircle className="w-4 h-4 text-primary" />
          )}
        </div>
        {treatment && (
          <p className="text-sm text-muted-foreground">{treatment}</p>
        )}
      </div>
    );

    if (animate) {
      return (
        <div
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${(animationDelay || 0) * 1000}ms` }}
        >
          {content}
        </div>
      );
    }

    return content;
  }

  // Detailed variant - with results and more info
  if (variant === "detailed") {
    const content = (
      <div
        className={cn(
          "bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-shadow duration-300",
          className
        )}
      >
        <div className="p-6 md:p-8">
          {/* Rating */}
          {rating && (
            <RatingStars rating={rating} className="mb-6" />
          )}

          {/* Quote */}
          {quote && (
            <p className="text-foreground/80 leading-relaxed mb-6 italic text-lg">
              &ldquo;{quote}&rdquo;
            </p>
          )}

          {/* Patient Info */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-semibold text-foreground">{name}</p>
              {treatment && (
                <p className="text-sm text-muted-foreground">{treatment}</p>
              )}
              {location && (
                <p className="text-xs text-muted-foreground">{location}</p>
              )}
            </div>

            {verified && (
              <div className="flex items-center gap-1 text-sm text-primary font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </div>
            )}
          </div>

          {/* Results Achieved */}
          {results && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">
                Results Achieved:
              </p>
              <p className="text-sm text-muted-foreground">{results}</p>
            </div>
          )}
        </div>
      </div>
    );

    if (animate) {
      return (
        <div
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${(animationDelay || 0) * 1000}ms` }}
        >
          {content}
        </div>
      );
    }

    return content;
  }

  // Default variant - standard card
  const content = (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col",
        className
      )}
    >
      {rating && <RatingStars rating={rating} className="mb-4" />}

      {quote && (
        <p className="text-foreground/80 leading-relaxed mb-6 italic flex-grow">
          &ldquo;{quote}&rdquo;
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          {treatment && (
            <p className="text-sm text-muted-foreground">{treatment}</p>
          )}
        </div>

        {verified && (
          <CheckCircle className="w-5 h-5 text-primary" />
        )}
      </div>
    </div>
  );

  if (animate) {
    return (
      <div
        className="opacity-0 animate-fade-in-up h-full"
        style={{ animationDelay: `${(animationDelay || 0) * 1000}ms` }}
      >
        {content}
      </div>
    );
  }

  return content;
}
