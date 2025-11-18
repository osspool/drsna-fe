"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TreatmentsCategoryCard } from "@/components/treatments/TreatmentsCategoryCard";
import {
  AnimatedSectionHeader
} from "@/components/treatments/TreatmentsAnimatedSection";

/**
 * Treatments Category Section
 *
 * Displays grid of treatment categories with animated header
 */
export function TreatmentsCategorySection({ data, categories }) {
  return (
    <Section
      id="categories"
      padding="lg"
      className="bg-linear-to-b from-secondary/30 to-background"
    >
      <Container>
        {/* Section Header */}
        <AnimatedSectionHeader
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <TreatmentsCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
