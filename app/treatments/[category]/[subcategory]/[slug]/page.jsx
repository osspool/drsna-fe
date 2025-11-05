import { notFound } from "next/navigation";
import { QuickStatsBlock } from "@/components/blocks/QuickStatsBlock";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { TreatmentAreasBlock } from "@/components/blocks/TreatmentAreasBlock";
import { BenefitsBlock } from "@/components/blocks/BenefitsBlock";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { VideoBlock } from "@/components/blocks/VideoBlock";
import { VideoTestimonialBlock } from "@/components/blocks/VideoTestimonialBlock";
import { WhatToExpectBlock } from "@/components/blocks/WhatToExpectBlock";
import { WhyChooseBlock } from "@/components/blocks/WhyChooseBlock";
import { HowItWorksBlock } from "@/components/blocks/HowItWorksBlock";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { BeforeAfterBlock } from "@/components/blocks/BeforeAfterBlock";
import { PricingBlock } from "@/components/blocks/PricingBlock";
import { CandidacyBlock } from "@/components/blocks/CandidacyBlock";
import { SafetyBlock } from "@/components/blocks/SafetyBlock";
import { ComparisonBlock } from "@/components/blocks/ComparisonBlock";
import { FAQSection } from "@/components/treatments/FAQSection";
import { CTASection } from "@/components/treatments/CTASection";
import { TreatmentHero } from "@/components/treatments/TreatmentHero";
import { TreatmentTestimonialsSection } from "@/components/treatments/TreatmentTestimonialsSection";
import { RelatedTreatmentsSection } from "@/components/treatments/RelatedTreatmentsSection";

// Import treatment data
import antiWrinkleData from "@/data/aesthetic-medicine/face/treatments/anti-wrinkle.json";
import dermalFillersData from "@/data/aesthetic-medicine/face/treatments/dermal-fillers.json";
import prpFaceliftData from "@/data/aesthetic-medicine/face/treatments/prp-facelift.json";
import nonSurgicalBlepharoplastyData from "@/data/aesthetic-medicine/face/treatments/non-surgical-blepharoplasty.json";

// Intimate Health
import pShotData from "@/data/intimate-health/male/treatments/p-shot.json";

const treatmentDataMap = {
  "aesthetic-medicine": {
    face: {
      "anti-wrinkle": antiWrinkleData,
      "dermal-fillers": dermalFillersData,
      "prp-facelift": prpFaceliftData,
      "non-surgical-blepharoplasty": nonSurgicalBlepharoplastyData,
    },
  },
  "intimate-health": {
    "male": {
      "p-shot": pShotData,
      // "shockwave-therapy": shockwaveTherapyData,
      // "peyronies-disease": peyroniesDiseaseData,
      // "lichen-sclerosis-male": lichenSclerosisMaleData,
    },
  },
};

export async function generateStaticParams() {
  return [
    { category: "aesthetic-medicine", subcategory: "face", slug: "anti-wrinkle" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "dermal-fillers" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "prp-facelift" },
    { category: "aesthetic-medicine", subcategory: "face", slug: "non-surgical-blepharoplasty" },
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const treatment = treatmentDataMap[resolvedParams.category]?.[resolvedParams.subcategory]?.[resolvedParams.slug];

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

export default async function TreatmentPage({ params }) {
  const resolvedParams = await params;
  const treatment = treatmentDataMap[resolvedParams.category]?.[resolvedParams.subcategory]?.[resolvedParams.slug];

  if (!treatment) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <TreatmentHero treatment={treatment} params={resolvedParams} />

      {/* Quick Stats */}
      {treatment.quickStats && <QuickStatsBlock data={treatment.quickStats} />}

      {/* Overview Section - White background */}
      {treatment.overview && <OverviewBlock data={treatment.overview} />}

      {/* How It Works Section - White background */}
      {treatment.howItWorks && <HowItWorksBlock data={treatment.howItWorks} />}

      {/* Why Choose Section - Gradient Cream background */}
      {treatment.whyChooseDrSNA?.enabled && <WhyChooseBlock data={treatment.whyChooseDrSNA} />}

      {/* Video Section - Gradient Cream background */}
      {treatment.video?.enabled && <VideoBlock data={treatment.video} />}

      {/* What to Expect Section - Gradient Cream background */}
      {treatment.whatToExpect?.enabled && <WhatToExpectBlock data={treatment.whatToExpect} />}

      {/* Gallery */}
      {treatment.gallery && <GalleryBlock data={treatment.gallery} />}

      {/* Treatment Areas */}
      {treatment.treatsAreas && <TreatmentAreasBlock data={treatment.treatsAreas} />}

      {/* Benefits */}
      {treatment.benefits && <BenefitsBlock data={{
        heading: treatment.benefits.title,
        layout: treatment.benefits.layout || "grid-3",
        items: treatment.benefits.items
      }} />}

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

      {/* Video Testimonials - White background */}
      {treatment.videoTestimonials?.enabled && <VideoTestimonialBlock data={treatment.videoTestimonials} />}

      {/* Testimonials */}
      {treatment.testimonials && treatment.testimonials.length > 0 && treatment.testimonials.length <= 3 && (
        <TreatmentTestimonialsSection testimonials={treatment.testimonials} />
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
