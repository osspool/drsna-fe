import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Check } from "lucide-react";

/**
 * About Introduction Section
 *
 * Displays introduction with content paragraphs, highlights, and purpose.
 */
export function AboutIntro({ data }) {
  if (!data) return null;

  return (
    <Section background="default" padding="xl">
      <Container maxWidth="4xl">
        {/* Main Title */}
        <SectionHeader
          title={data.title}
          titleClassName="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8"
        />

        {/* Content Paragraphs */}
        {data.content && (
          <div className="space-y-4 mb-12 text-lg text-muted-foreground leading-relaxed">
            {data.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Highlights */}
        {data.highlights && data.highlights.length > 0 && (
          <div className="bg-secondary/50 rounded-2xl p-8 mb-12">
            <div className="space-y-4">
              {data.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-base text-foreground leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Purpose */}
        {data.purpose && (
          <div className="border-l-4 border-primary pl-8 py-6">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              {data.purpose.title}
            </h3>
            <ul className="space-y-3 mb-6">
              {data.purpose.points.map((point, index) => (
                <li key={index} className="text-lg text-muted-foreground">
                  {point}
                </li>
              ))}
            </ul>
            {data.purpose.closing && (
              <p className="text-base text-muted-foreground italic">
                {data.purpose.closing}
              </p>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
