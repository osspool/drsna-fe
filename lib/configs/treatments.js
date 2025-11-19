/**
 * Treatments Listing Page Configuration
 *
 * Defines the section structure for the treatments listing page using the block registry.
 * Uses direct data passing without external mappers.
 */

import treatmentsData from '@/data/treatments-listing.json';
import { getCategories, getWhyChooseFeatures } from '@/lib/categories';
import { buildMetadata } from '@/lib/seo-helpers';

/**
 * Get treatments page sections configuration
 *
 * @param {Array} categories - Categories data from getCategories()
 * @param {Array} features - Features data from getWhyChooseFeatures()
 * @returns {Array} Array of section configurations
 */
export function getTreatmentsSections(categories, features) {
  return [
    // Hero Section
    {
      id: 'hero',
      block: 'hero.category',
      dataKey: 'hero',
      mapper: () => ({
        data: {
          title: treatmentsData.hero.title,
          tagline: treatmentsData.hero.tagline,
          hero: {
            headline: treatmentsData.hero.headline,
            subheadline: treatmentsData.hero.subheadline,
            stats: treatmentsData.hero.stats
          }
        },
        variant: 'category',
        showStats: true
      })
    },

    // Categories Section
    {
      id: 'categories',
      block: 'treatments.categories-section',
      dataKey: 'categoriesSection',
      mapper: () => ({
        data: {
          ...treatmentsData.categoriesSection,
          categories
        }
      })
    },

    // Why Choose Us Section
    {
      id: 'why-choose',
      block: 'treatments.why-choose-section',
      dataKey: 'whyChoose',
      mapper: () => ({
        data: {
          badge: treatmentsData.whyChoose.badge,
          badgeIcon: treatmentsData.whyChoose.badgeIcon,
          title: treatmentsData.whyChoose.title,
          subtitle: treatmentsData.whyChoose.subtitle,
          image: treatmentsData.whyChoose.image,
          cta: treatmentsData.whyChoose.cta,
          features
        }
      })
    },

    // CTA Section
    {
      id: 'cta',
      block: 'section.cta',
      mapper: () => ({})
    }
  ];
}

/**
 * Get treatments page data with async dependencies
 *
 * @returns {Promise<Object>} Complete page data including categories and features
 */
export async function getTreatmentsPageData() {
  const [categories, features] = await Promise.all([
    getCategories(),
    getWhyChooseFeatures()
  ]);

  return {
    ...treatmentsData,
    categories,
    features
  };
}

/**
 * Get SEO metadata for the page
 *
 * @returns {Object} SEO metadata
 */
export function getTreatmentsSEO() {
  return treatmentsData.seo;
}
