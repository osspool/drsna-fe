/**
 * About Page Section Registry
 *
 * Defines section rendering order, components, and prop mappers for the about page.
 * Uses existing visual blocks for better design consistency.
 */

import { CategoryHero } from "@/components/heroes/treatments/CategoryHero";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { AwardSpotlightSection } from "@/components/landing/AwardSpotlightSection";
import { TeamSection } from "@/components/sections/about/TeamSection";
import { ClinicShowcaseSection } from "@/components/landing/ClinicShowcaseSection";
import { ExpertiseBlock } from "@/components/blocks/ExpertiseBlock";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { WhyChooseSection } from "@/components/sections/about/WhyChooseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

import * as mappers from "@/lib/mappers/about";

/**
 * About page sections in display order
 */
export const aboutSections = [
  {
    id: 'hero',
    component: CategoryHero,
    dataKey: 'hero',
    props: mappers.mapHeroProps
  },
  {
    id: 'introduction',
    component: OverviewBlock,
    dataKey: 'introduction',
    props: mappers.mapIntroductionProps
  },
  {
    id: 'mission',
    component: AwardSpotlightSection,
    dataKey: 'mission',
    props: mappers.mapMissionProps
  },
  {
    id: 'story',
    component: AwardSpotlightSection,
    dataKey: 'story',
    props: mappers.mapStoryProps
  },
  {
    id: 'team',
    component: TeamSection,
    dataKey: 'team',
    props: mappers.mapTeamProps
  },
  {
    id: 'clinicShowcase',
    component: ClinicShowcaseSection,
    dataKey: 'clinicShowcase',
    props: mappers.mapClinicShowcaseProps
  },
  {
    id: 'expertise',
    component: ExpertiseBlock,
    dataKey: 'expertise',
    props: mappers.mapExpertiseProps
  },
  {
    id: 'services',
    component: GalleryBlock,
    dataKey: 'services',
    props: mappers.mapServicesProps
  },
  {
    id: 'whyChoose',
    component: WhyChooseSection,
    dataKey: 'whyChoose',
    props: mappers.mapWhyChooseProps
  },
  {
    id: 'testimonials',
    component: TestimonialsSection,
    dataKey: 'testimonials',
    props: mappers.mapTestimonialsProps
  },
  {
    id: 'faq',
    component: FAQSection,
    dataKey: 'faq.items',
    props: mappers.mapFAQProps
  },
  {
    id: 'cta',
    component: CTASection,
    dataKey: 'cta',
    props: mappers.mapCTAProps
  }
];

/**
 * Section visibility logic
 */
export function shouldRenderSection(data, section) {
  if (section.condition) {
    return section.condition(data);
  }

  if (section.dataKey) {
    const value = section.dataKey
      .split('.')
      .reduce((obj, key) => obj?.[key], data);

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
