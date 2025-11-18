"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CometCard } from "@/components/aceternity/comet-card";
import { Icon } from "@/components/custom/ui/icon";
import { getIconComponent } from "@/lib/icon-utils";

/**
 * Featured Grid Component
 *
 * Unified component for displaying featured items (categories or treatments) in a grid layout.
 * Supports two variants with different card styles and content.
 *
 * @param {Object} props
 * @param {'category'|'treatment'} props.variant - Display variant
 * @param {Array} props.items - Items to display
 * @param {Object} props.header - Section header configuration (badge, title, subtitle)
 * @param {Object} props.cta - Optional CTA button (text, href)
 * @param {string} props.background - Section background variant
 * @param {string} props.padding - Section padding variant
 * @param {number} props.maxItems - Maximum items to show
 * @param {string} props.categoryId - Required for treatment variant (for URL generation)
 * @param {string} props.subcategoryId - Required for treatment variant (for URL generation)
 */
export function FeaturedGrid({
  variant = "category",
  items = [],
  header = {},
  cta = null,
  background = "default",
  padding = "sm",
  maxItems = 3,
  categoryId,
  subcategoryId
}) {
  if (!items || items.length === 0) return null;

  const displayItems = items.slice(0, maxItems);

  return (
    <Section padding={padding} background={background}>
      <Container maxWidth={variant === "category" ? "6xl" : "default"}>
        {/* Section Header */}
        {(header.title || header.badge) && (
          <SectionHeader
            badge={header.badge}
            title={header.title}
            subtitle={header.subtitle}
            titleClassName={variant === "category" ? "text-4xl md:text-5xl lg:text-6xl" : undefined}
            subtitleClassName={variant === "category" ? "text-base md:text-lg" : undefined}
            maxWidth={variant === "category" ? 2 : undefined}
            spacing="md"
          />
        )}

        {/* Grid Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 ${variant === "category" ? "md:auto-rows-fr items-stretch" : ""}`}>
          {displayItems.map((item, index) => {
            if (variant === "category") {
              return <CategoryCard key={item.title + index} item={item} index={index} />;
            } else {
              return (
                <TreatmentCard
                  key={item.id}
                  item={item}
                  categoryId={categoryId}
                  subcategoryId={subcategoryId}
                />
              );
            }
          })}
        </div>

        {/* CTA Button */}
        {cta && (
          <div
            className="opacity-0 animate-fade-in-up mt-14 md:mt-16 flex justify-center"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <Link href={cta.href} className="gap-2">
                {cta.text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

/**
 * Category Card - Used in 'category' variant
 * Large image-based cards for showcasing treatment categories
 */
function CategoryCard({ item, index }) {
  const IconComponent = getIconComponent(item.icon, "sparkles");

  return (
    <div
      className="opacity-0 animate-fade-in-up flex h-full"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Desktop Version */}
      <div className="hidden md:block w-full h-full group">
        <CometCard rotateDepth={5} translateDepth={8} className="w-full h-full">
          <Link href={item.href} className="block h-full w-full">
            <div className="gradient-border group-hover:gradient-border-hover rounded-3xl h-full w-full transition-all duration-300">
              <div className="gradient-border-inner rounded-[calc(1.5rem-4px)] flex flex-col shadow-sm">
                <div className="relative w-full aspect-5/3 overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                  />

                  <div className="absolute top-5 left-5">
                    <div className="bg-card rounded-2xl p-2.5 shadow-sm border border-border/50">
                      <IconComponent className="w-5 h-5 text-primary" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col grow p-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  {item.treatments && (
                    <div className="mt-auto space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Signature Treatments
                      </p>
                      <div className="flex flex-wrap gap-2" aria-label={`${item.title} treatments`}>
                        {item.treatments.map((treatment) => (
                          <span
                            key={treatment}
                            className="text-sm font-medium text-foreground/80 bg-secondary/40 rounded-full px-3 py-1"
                          >
                            {treatment}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </CometCard>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden w-full h-full">
        <Link href={item.href} className="block h-full w-full group">
          <div className="gradient-border group-hover:gradient-border-hover rounded-3xl h-full w-full transition-all duration-300">
            <div className="gradient-border-inner rounded-[calc(1.5rem-4px)] flex flex-col">
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="bg-card rounded-2xl p-2 border border-border/50">
                    <IconComponent className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col grow p-5 gap-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {item.treatments && (
                  <div className="mt-auto space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Signature Treatments
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.treatments.map((treatment) => (
                        <span
                          key={treatment}
                          className="text-xs font-medium text-foreground/80 bg-secondary/40 rounded-full px-3 py-1"
                        >
                          {treatment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

/**
 * Treatment Card - Used in 'treatment' variant
 * Simple text-based cards for highlighting individual treatments
 */
function TreatmentCard({ item, categoryId, subcategoryId }) {
  return (
    <CometCard>
      <Link
        href={`/treatments/${categoryId}/${subcategoryId}/${item.id}`}
        className="block group"
      >
        <div className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 h-full">
          {/* Badge */}
          {item.badge && (
            <div className="absolute -top-3 right-6">
              <span className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg uppercase tracking-wider">
                {item.badge}
              </span>
            </div>
          )}

          {/* Icon */}
          {item.icon && (
            <div className="mb-4">
              <Icon name={item.icon} size={24} className="text-primary" />
            </div>
          )}

          {/* Treatment Title */}
          <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2 min-h-[40px]">
            {item.shortDescription}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            {item.price && (
              <span className="text-primary font-heading font-bold text-xl">
                {item.price}
              </span>
            )}
            <span className="text-primary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn more
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </CometCard>
  );
}
