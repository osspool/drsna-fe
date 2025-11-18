/**
 * Subcategory Page Configuration
 *
 * Defines the section order and block mappings for subcategory pages.
 * Uses inline mappers since subcategory pages need params for routing.
 */

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
      mapper: (data) => ({
        data: data.subcategoryData,
        variant: "subcategory",
        breadcrumb: {
          categoryId: params.category,
          categoryName: data.categoryName
        }
      })
    },
    {
      id: 'introduction',
      block: 'subcategory.intro',
      dataKey: 'subcategoryData.introduction',
      mapper: (data) => ({
        data: data.subcategoryData.introduction,
        title: data.subcategoryData.title
      })
    },
    {
      id: 'featuredTreatments',
      block: 'treatment.highlight-grid',
      dataKey: 'featuredTreatments',
      condition: (data) => data.featuredTreatments && data.featuredTreatments.length > 0,
      mapper: (data) => ({
        treatments: data.featuredTreatments,
        categoryId: params.category,
        subcategoryId: params.subcategory,
        title: "Most Popular Treatments",
        badgeText: "Popular"
      })
    },
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
    {
      id: 'benefits',
      block: 'section.features',
      dataKey: 'subcategoryData.benefits',
      mapper: (data) => ({
        data: data.subcategoryData.benefits,
        variant: "compact"
      })
    },
    {
      id: 'process',
      block: 'treatment.process-timeline',
      dataKey: 'subcategoryData.process',
      mapper: (data) => ({
        data: data.subcategoryData.process,
        variant: "vertical"
      })
    },
    {
      id: 'faq',
      block: 'section.faq',
      dataKey: 'subcategoryData.faq',
      mapper: (data) => ({
        data: data.subcategoryData.faq,
        variant: "default"
      })
    },
    {
      id: 'cta',
      block: 'section.cta',
      dataKey: 'subcategoryData.cta',
      mapper: (data) => ({
        data: data.subcategoryData.cta,
        variant: "default"
      })
    },
  ];
}
