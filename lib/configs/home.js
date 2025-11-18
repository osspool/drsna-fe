/**
 * Home Page Configuration
 *
 * Defines the section order and block mappings for the home page.
 * Uses direct data passing without mappers where possible.
 */

export const homePageConfig = [
  {
    id: 'hero',
    block: 'hero.landing',
    dataKey: 'hero'
  },
  {
    id: 'awardSpotlight',
    block: 'landing.award-spotlight',
    dataKey: 'awardSpotlight'
  },
  {
    id: 'treatmentBento',
    block: 'landing.treatment-bento',
    dataKey: 'treatmentBento'
  },
  {
    id: 'featuredTreatments',
    block: 'landing.featured-treatments',
    dataKey: 'featuredTreatments'
  },
  {
    id: 'clinicShowcase',
    block: 'landing.clinic-showcase',
    dataKey: 'clinicShowcase'
  },
  {
    id: 'pshotFeatured',
    block: 'landing.pshot-featured',
    dataKey: 'pshotFeatured'
  },
  {
    id: 'globalReach',
    block: 'landing.global-reach',
    dataKey: 'globalReach'
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials'
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq'
  },
  {
    id: 'regulatory',
    block: 'landing.regulatory-logos',
    dataKey: 'regulatory'
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta'
  },
];
