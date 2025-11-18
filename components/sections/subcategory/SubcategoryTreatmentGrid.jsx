import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";

/**
 * Subcategory Treatment Grid Section
 *
 * Displays all treatments in a responsive grid.
 * Used across subcategory pages for consistent treatment listing.
 *
 * @param {Object[]} treatments - Array of treatment objects
 * @param {string} categoryId - Category ID for URL construction
 * @param {string} subcategoryId - Subcategory ID for URL construction
 * @param {string} title - Subcategory title for section header
 */
export function SubcategoryTreatmentGrid({ treatments, categoryId, subcategoryId, title }) {
  return (
    <Section id="all-treatments" padding="lg" background="default">
      <Container>
        <SectionHeader
          title={`All ${title} Treatments`}
          subtitle={`Explore our complete range of ${title.toLowerCase()} treatments`}
          subtitleClassName="text-muted-foreground"
          spacing="md"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
