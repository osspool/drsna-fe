/**
 * P-Shot Landing Page Configuration
 *
 * Defines the section order and block mappings for the P-Shot landing page.
 * Components are referenced by ID from the central block registry.
 */

import * as mappers from '@/lib/mappers/profile';

export const pshotPageConfig = [
  {
    id: 'hero',
    block: 'hero.pshot',
    dataKey: 'hero',
    mapper: mappers.mapPShotHeroProps,
  },
  {
    id: 'stats',
    block: 'section.stats',
    dataKey: 'stats',
    mapper: mappers.mapPShotStatsProps,
  },
  {
    id: 'doctorCredentials',
    block: 'specialty.doctor-credentials',
    dataKey: 'doctorCredentials',
    mapper: mappers.mapPShotCredentialsProps,
  },
  {
    id: 'benefits',
    block: 'section.features',
    dataKey: 'benefits',
    mapper: mappers.mapPShotBenefitsProps,
  },
  {
    id: 'process',
    block: 'treatment.process-timeline',
    dataKey: 'process',
    mapper: mappers.mapPShotProcessProps,
  },
  {
    id: 'videoTestimonials',
    block: 'section.testimonials',
    dataKey: 'videoTestimonials',
    condition: (data) => (
      data.videoTestimonials &&
      Array.isArray(data.videoTestimonials) &&
      data.videoTestimonials.length > 0
    ),
    mapper: mappers.mapPShotVideoTestimonialsProps,
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
    mapper: mappers.mapPShotTestimonialsProps,
  },
  {
    id: 'whyChoose',
    block: 'section.features',
    dataKey: 'whyChoose',
    mapper: mappers.mapPShotWhyChooseProps,
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
    mapper: mappers.mapPShotFaqProps,
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta',
    mapper: mappers.mapPShotCtaProps,
  },
];
