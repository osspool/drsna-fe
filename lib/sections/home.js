/**
 * Home Page Sections Configuration
 *
 * Config-driven rendering for home page.
 * Each section defines component, data key, and props transformer.
 * Centralizes section ordering and makes it easy to add/remove/reorder sections.
 */

import { HeroSectionV2 } from "@/components/heroes/landing/HeroSectionV2";
import { RegulatoryLogos } from "@/components/landing/RegulatoryLogos";
import { PShotFeaturedSection } from "@/components/landing/PShotFeaturedSection";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { FeaturedTreatments } from "@/components/landing/FeaturedTreatments";
import { AwardSpotlightSection } from "@/components/landing/AwardSpotlightSection";
import { TreatmentBentoSection } from "@/components/landing/TreatmentBentoSection";
import { ClinicShowcaseSection } from "@/components/landing/ClinicShowcaseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import * as mappers from "@/lib/mappers/home";

/**
 * Home page sections in display order
 * Each section will be rendered conditionally based on data availability
 */
export const homeSections = [
  {
    id: 'hero',
    component: HeroSectionV2,
    dataKey: 'hero',
    props: mappers.mapHomeHeroProps
  },
  {
    id: 'awardSpotlight',
    component: AwardSpotlightSection,
    dataKey: 'awardSpotlight',
    props: mappers.mapHomeAwardSpotlightProps
  },
  {
    id: 'treatmentBento',
    component: TreatmentBentoSection,
    dataKey: 'treatmentBento',
    props: mappers.mapHomeTreatmentBentoProps
  },
  {
    id: 'featuredTreatments',
    component: FeaturedTreatments,
    dataKey: 'featuredTreatments',
    props: mappers.mapHomeFeaturedTreatmentsProps
  },
  {
    id: 'clinicShowcase',
    component: ClinicShowcaseSection,
    dataKey: 'clinicShowcase',
    props: mappers.mapHomeClinicShowcaseProps
  },
  {
    id: 'pshotFeatured',
    component: PShotFeaturedSection,
    dataKey: 'pshotFeatured',
    props: mappers.mapHomePShotFeaturedProps
  },
  {
    id: 'globalReach',
    component: GlobalReachSection,
    dataKey: 'globalReach',
    props: mappers.mapHomeGlobalReachProps
  },
  {
    id: 'testimonials',
    component: TestimonialsSection,
    dataKey: 'testimonials',
    props: mappers.mapHomeTestimonialsProps
  },
  {
    id: 'faq',
    component: FAQSection,
    dataKey: 'faq.items',
    condition: (homeData) => (
      homeData?.faq?.items &&
      Array.isArray(homeData.faq.items) &&
      homeData.faq.items.length > 0
    ),
    props: mappers.mapHomeFaqProps
  },
  {
    id: 'regulatory',
    component: RegulatoryLogos,
    dataKey: 'regulatory',
    props: mappers.mapHomeRegulatoryProps
  },
  {
    id: 'cta',
    component: CTASection,
    dataKey: 'cta',
    props: mappers.mapHomeCtaProps
  }
];

/**
 * Helper function to check if a section should render
 * Supports nested keys like 'testimonials.items'
 * Treats empty arrays and objects as falsy
 */
export function shouldRenderHomeSection(homeData, section) {
  // Use custom condition if provided
  if (section.condition) {
    return section.condition(homeData);
  }

  // Check dataKey (supports nested keys)
  if (section.dataKey) {
    const value = section.dataKey
      .split('.')
      .reduce((obj, key) => obj?.[key], homeData);

    // Treat empty arrays and objects as falsy
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (value && typeof value === 'object') {
      return Object.keys(value).length > 0;
    }

    return Boolean(value);
  }

  return true;
}
