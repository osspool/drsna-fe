import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { generateStableKey } from "@/lib/utils";

/**
 * Values Section
 *
 * Displays core values and promises.
 */
export function ValuesSection({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <Section background="default" padding="xl">
      <Container maxWidth="5xl">
        <div className="space-y-12">
          {data.map((value, index) => (
            <div
              key={generateStableKey(value, index, "values-entry")}
              className="bg-card rounded-2xl p-8 md:p-12 border border-border"
            >
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                {value.title}
              </h2>

              {/* Subtitle */}
              {value.subtitle && (
                <p className="text-lg text-primary font-medium mb-6">
                  {value.subtitle}
                </p>
              )}

              {/* Content */}
              {value.content && (
                <p className="text-base text-muted-foreground mb-6">
                  {value.content}
                </p>
              )}

              {/* Points */}
              {value.points && value.points.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {value.points.map((point, i) => (
                    <li key={generateStableKey(point, i, "values-point")} className="text-base text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Goal or Closing */}
              {(value.goal || value.closing) && (
                <p className="text-base text-foreground font-medium italic border-l-4 border-primary pl-6 py-4">
                  {value.goal || value.closing}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
