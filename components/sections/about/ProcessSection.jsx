import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { generateStableKey } from "@/lib/utils";

/**
 * Process Section
 *
 * Displays patient experience and expectations.
 */
export function ProcessSection({ data }) {
  if (!data) return null;

  return (
    <Section background="muted" padding="xl">
      <Container maxWidth="4xl">
        <SectionHeader
          badge={data.title}
          title={data.subtitle}
          titleClassName="text-3xl md:text-4xl font-heading font-bold"
        />

        {/* Expectations */}
        {data.expectations && (
          <div className="mb-8">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6 text-center">
              {data.expectations.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.expectations.steps.map((step, index) => (
                <div key={generateStableKey(step, index, "process-step")} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-base text-foreground leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environment */}
        {data.environment && (
          <p className="text-center text-lg text-muted-foreground leading-relaxed italic">
            {data.environment}
          </p>
        )}
      </Container>
    </Section>
  );
}
