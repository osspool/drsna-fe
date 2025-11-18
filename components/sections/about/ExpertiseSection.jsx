import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

/**
 * Expertise Section
 *
 * Displays areas of expertise with integrated approach.
 */
export function ExpertiseSection({ data }) {
  if (!data) return null;

  return (
    <Section background="default" padding="xl">
      <Container maxWidth="5xl">
        <SectionHeader
          badge={data.title}
          title={data.subtitle}
          titleClassName="text-3xl md:text-4xl font-heading font-bold"
        />

        {/* Main Content */}
        {data.content && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center max-w-3xl mx-auto">
            {data.content}
          </p>
        )}

        {/* Expertise Areas */}
        {data.areas && data.areas.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {data.areas.map((area, index) => (
              <div
                key={index}
                className="bg-secondary/50 rounded-xl px-6 py-4 text-center"
              >
                <p className="text-base font-medium text-foreground">{area}</p>
              </div>
            ))}
          </div>
        )}

        {/* Approach */}
        {data.approach && (
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6 text-center">
              {data.approach.title}
            </h3>
            <ul className="space-y-4 max-w-2xl mx-auto">
              {data.approach.points.map((point, index) => (
                <li key={index} className="text-base text-muted-foreground flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  );
}
