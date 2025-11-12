import { notFound } from "next/navigation";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { TreatmentAreasBlock } from "@/components/blocks/TreatmentAreasBlock";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { VideoBlock } from "@/components/blocks/VideoBlock";
import { VideoTestimonialBlock } from "@/components/blocks/VideoTestimonialBlock";
import { WhatToExpectBlock } from "@/components/blocks/WhatToExpectBlock";
import { HowItWorksBlock } from "@/components/blocks/HowItWorksBlock";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { BeforeAfterBlock } from "@/components/blocks/BeforeAfterBlock";
import { PricingBlock } from "@/components/blocks/PricingBlock";
import { CandidacyBlock } from "@/components/blocks/CandidacyBlock";
import { SafetyBlock } from "@/components/blocks/SafetyBlock";
import { ComparisonBlock } from "@/components/blocks/ComparisonBlock";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { TreatmentHero } from "@/components/treatments/TreatmentHero";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RelatedTreatmentsSection } from "@/components/treatments/RelatedTreatmentsSection";
import { getTreatment, getStaticTreatmentPaths } from "@/lib/treatments";

/**
 * Generate static params for high-priority treatments only
 * In Next.js 16 with Cache Components, everything is dynamic by default
 * Only pre-render the most important/popular treatments at build time
 * Other treatments will be rendered on-demand with automatic caching
 */
export async function generateStaticParams() {
  return await getStaticTreatmentPaths();
}

/**
 * Generate metadata for SEO
 * Dynamically loads only the needed treatment data
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const treatment = await getTreatment(
    resolvedParams.category,
    resolvedParams.subcategory,
    resolvedParams.slug
  );

  if (!treatment) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: treatment.seo?.metaTitle || `${treatment.title} | Dr. SNA Clinic`,
    description: treatment.seo?.metaDescription || treatment.description,
    keywords: treatment.seo?.keywords?.join(", "),
    openGraph: {
      title: treatment.seo?.metaTitle || treatment.title,
      description: treatment.seo?.metaDescription || treatment.description,
      images: [treatment.hero?.image],
    },
  };
}

/**
 * Treatment Page Component
 * Uses Next.js 16 Server Components with 'use cache' for optimal performance
 * Only loads the specific treatment needed (no bundle bloat)
 */
export default async function TreatmentPage({ params }) {
  const resolvedParams = await params;
  const treatment = await getTreatment(
    resolvedParams.category,
    resolvedParams.subcategory,
    resolvedParams.slug
  );

  if (!treatment) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <TreatmentHero treatment={treatment} params={resolvedParams} />

      {/* Quick Stats */}
      {treatment.quickStats && <StatsSection data={treatment.quickStats} variant="default" />}

      {/* Overview Section */}
      {treatment.overview && <OverviewBlock data={treatment.overview} />}

      {/* How It Works Section */}
      {treatment.howItWorks && <HowItWorksBlock data={treatment.howItWorks} />}

      {/* Why Choose Section */}
      {treatment.whyChooseDrSNA?.enabled && <FeaturesSection data={treatment.whyChooseDrSNA} variant="cards" />}

      {/* Video Section */}
      {treatment.video?.enabled && <VideoBlock data={treatment.video} />}

      {/* What to Expect Section */}
      {treatment.whatToExpect?.enabled && <WhatToExpectBlock data={treatment.whatToExpect} />}

      {/* Gallery */}
      {treatment.gallery && <GalleryBlock data={treatment.gallery} />}

      {/* Treatment Areas */}
      {treatment.treatsAreas && <TreatmentAreasBlock data={treatment.treatsAreas} />}

      {/* Benefits */}
      {treatment.benefits && <FeaturesSection data={treatment.benefits} variant="default" />}

      {/* Process/Journey */}
      {treatment.process && <ProcessTimeline data={treatment.process} variant="detailed" />}

      {/* Before & After */}
      {treatment.beforeAfter?.enabled && <BeforeAfterBlock data={treatment.beforeAfter} />}

      {/* Pricing */}
      {treatment.pricing && <PricingBlock data={treatment.pricing} />}

      {/* Comparison */}
      {treatment.comparison && <ComparisonBlock data={treatment.comparison} />}

      {/* Candidacy */}
      {treatment.candidacy && <CandidacyBlock data={treatment.candidacy} />}

      {/* Safety */}
      {treatment.safety && <SafetyBlock data={treatment.safety} />}

      {/* Video Testimonials */}
      {treatment.videoTestimonials?.enabled && <VideoTestimonialBlock data={treatment.videoTestimonials} />}

      {/* Testimonials */}
      {treatment.testimonials && treatment.testimonials.length > 0 && treatment.testimonials.length <= 3 && (
        <TestimonialsSection data={treatment.testimonials} variant="text" />
      )}

      {/* FAQ - limit display to 6 items */}
      {treatment.faq && (
        <FAQSection
          data={treatment.faq.slice(0, 6)}
          variant="treatment"
        />
      )}

      {/* Related Treatments */}
      {treatment.relatedTreatments && treatment.relatedTreatments.length > 0 && (
        <RelatedTreatmentsSection
          treatments={treatment.relatedTreatments}
          categoryId={resolvedParams.category}
          subcategoryId={resolvedParams.subcategory}
        />
      )}

      {/* CTA Section */}
      {treatment.cta && <CTASection data={treatment.cta} variant="treatment" />}
    </main>
  );
}
