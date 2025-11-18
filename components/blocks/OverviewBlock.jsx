"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SlideIn, StaggerChildren } from "@/components/common/AnimatedWrapper";

/**
 * Overview Block Component
 *
 * Two-column layout displaying overview content with optional highlights and image.
 * Typically used for treatment/service introductions.
 *
 * @param {Object} props
 * @param {Object} props.data - Block data
 * @param {string} props.data.title - Section title
 * @param {string} props.data.content - Main content text (supports \n\n for paragraphs)
 * @param {string} [props.data.image] - Optional image URL
 * @param {string[]} [props.data.highlights] - Optional array of highlight strings
 *
 * @example
 * <OverviewBlock data={{
 *   title: "Premium Treatment",
 *   content: "First paragraph.\n\nSecond paragraph.",
 *   image: "/images/treatment.jpg",
 *   highlights: ["FDA Approved", "Natural Results", "Minimal Downtime"]
 * }} />
 */
export function OverviewBlock({ data }) {
  const { title, content, image, highlights } = data;

  return (
    <Section background="muted">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <SlideIn direction="left">
            <SectionHeader
              title={title}
              align="left"
              spacing="sm"
              animate={false}
            />

            <div className="prose prose-lg max-w-none mb-8">
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <StaggerChildren
                staggerDelay={100}
                animation="slideInLeft"
                className="space-y-3"
              >
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground/80 font-medium">{highlight}</span>
                  </div>
                ))}
              </StaggerChildren>
            )}
          </SlideIn>

          {/* Image */}
          {image && (
            <SlideIn direction="right">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-gold-xl">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </SlideIn>
          )}
        </div>
      </Container>
    </Section>
  );
}

