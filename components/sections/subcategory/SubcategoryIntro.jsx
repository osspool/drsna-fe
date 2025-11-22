import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { generateStableKey } from "@/lib/utils";

/**
 * Subcategory Introduction Section
 *
 * Displays introduction content with highlights and optional image.
 * Used across subcategory pages for consistent presentation.
 *
 * @param {Object} data - Introduction data object
 * @param {string} data.title - Section title
 * @param {string} data.content - Introduction content/subtitle
 * @param {string[]} data.highlights - Array of highlight items (optional)
 * @param {string} data.image - Image URL (optional)
 * @param {string} title - Subcategory title for image alt text
 */
export function SubcategoryIntro({ data, title }) {
  return (
    <Section padding="xl" background="default">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              badge="Our Approach"
              badgeIcon="sparkles"
              title={data.title}
              subtitle={data.content}
              subtitleClassName="text-lg leading-relaxed mb-6"
              align="left"
              spacing="sm"
              animate={false}
            />
            {data.highlights && (
              <div className="space-y-3">
                {data.highlights.map((highlight, index) => (
                  <div key={generateStableKey(highlight, index, "subcategory-highlight")} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {data.image && (
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <img src={data.image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
