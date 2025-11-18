/**
 * Dr Abbas Profile Page Configuration
 *
 * Defines the section order and block mappings for Dr Abbas profile page.
 * Uses direct data passing without mappers.
 */

export const drAbbasPageConfig = [
  {
    id: 'hero',
    block: 'hero.landing-v1',
    dataKey: 'hero'
  },
  {
    id: 'quickStats',
    block: 'section.stats',
    dataKey: 'quickStats',
    props: { variant: 'cards' }
  },
  {
    id: 'overview',
    block: 'block.overview',
    dataKey: 'overview'
  },
  {
    id: 'whyChooseDrSNA',
    block: 'section.features',
    dataKey: 'whyChooseDrSNA',
    props: { variant: 'cards' }
  },
  {
    id: 'gallery',
    block: 'block.gallery',
    dataKey: 'gallery'
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials',
    condition: (data) => (
      data.testimonials &&
      Array.isArray(data.testimonials) &&
      data.testimonials.length > 0
    ),
    props: { variant: 'text' }
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq',
    condition: (data) => (
      data.faq &&
      Array.isArray(data.faq) &&
      data.faq.length > 0
    )
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta'
  },
];
