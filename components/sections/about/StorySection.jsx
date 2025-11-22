import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Shield } from "lucide-react";
import { generateStableKey } from "@/lib/utils";

/**
 * Story Section
 *
 * Displays clinic's story, values, and regulation information.
 */
export function StorySection({ data }) {
  if (!data) return null;

  return (
    <Section background="default" padding="xl">
      <Container maxWidth="4xl">
        <SectionHeader
          badge={data.title}
          title={data.subtitle}
          titleClassName="text-3xl md:text-4xl font-heading font-bold"
        />

        {/* Main Content */}
        {data.content && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            {data.content}
          </p>
        )}

        {/* Values */}
        {data.values && data.values.length > 0 && (
          <div className="bg-secondary/50 rounded-2xl p-8 mb-8">
            <ul className="space-y-4">
              {data.values.map((value, index) => (
                <li key={generateStableKey(value, index, "story-value")} className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-base text-foreground leading-relaxed">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Regulation */}
        {data.regulation && (
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-6">
            <p className="text-base text-foreground leading-relaxed">
              {data.regulation}
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
