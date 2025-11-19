"use client";

import Link from "next/link";
import { SmartImage } from "@/components/common/SmartImage";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function SubcategoryGrid({ subcategories, categoryId }) {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <section id="treatments" className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">
              Our Treatments
            </span>
          </div>

          <h2
            className="opacity-0 animate-fade-in-up text-3xl md:text-4xl font-heading font-bold text-foreground mb-3"
            style={{ animationDelay: '100ms' }}
          >
            Explore Our Specialties
          </h2>

          <p
            className="opacity-0 animate-fade-in-up text-base text-muted-foreground max-w-3xl mx-auto"
            style={{ animationDelay: '200ms' }}
          >
            Choose from our range of specialized treatment areas, each expertly designed to address your unique needs
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {subcategories.map((subcategory, index) => (
            <SubcategoryCard
              key={subcategory.id}
              subcategory={subcategory}
              categoryId={categoryId}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SubcategoryCard({ subcategory, categoryId, index }) {
  return (
    <div
      className="opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/treatments/${categoryId}/${subcategory.id}`}>
        <div className="group relative h-full rounded-3xl overflow-hidden bg-card border-2 border-border hover:border-transparent hover:shadow-2xl transition-all duration-700">
          {/* Image Section */}
          {subcategory.image && (
            <div className="relative h-56 overflow-hidden">
              <SmartImage
                src={subcategory.image}
                alt={subcategory.title}
                title={subcategory.title}
                description={subcategory.description}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              {/* Featured Badge */}
              {subcategory.featured && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full">
                  <span className="text-primary-foreground font-semibold text-xs">Featured</span>
                </div>
              )}

              {/* Treatment Count */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full">
                  <span className="text-foreground font-semibold text-xs">
                    {subcategory.treatmentCount} {subcategory.treatmentCount === 1 ? 'Treatment' : 'Treatments'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {subcategory.title}
            </h3>

            {/* Short Description */}
            {subcategory.shortDescription && (
              <p className="text-sm text-muted-foreground mb-2">
                {subcategory.shortDescription}
              </p>
            )}

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {subcategory.description}
            </p>

            {/* CTA */}
            <div className="flex items-center text-primary font-semibold text-sm">
              Explore {subcategory.title} Treatments
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Color Accent */}
          {subcategory.color && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
              style={{ backgroundColor: subcategory.color }}
            />
          )}
        </div>
      </Link>
    </div>
  );
}
