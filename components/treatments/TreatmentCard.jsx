"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, TrendingUp, Star } from "lucide-react";
import { CometCard } from "@/components/aceternity/comet-card";
import { FadeInUp } from "@/components/common/AnimatedWrapper";

/**
 * Treatment Card Component
 *
 * Displays a treatment card with image, metadata, benefits, and pricing.
 * Used in treatment grids and listings.
 *
 * @param {Object} props
 * @param {Object} props.treatment - Treatment object with all details
 * @param {string} props.categoryId - Category slug
 * @param {string} [props.subcategoryId] - Optional subcategory slug
 * @param {number} [props.index=0] - Card index for animation delay
 */
export function TreatmentCard({ treatment, categoryId, subcategoryId, index = 0 }) {
  const href = subcategoryId
    ? `/treatments/${categoryId}/${subcategoryId}/${treatment.id}`
    : `/treatments/${categoryId}/${treatment.id}`;

  return (
    <FadeInUp delay={index * 50}>
      <Link href={href}>
        <CometCard>
          <div className="group relative h-full rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500">
            {/* Image Section */}
            {treatment.image && (
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {treatment.featured && (
                    <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                  {treatment.popular && (
                    <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      Popular
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-8">
              {/* Title */}
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {treatment.title}
              </h3>

              {/* Short Description */}
              {treatment.shortDescription && (
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {treatment.shortDescription}
                </p>
              )}

              {/* Meta Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-border">
                {treatment.duration && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span>{treatment.duration}</span>
                  </div>
                )}
                {treatment.results && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                    <span>{treatment.results}</span>
                  </div>
                )}
                {treatment.downtime && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span>{treatment.downtime}</span>
                  </div>
                )}
                {treatment.longevity && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="w-4 h-4 mr-2 text-primary" />
                    <span>{treatment.longevity}</span>
                  </div>
                )}
              </div>

              {/* Benefits */}
              {treatment.benefits && treatment.benefits.length > 0 && (
                <div className="mb-6">
                  <ul className="space-y-2">
                    {treatment.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-primary mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price & CTA */}
              <div className="flex items-center justify-between">
                {treatment.price && (
                  <span className="text-primary font-heading font-bold text-xl">
                    {treatment.price}
                  </span>
                )}
                <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </CometCard>
      </Link>
    </FadeInUp>
  );
}

/**
 * Simplified Treatment Card Component
 *
 * Lightweight version for grid layouts without images.
 *
 * @param {Object} props
 * @param {Object} props.treatment - Treatment object
 * @param {string} props.categoryId - Category slug
 * @param {string} [props.subcategoryId] - Optional subcategory slug
 * @param {number} [props.index=0] - Card index for animation delay
 */
export function TreatmentCardSimple({ treatment, categoryId, subcategoryId, index = 0 }) {
  const href = subcategoryId
    ? `/treatments/${categoryId}/${subcategoryId}/${treatment.id}`
    : `/treatments/${categoryId}/${treatment.id}`;

  return (
    <FadeInUp delay={index * 50}>
      <Link href={href}>
        <div className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500">
          {/* Hover gradient effect */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Treatment Name */}
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {treatment.title}
            </h3>

            {/* Meta Info */}
            <div className="space-y-2 mb-6">
              {treatment.duration && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{treatment.duration}</span>
                </div>
              )}
              {treatment.results && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>{treatment.results}</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center text-primary font-semibold text-sm">
              Learn more
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </FadeInUp>
  );
}
