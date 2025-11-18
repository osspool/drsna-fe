/**
 * Treatment Page Sections Configuration
 *
 * Config-driven rendering for treatment pages.
 * Each section defines:
 * - component: The component to render
 * - dataKey: The key in treatment data to check (supports nested keys with dot notation)
 * - props: Function (prop mapper) that transforms treatment data into component props
 * - condition: Optional custom condition function for more complex checks
 */

import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { TreatmentAreasBlock } from "@/components/blocks/TreatmentAreasBlock";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { VideoBlock } from "@/components/blocks/VideoBlock";
import { HowItWorksBlock } from "@/components/blocks/HowItWorksBlock";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { BeforeAfterBlock } from "@/components/blocks/BeforeAfterBlock";
import { PricingBlock } from "@/components/blocks/PricingBlock";
import { CandidacyBlock } from "@/components/blocks/CandidacyBlock";
import { SafetyBlock } from "@/components/blocks/SafetyBlock";
import { ComparisonBlock } from "@/components/blocks/ComparisonBlock";
import { FAQSection } from "@/components/sections/FAQSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import * as mappers from "@/lib/mappers/treatment";

/**
 * Treatment page sections in display order
 * Each section will be rendered conditionally based on data availability
 */
export const treatmentSections = [
  {
    id: 'quickStats',
    component: StatsSection,
    dataKey: 'quickStats',
    props: mappers.mapStatsProps
  },
  {
    id: 'overview',
    component: OverviewBlock,
    dataKey: 'overview',
    props: mappers.mapOverviewProps
  },
  {
    id: 'howItWorks',
    component: HowItWorksBlock,
    dataKey: 'howItWorks',
    props: mappers.mapHowItWorksProps
  },
  {
    id: 'whyChooseDrSNA',
    component: FeaturesSection,
    dataKey: 'whyChooseDrSNA.enabled',
    props: mappers.mapWhyChooseProps
  },
  {
    id: 'video',
    component: VideoBlock,
    dataKey: 'video.enabled',
    props: mappers.mapVideoProps
  },
  {
    id: 'whatToExpect',
    component: ProcessTimeline,
    dataKey: 'whatToExpect.enabled',
    props: mappers.mapWhatToExpectProps
  },
  {
    id: 'gallery',
    component: GalleryBlock,
    dataKey: 'gallery',
    props: mappers.mapGalleryProps
  },
  {
    id: 'treatmentAreas',
    component: TreatmentAreasBlock,
    dataKey: 'treatsAreas',
    props: mappers.mapTreatmentAreasProps
  },
  {
    id: 'benefits',
    component: FeaturesSection,
    dataKey: 'benefits',
    props: mappers.mapBenefitsProps
  },
  {
    id: 'process',
    component: ProcessTimeline,
    dataKey: 'process',
    props: mappers.mapProcessProps
  },
  {
    id: 'beforeAfter',
    component: BeforeAfterBlock,
    dataKey: 'beforeAfter.enabled',
    props: mappers.mapBeforeAfterProps
  },
  {
    id: 'pricing',
    component: PricingBlock,
    dataKey: 'pricing',
    props: mappers.mapPricingProps
  },
  {
    id: 'comparison',
    component: ComparisonBlock,
    dataKey: 'comparison',
    props: mappers.mapComparisonProps
  },
  {
    id: 'candidacy',
    component: CandidacyBlock,
    dataKey: 'candidacy',
    props: mappers.mapCandidacyProps
  },
  {
    id: 'safety',
    component: SafetyBlock,
    dataKey: 'safety',
    props: mappers.mapSafetyProps
  },
  {
    id: 'videoTestimonials',
    component: TestimonialsSection,
    dataKey: 'videoTestimonials.enabled',
    props: mappers.mapVideoTestimonialsProps
  },
  {
    id: 'testimonials',
    component: TestimonialsSection,
    dataKey: 'testimonials',
    condition: (treatment) => (
      treatment.testimonials &&
      Array.isArray(treatment.testimonials) &&
      treatment.testimonials.length > 0 &&
      treatment.testimonials.length <= 3
    ),
    props: mappers.mapTestimonialsProps
  },
  {
    id: 'faq',
    component: FAQSection,
    dataKey: 'faq',
    condition: (treatment) => treatment.faq && treatment.faq.length > 0,
    props: mappers.mapFaqProps
  }
];

/**
 * Helper function to check if a section should render
 * Supports nested keys like 'video.enabled'
 * Treats empty arrays and objects as falsy
 */
export function shouldRenderSection(treatment, section) {
  // Use custom condition if provided
  if (section.condition) {
    return section.condition(treatment);
  }

  // Check dataKey (supports nested keys)
  if (section.dataKey) {
    const value = section.dataKey
      .split('.')
      .reduce((obj, key) => obj?.[key], treatment);

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
