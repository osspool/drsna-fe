"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { MinimalTimeline } from "./MinimalTimeline";
import { VerticalTimeline } from "./VerticalTimeline";
import { SectionHeader } from "@/components/common/SectionHeader";

export function DefaultTimeline({ data, steps, schemaMarkup, variant }) {
  const isVertical = variant === "vertical";

  return (
    <Section background="muted-dark" padding="sm">
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMarkup }}
        />
      )}
      <Container>
        <SectionHeader
          badge="How It Works"
          badgeIcon="sparkles"
          badgeVariant="primary"
          badgeClassName="px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 text-primary"
          title={data.title || "Your Treatment Journey"}
          titleClassName="text-foreground"
          subtitle={data.subtitle}
          subtitleClassName="text-muted-foreground max-w-2xl mx-auto"
          align="center"
          spacing="md"
          className="max-w-4xl mx-auto mb-12 md:mb-16"
        />

        {isVertical ? (
          <VerticalTimeline steps={steps} />
        ) : (
          <MinimalTimeline steps={steps} />
        )}
      </Container>
    </Section>
  );
}
