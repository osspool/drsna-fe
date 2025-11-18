/**
 * Home Page Configuration
 *
 * Defines the section order and block mappings for the home page.
 * Components are referenced by ID from the central block registry.
 */

import * as mappers from '@/lib/mappers/home';

export const homePageConfig = [
  {
    id: 'hero',
    block: 'hero.landing',
    dataKey: 'hero',
    mapper: mappers.mapHomeHeroProps,
  },
  {
    id: 'awardSpotlight',
    block: 'landing.award-spotlight',
    dataKey: 'awardSpotlight',
    mapper: mappers.mapHomeAwardSpotlightProps,
  },
  {
    id: 'treatmentBento',
    block: 'landing.treatment-bento',
    dataKey: 'treatmentBento',
    mapper: mappers.mapHomeTreatmentBentoProps,
  },
  {
    id: 'featuredTreatments',
    block: 'landing.featured-treatments',
    dataKey: 'featuredTreatments',
    mapper: mappers.mapHomeFeaturedTreatmentsProps,
  },
  {
    id: 'clinicShowcase',
    block: 'landing.clinic-showcase',
    dataKey: 'clinicShowcase',
    mapper: mappers.mapHomeClinicShowcaseProps,
  },
  {
    id: 'pshotFeatured',
    block: 'landing.pshot-featured',
    dataKey: 'pshotFeatured',
    mapper: mappers.mapHomePShotFeaturedProps,
  },
  {
    id: 'globalReach',
    block: 'landing.global-reach',
    dataKey: 'globalReach',
    mapper: mappers.mapHomeGlobalReachProps,
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials',
    mapper: mappers.mapHomeTestimonialsProps,
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq.items',
    condition: (homeData) => (
      homeData?.faq?.items &&
      Array.isArray(homeData.faq.items) &&
      homeData.faq.items.length > 0
    ),
    mapper: mappers.mapHomeFaqProps,
  },
  {
    id: 'regulatory',
    block: 'landing.regulatory-logos',
    dataKey: 'regulatory',
    mapper: mappers.mapHomeRegulatoryProps,
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta',
    mapper: mappers.mapHomeCtaProps,
  },
];
