/**
 * Category Page Configuration
 *
 * Defines the section structure for category pages using the block registry.
 * Works with dynamic category data loaded at runtime.
 */

import { hasItems } from '@/lib/conditions';

/**
 * Get category page sections configuration
 *
 * @param {Object} categoryData - Raw category data from JSON
 * @param {string} categoryId - Category slug
 * @returns {Array} Array of section configurations
 */
export function getCategorySections(categoryData, categoryId) {
  return [
    // Hero Section - needs full categoryData for hero component
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
      dataKey: 'featured'
    },

    // Introduction Section
    {
      id: 'introduction',
      block: 'category.introduction',
      dataKey: 'introduction'
    },

    // Subcategories Grid - needs categoryId for routing
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
      props: { variant: 'compact' }
    },

    // Process Timeline
    {
      id: 'process',
      block: 'treatment.process-timeline',
      dataKey: 'process',
      props: { variant: 'default' }
    },

    // Testimonials
    {
      id: 'testimonials',
      block: 'category.testimonials',
      dataKey: 'testimonials',
      condition: () => hasItems(categoryData.testimonials)
    },

    // FAQ Section
    {
      id: 'faq',
      block: 'section.faq',
      dataKey: 'faq',
      props: { variant: 'default' }
    },

    // CTA Section
    {
      id: 'cta',
      block: 'section.cta',
      dataKey: 'cta',
      props: { variant: 'default' }
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
