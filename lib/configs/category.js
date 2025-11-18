/**
 * Category Page Configuration
 *
 * Defines the section structure for category pages using the block registry.
 * Works with dynamic category data loaded at runtime.
 */

/**
 * Get category page sections configuration
 *
 * @param {Object} categoryData - Raw category data from JSON
 * @param {string} categoryId - Category slug
 * @returns {Array} Array of section configurations
 */
export function getCategorySections(categoryData, categoryId) {
  return [
    // Hero Section
    {
      id: 'hero',
      block: 'hero.category',
      dataKey: 'hero',
      mapper: () => ({
        data: categoryData,
        showStats: true
      })
    },

    // Featured Section
    {
      id: 'featured',
      block: 'treatment.two-column-features',
      dataKey: 'featured',
      mapper: () => ({ data: categoryData.featured })
    },

    // Introduction Section
    {
      id: 'introduction',
      block: 'category.introduction',
      dataKey: 'introduction',
      mapper: () => ({ data: categoryData.introduction })
    },

    // Subcategories Grid
    {
      id: 'subcategories',
      block: 'subcategory.grid',
      dataKey: 'subcategories',
      mapper: () => ({
        subcategories: categoryData.subcategories,
        categoryId: categoryId
      })
    },

    // Benefits Section
    {
      id: 'benefits',
      block: 'section.features',
      dataKey: 'benefits',
      mapper: () => ({
        data: { ...categoryData.benefits, variant: 'compact' }
      })
    },

    // Process Timeline
    {
      id: 'process',
      block: 'treatment.process-timeline',
      dataKey: 'process',
      mapper: () => ({
        data: categoryData.process,
        variant: 'default'
      })
    },

    // Testimonials
    {
      id: 'testimonials',
      block: 'category.testimonials',
      dataKey: 'testimonials',
      condition: () => categoryData.testimonials && categoryData.testimonials.length > 0,
      mapper: () => ({ data: categoryData.testimonials })
    },

    // FAQ Section
    {
      id: 'faq',
      block: 'section.faq',
      dataKey: 'faq',
      mapper: () => ({
        data: categoryData.faq,
        variant: 'default'
      })
    },

    // CTA Section
    {
      id: 'cta',
      block: 'section.cta',
      dataKey: 'cta',
      mapper: () => ({
        data: categoryData.cta,
        variant: 'default'
      })
    }
  ];
}

/**
 * Get category metadata for SEO
 *
 * @param {Object} categoryData - Category data
 * @returns {Object} Metadata object
 */
export function getCategoryMetadata(categoryData) {
  if (!categoryData) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: categoryData.seo?.metaTitle || `${categoryData.title} | Dr. SNA Clinic`,
    description: categoryData.seo?.metaDescription || categoryData.description,
    keywords: categoryData.seo?.keywords?.join(", "),
    openGraph: {
      title: categoryData.seo?.metaTitle || categoryData.title,
      description: categoryData.seo?.metaDescription || categoryData.description,
      images: [categoryData.hero?.image],
    },
  };
}
