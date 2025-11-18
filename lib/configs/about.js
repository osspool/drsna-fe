/**
 * About Page Configuration
 *
 * Defines the section order and block mappings for the About Us page.
 * Components are referenced by ID from the central block registry.
 */

import * as mappers from '@/lib/mappers/about';

export const aboutPageConfig = [
  {
    id: 'hero',
    block: 'hero.category',
    dataKey: 'hero',
    mapper: mappers.mapHeroProps,
  },
  {
    id: 'introduction',
    block: 'block.overview',
    dataKey: 'introduction',
    mapper: mappers.mapIntroductionProps,
  },
  {
    id: 'mission',
    block: 'landing.award-spotlight',
    dataKey: 'mission',
    mapper: mappers.mapMissionProps,
  },
  {
    id: 'story',
    block: 'landing.award-spotlight',
    dataKey: 'story',
    mapper: mappers.mapStoryProps,
  },
  {
    id: 'team',
    block: 'section.team',
    dataKey: 'team',
    mapper: mappers.mapTeamProps,
  },
  {
    id: 'clinicShowcase',
    block: 'landing.clinic-showcase',
    dataKey: 'clinicShowcase',
    mapper: mappers.mapClinicShowcaseProps,
  },
  {
    id: 'expertise',
    block: 'block.expertise',
    dataKey: 'expertise',
    mapper: mappers.mapExpertiseProps,
  },
  {
    id: 'services',
    block: 'block.gallery',
    dataKey: 'services',
    mapper: mappers.mapServicesProps,
  },
  {
    id: 'whyChoose',
    block: 'section.why-choose',
    dataKey: 'whyChoose',
    mapper: mappers.mapWhyChooseProps,
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials',
    mapper: mappers.mapTestimonialsProps,
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq.items',
    mapper: mappers.mapFAQProps,
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta',
    mapper: mappers.mapCTAProps,
  },
];
