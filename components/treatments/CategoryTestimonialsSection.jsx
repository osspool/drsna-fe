/**
 * Category Testimonials Section
 *
 * Displays patient testimonials in a grid layout.
 * Uses FadeInUp animation for cards.
 *
 * @param {Object} props
 * @param {Array} props.data - Array of testimonial objects
 */

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FadeInUp } from "@/components/common/AnimatedWrapper";
import { Star } from "lucide-react";
import { generateStableKey } from "@/lib/utils";

export function CategoryTestimonialsSection({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <Section padding="xl" className="bg-linear-to-b from-secondary to-background">
      <Container>
        <SectionHeader
          badge="Patient Stories"
          badgeIcon="star"
          title="What Our Patients Say"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((testimonial, index) => (
            <FadeInUp key={generateStableKey(testimonial, index, "category-testimonial")} delay={index * 100}>
              <div className="bg-card p-8 rounded-3xl border border-border hover:border-primary/30 hover:shadow-xl transition-all h-full">
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={generateStableKey(`${testimonial.name || "testimonial"}-star`, i, "category-testimonial-star")}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author Info */}
                <div className="pt-6 border-t border-border">
                  <p className="font-heading font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.treatment} • {testimonial.location}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
