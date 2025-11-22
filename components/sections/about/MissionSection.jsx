import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { generateStableKey } from "@/lib/utils";

/**
 * Mission Section
 *
 * Displays mission statement with focus areas and beliefs.
 */
export function MissionSection({ data }) {
  if (!data) return null;

  return (
    <Section background="muted" padding="xl">
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

        {/* Focus and Beliefs Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Focus */}
          {data.focus && (
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                {data.focus.title}
              </h3>
              <ul className="space-y-3">
                {data.focus.points.map((point, index) => (
                  <li key={generateStableKey(point, index, "mission-focus-point")} className="text-base text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Beliefs */}
          {data.beliefs && (
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                {data.beliefs.title}
              </h3>
              <ul className="space-y-3">
                {data.beliefs.points.map((point, index) => (
                  <li key={generateStableKey(point, index, "mission-belief-point")} className="text-base text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Closing */}
        {data.closing && (
          <p className="text-center text-lg text-foreground font-medium italic mt-8">
            {data.closing}
          </p>
        )}
      </Container>
    </Section>
  );
}
