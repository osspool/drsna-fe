import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { FAQSection } from "@/components/sections/FAQSection";
import {
  getResourceGuide,
  getResourceGuidesList,
} from "@/lib/resources";
import {
  createMetadataGenerator,
  createStaticParamsGenerator,
  generateResourceStructuredData,
} from "@/lib/seo-helpers";
import { getBaseUrl } from "@/lib/domain-helpers";
import { MarkdownContent } from "./components/MarkdownContent";
import { GuideSection } from "./components/GuideSection";
import { TreatmentRecommendations } from "./components/TreatmentRecommendations";
import { ResourceHero } from "./components/ResourceHero";
import { generateStableKey } from "@/lib/utils";

/**
 * Generate static params using SEO helper
 */
export const generateStaticParams = createStaticParamsGenerator(getResourceGuidesList);

/**
 * Generate metadata using SEO helper for consistency
 */
export const generateMetadata = createMetadataGenerator(
  getResourceGuide,
  "heroImage",
  "Resource Not Found",
  (params) => [params.slug]
);

export default async function ResourceGuidePage({ params }) {
  const resolvedParams = await params;
  const guide = await getResourceGuide(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  const baseUrl = await getBaseUrl();
  // Generate structured data for SEO
  const structuredData = generateResourceStructuredData(
    guide,
    resolvedParams.slug,
    baseUrl
  );

  return (
    <>
      {/* Structured Data for SEO - enables Article rich snippets */}
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <main className="bg-background text-foreground">
        <ResourceHero guide={guide} baseUrl={baseUrl} />

        <Container className="py-16 md:py-20 space-y-8">
          {/* Emotional Intro Section */}
          {guide.intro && (
            <section className="max-w-4xl mx-auto">
              <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-card/50 p-8 md:p-12 shadow-sm">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  {guide.intro.title}
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  {guide.intro.paragraphs.map((paragraph, index) => (
                    <p key={generateStableKey(paragraph, index, "resource-intro-paragraph")}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          )}

          {guide.content && (
            <section className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
              <MarkdownContent content={guide.content} />
            </section>
          )}

          {guide.sections?.map((section) => (
            <GuideSection key={section.title} section={section} />
          ))}

          <TreatmentRecommendations treatments={guide.recommendedTreatments} />

          {guide.faqs?.length ? (
            <FAQSection
              data={{
                title: "Frequently Asked Questions",
                subtitle: "Answers straight from our clinical consults",
                questions: guide.faqs,
              }}
              variant="with-icons"
            />
          ) : null}
        </Container>
      </main>
    </>
  );
}
