/**
 * Category Introduction Section
 *
 * Displays category introduction with optional highlight cards.
 * Uses IconFeatureCard for consistent styling.
 *
 * @param {Object} props
 * @param {Object} props.data - Introduction data
 * @param {string} props.data.title - Section title
 * @param {string} props.data.content - Main content text
 * @param {Array} [props.data.highlights] - Optional highlight cards
 */

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { IconFeatureCard } from "@/components/common/IconFeatureCard";

export function CategoryIntroductionSection({ data }) {
  if (!data) return null;

  return (
    <Section background="default" padding="xl">
      <Container>
        <SectionHeader
          title={data.title}
          subtitle={data.content}
          subtitleClassName="leading-relaxed"
          maxWidth={4}
        />

        {data.highlights && data.highlights.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {data.highlights.map((highlight, index) => (
              <IconFeatureCard
                key={index}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
                variant="bordered"
                iconBg="none"
                iconSize="lg"
                className="text-center bg-secondary rounded-3xl"
                iconClassName="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto group-hover:scale-110 transition-transform"
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
