/**
 * Subcategory Page Configuration
 *
 * Defines the section order and block mappings for subcategory pages.
 * Uses inline mappers only when params or data transformation needed.
 */

import { hasItems } from '@/lib/conditions';

/**
 * Get subcategory page config with params
 * @param {Object} params - Route params (category, subcategory)
 * @returns {Array} Page configuration
 */
export function getSubcategoryPageConfig(params) {
  return [
    // Hero - needs breadcrumb with params
    {
      id: 'hero',
      block: 'hero.category',
      dataKey: 'subcategoryData',
      mapper: (data) => ({
        data: data.subcategoryData,
        variant: "subcategory",
        breadcrumb: {
          categoryId: params.category,
          categoryName: data.categoryName
        }
      })
    },

    // Introduction - needs title from parent
    {
      id: 'introduction',
      block: 'subcategory.intro',
      dataKey: 'subcategoryData.introduction',
      mapper: (data) => ({
        data: data.subcategoryData.introduction,
        title: data.subcategoryData.title
      })
    },

    // Featured Treatments - needs params for routing
    {
      id: 'featuredTreatments',
      block: 'treatment.highlight-grid',
      dataKey: 'featuredTreatments',
      condition: (data) => hasItems(data.featuredTreatments),
      mapper: (data) => ({
        treatments: data.featuredTreatments,
        categoryId: params.category,
        subcategoryId: params.subcategory,
        title: "Most Popular Treatments",
        badgeText: "Popular"
      })
    },

    // Treatment Grid - needs params for routing
    {
      id: 'treatmentGrid',
      block: 'subcategory.treatment-grid',
      dataKey: 'treatmentsArray',
      mapper: (data) => ({
        treatments: data.treatmentsArray,
        categoryId: params.category,
        subcategoryId: params.subcategory,
        title: data.subcategoryData.title
      })
    },

    // Benefits Section
    {
      id: 'benefits',
      block: 'section.features',
      dataKey: 'subcategoryData.benefits',
      props: { variant: "compact" }
    },

    // Process Timeline
    {
      id: 'process',
      block: 'treatment.process-timeline',
      dataKey: 'subcategoryData.process',
      props: { variant: "vertical" }
    },

    // FAQ Section
    {
      id: 'faq',
      block: 'section.faq',
      dataKey: 'subcategoryData.faq',
      props: { variant: "default" }
    },

    // CTA Section
    {
      id: 'cta',
      block: 'section.cta',
      dataKey: 'subcategoryData.cta',
      props: { variant: "default" }
    },
  ];
}
