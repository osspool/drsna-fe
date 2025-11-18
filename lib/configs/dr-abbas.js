/**
 * Dr Abbas Profile Page Configuration
 *
 * Defines the section order and block mappings for Dr Abbas profile page.
 * Components are referenced by ID from the central block registry.
 */

import * as mappers from '@/lib/mappers/profile';

export const drAbbasPageConfig = [
  {
    id: 'hero',
    block: 'hero.landing-v1',
    dataKey: 'hero',
    mapper: mappers.mapProfileHeroProps,
  },
  {
    id: 'quickStats',
    block: 'section.stats',
    dataKey: 'quickStats',
    mapper: mappers.mapProfileStatsProps,
  },
  {
    id: 'overview',
    block: 'block.overview',
    dataKey: 'overview',
    mapper: mappers.mapProfileOverviewProps,
  },
  {
    id: 'whyChooseDrSNA',
    block: 'section.features',
    dataKey: 'whyChooseDrSNA',
    mapper: mappers.mapProfileWhyChooseProps,
  },
  {
    id: 'gallery',
    block: 'block.gallery',
    dataKey: 'gallery',
    mapper: mappers.mapProfileGalleryProps,
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
    mapper: mappers.mapProfileTestimonialsProps,
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq',
    condition: (data) => (
      data.faq &&
      Array.isArray(data.faq) &&
      data.faq.length > 0
    ),
    mapper: mappers.mapProfileFaqProps,
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta',
    mapper: mappers.mapProfileCtaProps,
  },
];
