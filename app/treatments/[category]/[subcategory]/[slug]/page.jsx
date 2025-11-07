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
// Aesthetic Medicine
// face
import antiWrinkleData from "@/data/aesthetic-medicine/face/treatments/anti-wrinkle.json";
import dermalFillersData from "@/data/aesthetic-medicine/face/treatments/dermal-fillers.json";
import prpFaceliftData from "@/data/aesthetic-medicine/face/treatments/prp-facelift.json";
import nonSurgicalBlepharoplastyData from "@/data/aesthetic-medicine/face/treatments/non-surgical-blepharoplasty.json";
import lipEnhancementData from "@/data/aesthetic-medicine/face/treatments/lip-enhancement.json";
import jawlineReductionData from "@/data/aesthetic-medicine/face/treatments/jawline-reduction.json";
import tearTroughTreatmentData from "@/data/aesthetic-medicine/face/treatments/tear-trough-treatment.json";
import nonSurgicalRhinoplastyData from "@/data/aesthetic-medicine/face/treatments/non-surgical-rhinoplasty.json";
import skinBoostersData from "@/data/aesthetic-medicine/face/treatments/skin-boosters.json";
import nefertitiNeckLiftData from "@/data/aesthetic-medicine/face/treatments/nefertiti-neck-lift.json";
import cheekAugmentationData from "@/data/aesthetic-medicine/face/treatments/cheek-augmentation.json";
import polynucleotideFaceData from "@/data/aesthetic-medicine/face/treatments/polynucleotide.json";
import doubleChinTreatmentData from "@/data/aesthetic-medicine/face/treatments/double-chin-treatment.json";
import spotInjectionData from "@/data/aesthetic-medicine/face/treatments/spot-injection.json";

// skin
import skinRangeData from "@/data/aesthetic-medicine/skin/treatments/skin-range.json";
import polynucleotideSkinData from "@/data/aesthetic-medicine/skin/treatments/polynucleotide-skin.json";

// Hair
import prpHairData from "@/data/aesthetic-medicine/hair/treatments/prp-hair.json";
import exosomeTreatmentData from "@/data/aesthetic-medicine/hair/treatments/exosome-treatment.json";
import regeneraTreatmentData from "@/data/aesthetic-medicine/hair/treatments/regenera-treatment.json";
import polynucleotideHairData from "@/data/aesthetic-medicine/hair/treatments/polynucleotide-hair.json";

// Intimate Health
import pShotData from "@/data/intimate-health/male/treatments/p-shot.json";
import shockwaveTherapyData from "@/data/intimate-health/male/treatments/shockwave-therapy.json";
import peyroniesDiseaseData from "@/data/intimate-health/male/treatments/peyronies-disease.json";
import lichenSclerosisMaleData from "@/data/intimate-health/male/treatments/lichen-sclerosis-male.json";
// female
import ultraFemme360Data from "@/data/intimate-health/female/treatments/ultra-femme-360.json";
import btlEmsellaChairData from "@/data/intimate-health/female/treatments/btl-emsella-chair.json";
import lichenSclerosisFemaleData from "@/data/intimate-health/female/treatments/lichen-sclerosis-female.json";

// Pain Management
import kneeTreatmentData from "@/data/pain-management/conditions/treatments/knee-treatment.json";
import hipTreatmentData from "@/data/pain-management/conditions/treatments/hip-treatment.json";
import footAnkleTreatmentData from "@/data/pain-management/conditions/treatments/foot-ankle-treatment.json";
import elbowTreatmentData from "@/data/pain-management/conditions/treatments/elbow-treatment.json";
import footAncleTreatmentData from "@/data/pain-management/conditions/treatments/foot-ankle-treatment.json";
import handWristTreatmentData from "@/data/pain-management/conditions/treatments/hand-wrist-treatment.json";
import shoulderTreatmentData from "@/data/pain-management/conditions/treatments/shoulder-treatment.json";
// treatments
import adiposeCellTherapyData from "@/data/pain-management/treatments/treatments/adipose-cell-therapy.json";
import plateletRichPlasmaData from "@/data/pain-management/treatments/treatments/platelet-rich-plasma.json";
import bmacTherapyData from "@/data/pain-management/treatments/treatments/bmac-therapy.json";
import physiotherapyData from "@/data/pain-management/treatments/treatments/physiotherapy.json";
import arthrosamidInjectionData from "@/data/pain-management/treatments/treatments/arthrosamid-injection.json";


const treatmentDataMap = {
  "aesthetic-medicine": {
    face: {
      "anti-wrinkle": antiWrinkleData,
      "dermal-fillers": dermalFillersData,
      "prp-facelift": prpFaceliftData,
      "non-surgical-blepharoplasty": nonSurgicalBlepharoplastyData,
      "lip-enhancement": lipEnhancementData,
      "jawline-reduction": jawlineReductionData,
      "tear-trough-treatment": tearTroughTreatmentData,
      "non-surgical-rhinoplasty": nonSurgicalRhinoplastyData,
      "skin-boosters": skinBoostersData,
      "nefertiti-neck-lift": nefertitiNeckLiftData,
      "cheek-augmentation": cheekAugmentationData,
      "polynucleotide": polynucleotideFaceData,
      "double-chin-treatment": doubleChinTreatmentData,
      "spot-injection": spotInjectionData,
    },
    skin: {
      "skin-range": skinRangeData,
      "polynucleotide-skin": polynucleotideSkinData,
    },
    hair: {
      "prp-hair": prpHairData,
      "exosome-treatment": exosomeTreatmentData,
      "regenera-treatment": regeneraTreatmentData,
      "polynucleotide-hair": polynucleotideHairData,
    },
  },
  "intimate-health": {
    "male": {
      "p-shot": pShotData,
      "shockwave-therapy": shockwaveTherapyData,
      "peyronies-disease": peyroniesDiseaseData,
      "lichen-sclerosis-male": lichenSclerosisMaleData,
    },
    "female": {
      "ultra-femme-360": ultraFemme360Data,
      "btl-emsella-chair": btlEmsellaChairData,
      "lichen-sclerosis-female": lichenSclerosisFemaleData,
    },
  },
  "pain-management": {
    "conditions": {
      "knee-treatment": kneeTreatmentData,
      "hip-treatment": hipTreatmentData,
      "foot-ankle-treatment": footAnkleTreatmentData,
      "elbow-treatment": elbowTreatmentData,
      "foot-ancle-treatment": footAncleTreatmentData,
      "hand-wrist-treatment": handWristTreatmentData,
      "shoulder-treatment": shoulderTreatmentData,
    },
    "treatments": {
      "adipose-cell-therapy": adiposeCellTherapyData,
      "platelet-rich-plasma": plateletRichPlasmaData,
      "bmac-therapy": bmacTherapyData,
      "physiotherapy": physiotherapyData,
      "arthrosamid-injection": arthrosamidInjectionData,
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
