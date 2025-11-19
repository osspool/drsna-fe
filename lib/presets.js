/**
 * Preset Resolution Utilities
 *
 * Provides functions to resolve CTA and FAQ presets in treatment data,
 * reducing duplication across treatment JSON files.
 */

import ctaPresets from '@/data/presets/cta-presets.json';
import faqTemplates from '@/data/presets/faq-templates.json';

/**
 * Resolve a CTA preset variant to full CTA data
 *
 * @param {string|Object} cta - Either a preset variant name (e.g., "aesthetic") or custom CTA object
 * @param {Object} overrides - Optional overrides for specific fields
 * @returns {Object} Resolved CTA data
 *
 * @example
 * // Use preset variant
 * resolveCTA("aesthetic")
 *
 * @example
 * // Use preset with overrides
 * resolveCTA("aesthetic", { title: "Custom Title" })
 *
 * @example
 * // Pass custom object through unchanged
 * resolveCTA({ title: "My Custom CTA", ... })
 */
export function resolveCTA(cta, overrides = {}) {
  // If it's already a full object, merge with overrides and return
  if (typeof cta === 'object' && cta !== null) {
    return { ...cta, ...overrides };
  }

  // If it's a string, resolve the preset variant
  const variant = ctaPresets.variants[cta];
  if (!variant) {
    console.warn(`CTA preset variant "${cta}" not found, using default`);
    return overrides;
  }

  // Resolve the variant references to actual values
  return {
    title: ctaPresets.titles[variant.title] || variant.title,
    subtitle: ctaPresets.subtitles[variant.subtitle] || variant.subtitle,
    primaryButton: ctaPresets.buttons[variant.primaryButton] || variant.primaryButton,
    secondaryButton: ctaPresets.buttons[variant.secondaryButton] || variant.secondaryButton,
    urgency: ctaPresets.urgency[variant.urgency] || variant.urgency,
    guarantee: ctaPresets.guarantees[variant.guarantee] || variant.guarantee,
    ...overrides,
  };
}

/**
 * Resolve FAQ template references to full FAQ items
 *
 * @param {Array} faqList - Array of FAQ items, can include template references
 * @returns {Array} Resolved FAQ items with full question/answer content
 *
 * @example
 * // Mix of templates and custom FAQs
 * resolveFAQ([
 *   "common.doesItHurt",
 *   "aesthetic.lookNatural",
 *   { question: "Custom question?", answer: "Custom answer." }
 * ])
 */
export function resolveFAQ(faqList) {
  if (!Array.isArray(faqList)) return [];

  return faqList.map(item => {
    // If it's already a full FAQ object, return as-is
    if (typeof item === 'object' && item.question && item.answer) {
      return item;
    }

    // If it's a string reference, resolve from templates
    if (typeof item === 'string') {
      const [category, key] = item.split('.');
      const template = faqTemplates[category]?.[key];

      if (!template) {
        console.warn(`FAQ template "${item}" not found`);
        return null;
      }

      return template;
    }

    // If it's a partial object with a template reference
    if (typeof item === 'object' && item.template) {
      const [category, key] = item.template.split('.');
      const template = faqTemplates[category]?.[key];

      if (!template) {
        console.warn(`FAQ template "${item.template}" not found`);
        return null;
      }

      // Merge template with custom overrides
      return {
        ...template,
        ...(item.question && { question: item.question }),
        ...(item.answer && { answer: item.answer }),
      };
    }

    return null;
  }).filter(Boolean);
}

/**
 * Get all available FAQ templates for a category
 *
 * @param {string} category - Category name (e.g., "common", "aesthetic", "painManagement")
 * @returns {Object} All FAQ templates in that category
 */
export function getFAQTemplates(category) {
  return faqTemplates[category] || {};
}

/**
 * Get all available CTA buttons
 *
 * @returns {Object} All predefined button texts
 */
export function getCTAButtons() {
  return ctaPresets.buttons;
}

/**
 * Resolve treatment data with preset expansion
 *
 * Processes a treatment object and expands any preset references
 * for CTA and FAQ sections.
 *
 * @param {Object} treatment - Raw treatment data
 * @returns {Object} Treatment data with expanded presets
 */
export function resolvePresets(treatment) {
  const resolved = { ...treatment };

  // Resolve CTA if it's a preset reference
  if (treatment.cta) {
    resolved.cta = resolveCTA(treatment.cta);
  }

  // Resolve FAQ if it contains template references
  if (treatment.faq) {
    resolved.faq = resolveFAQ(treatment.faq);
  }

  return resolved;
}
