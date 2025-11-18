/**
 * Subcategory Page Configuration
 *
 * Defines the section order and block mappings for subcategory pages.
 * Components are referenced by ID from the central block registry.
 *
 * Note: This config uses a function because subcategory pages need params for mappers
 */

import * as mappers from '@/lib/mappers/subcategory';

/**
 * Get subcategory page config with params
 * @param {Object} params - Route params (category, subcategory)
 * @returns {Array} Page configuration
 */
export function getSubcategoryPageConfig(params) {
  return [
    {
      id: 'hero',
      block: 'hero.category',
      dataKey: 'subcategoryData',
      mapper: (data) => mappers.mapSubcategoryHeroProps(data, params),
    },
    {
      id: 'introduction',
      block: 'subcategory.intro',
      dataKey: 'subcategoryData.introduction',
      mapper: mappers.mapSubcategoryIntroProps,
    },
    {
      id: 'featuredTreatments',
      block: 'treatment.highlight-grid',
      dataKey: 'featuredTreatments',
      condition: (data) => data.featuredTreatments && data.featuredTreatments.length > 0,
      mapper: (data) => mappers.mapFeaturedTreatmentsProps(data, params),
    },
    {
      id: 'treatmentGrid',
      block: 'subcategory.treatment-grid',
      dataKey: 'treatmentsArray',
      mapper: (data) => mappers.mapTreatmentGridProps(data, params),
    },
    {
      id: 'benefits',
      block: 'section.features',
      dataKey: 'subcategoryData.benefits',
      mapper: mappers.mapBenefitsProps,
    },
    {
      id: 'process',
      block: 'treatment.process-timeline',
      dataKey: 'subcategoryData.process',
      mapper: mappers.mapProcessProps,
    },
    {
      id: 'faq',
      block: 'section.faq',
      dataKey: 'subcategoryData.faq',
      mapper: mappers.mapFAQProps,
    },
    {
      id: 'cta',
      block: 'section.cta',
      dataKey: 'subcategoryData.cta',
      mapper: mappers.mapCTAProps,
    },
  ];
}
