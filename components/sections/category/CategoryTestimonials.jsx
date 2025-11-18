import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Star } from "lucide-react";

/**
 * Category Testimonials Section
 *
 * Displays patient testimonials in a grid layout with star ratings.
 *
 * @param {Array} testimonials - Array of testimonial objects
 */
export function CategoryTestimonials({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Section padding="xl" className="bg-gradient-to-b from-secondary to-background">
      <Container>
        <SectionHeader
          badge="Patient Stories"
          badgeIcon="star"
          title="What Our Patients Say"
          titleClassName="text-foreground"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-3xl border border-border hover:border-primary/30 hover:shadow-xl transition-all"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
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
          ))}
        </div>
      </Container>
    </Section>
  );
}
