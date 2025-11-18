import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CheckCircle } from "lucide-react";

/**
 * Why Choose Section
 *
 * Displays reasons why patients trust the clinic.
 */
export function WhyChooseSection({ data }) {
  if (!data) return null;

  return (
    <Section background="default" padding="xl">
      <Container>
        <SectionHeader
          title={data.title}
          titleClassName="text-3xl md:text-4xl font-heading font-bold"
        />

        {/* Intro */}
        {data.intro && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center">
            {data.intro}
          </p>
        )}

        {/* Points */}
        {data.points && data.points.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {data.points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-base text-foreground leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        )}

        {/* Closing */}
        {data.closing && (
          <p className="text-center text-lg text-foreground font-medium italic border-t border-border pt-8">
            {data.closing}
          </p>
        )}
      </Container>
    </Section>
  );
}
