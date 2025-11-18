/**
 * Treatments Categories Section
 *
 * Displays treatment categories in a staggered grid layout.
 * Uses centralized animation primitives for consistency.
 *
 * @param {Object} props
 * @param {Object} props.data - Section configuration
 * @param {string} props.data.badge - Section badge text
 * @param {string} props.data.title - Section title
 * @param {string} props.data.subtitle - Section subtitle
 * @param {Array} props.data.categories - Array of category objects
 */

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TreatmentsCategoryCard } from "@/components/treatments/TreatmentsCategoryCard";
import { AnimatedSectionHeader } from "@/components/treatments/TreatmentsAnimatedSection";

export function TreatmentsCategoriesSection({ data }) {
  const { badge, title, subtitle, categories } = data;

  return (
    <Section
      id="categories"
      padding="lg"
      className="bg-linear-to-b from-secondary/30 to-background"
    >
      <Container>
        {/* Section Header */}
        <AnimatedSectionHeader
          badge={badge}
          title={title}
          subtitle={subtitle}
        />

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <TreatmentsCategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
