"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SlideIn, FadeInUp } from "@/components/common/AnimatedWrapper";
import { cn } from "@/lib/utils";

/**
 * Content Block Component
 *
 * Flexible content display supporting text-only or text-image layouts.
 * Image position can be configured for left/right placement.
 *
 * @param {Object} props
 * @param {Object} props.data - Block data
 * @param {string} [props.data.heading] - Optional heading text
 * @param {string} props.data.content - HTML content string
 * @param {string} [props.data.image] - Image URL
 * @param {'left'|'right'} [props.data.imagePosition='right'] - Image position
 * @param {string} [props.data.imageAlt] - Image alt text
 * @param {'text-only'|'text-image'} [props.data.layout='text-image'] - Layout variant
 */
export function ContentBlock({ data }) {
  const { heading, content, image, imagePosition = "right", imageAlt, layout = "text-image" } = data;
  const isImageRight = imagePosition === "right";

  if (layout === "text-only") {
    return (
      <Section>
        <Container maxWidth="4xl">
          <FadeInUp>
            {heading && (
              <h2 className="text-4xl font-heading font-bold mb-6 text-gold">
                {heading}
              </h2>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </FadeInUp>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className={cn(
          "grid md:grid-cols-2 gap-12 items-center",
          isImageRight ? "" : "md:grid-flow-dense"
        )}>
          {/* Text Content */}
          <SlideIn
            direction={isImageRight ? 'left' : 'right'}
            className={isImageRight ? '' : 'md:col-start-2'}
          >
            {heading && (
              <h2 className="text-4xl font-heading font-bold mb-6 text-gold">
                {heading}
              </h2>
            )}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gold prose-strong:text-gold-dark"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </SlideIn>

          {/* Image */}
          <SlideIn
            direction={isImageRight ? 'right' : 'left'}
            className={cn(
              isImageRight ? "" : "md:col-start-1 md:row-start-1"
            )}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-gold-lg">
              <Image
                src={image || "/images/placeholder.jpg"}
                alt={imageAlt || heading || "Treatment image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </SlideIn>
        </div>
      </Container>
    </Section>
  );
}
