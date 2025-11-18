/**
 * Contact Page Configuration
 *
 * Defines the section structure for the contact page using the block registry.
 * Uses direct data passing without external mappers.
 */

import contactData from '@/data/contact.json';

/**
 * Contact page section configuration
 *
 * Each section specifies:
 * - id: Unique identifier
 * - block: Block type from registry
 * - dataKey: Path to data in contactData
 * - mapper: Inline function for transformations (when needed)
 */
export const contactSections = [
  // Hero Section
  {
    id: 'hero',
    block: 'hero.category',
    dataKey: 'hero',
    mapper: () => ({
      data: {
        title: contactData.hero.title,
        tagline: contactData.hero.tagline,
        hero: {
          headline: contactData.hero.headline,
          subheadline: contactData.hero.subheadline
        }
      },
      variant: 'subcategory'
    })
  },

  // Contact Information Cards
  {
    id: 'contact-info',
    block: 'contact.info-cards',
    dataKey: 'contactInfo',
    mapper: () => ({
      data: {
        cards: contactData.contactInfo
      }
    })
  },

  // Main Contact Section (Form + Map + Hours)
  {
    id: 'contact-main',
    block: 'contact.main-section',
    mapper: () => ({
      data: {
        form: contactData.contactForm,
        businessHours: contactData.businessHours
      }
    })
  },

  // Why Visit Section
  {
    id: 'why-visit',
    block: 'section.features',
    dataKey: 'whyVisit',
    mapper: () => ({
      data: {
        title: contactData.whyVisit.title,
        description: contactData.whyVisit.description,
        features: contactData.whyVisit.features,
        variant: 'default',
        layout: 'grid-3',
        background: 'default'
      }
    })
  }
];

/**
 * Get contact page sections
 *
 * @returns {Array} Array of section configurations
 */
export function getContactSections() {
  return contactSections;
}

/**
 * Get contact page data
 *
 * @returns {Object} Contact page data
 */
export function getContactData() {
  return contactData;
}
