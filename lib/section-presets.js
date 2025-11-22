/**
 * Section Header Presets
 *
 * Centralized presets for section headers to reduce hardcoded defaults
 * across components. Each preset defines default badge, title, subtitle,
 * icons, and variants for different section types.
 *
 * Usage:
 * import { getSectionPreset } from '@/lib/section-presets';
 * const preset = getSectionPreset('faq', { title: 'Custom Title' });
 */

/**
 * Section header preset configurations
 */
export const sectionPresets = {
  // FAQ Section
  faq: {
    badge: "FAQ",
    badgeIcon: "info",
    badgeVariant: "primary",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our treatments",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // Stats/Quick Facts Section
  stats: {
    badge: "Treatment At A Glance",
    badgeIcon: "info",
    badgeVariant: "primary",
    title: "Quick Treatment Facts",
    subtitle: "Everything you need to know before booking—timelines, comfort level, and investment.",
    subtitleClassName: "text-base md:text-lg text-muted-foreground",
    maxWidth: 2
  },

  // Comparison Section
  comparison: {
    badge: "Honest Comparison",
    badgeIcon: "sparkles",
    badgeVariant: "gold",
    title: "See How We Compare",
    subtitle: null,
    subtitleClassName: "text-dark-brown/60"
  },

  // Testimonials Section
  testimonials: {
    badge: "Patient Stories",
    badgeIcon: "heart",
    badgeVariant: "primary",
    title: "Real Results, Real Stories",
    subtitle: "Hear from our patients about their transformation journey",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // Features/Benefits Section
  features: {
    badge: "Why Choose Us",
    badgeIcon: "sparkles",
    badgeVariant: "primary",
    title: "Unmatched Expertise & Care",
    subtitle: "Experience the difference with our comprehensive approach",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // Process/Timeline Section
  process: {
    badge: "How It Works",
    badgeIcon: "sparkles",
    badgeVariant: "primary",
    title: "Your Journey With Us",
    subtitle: "A transparent look at what to expect from consultation to results",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // CTA Section
  cta: {
    badge: "Get Started",
    badgeIcon: "sparkles",
    badgeVariant: "gold",
    title: "Ready to Begin Your Transformation?",
    subtitle: "Book your consultation today and take the first step",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // Gallery Section
  gallery: {
    badge: "Results Gallery",
    badgeIcon: "camera",
    badgeVariant: "primary",
    title: "See the Transformation",
    subtitle: "Real results from our expert treatments",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // Pricing Section
  pricing: {
    badge: "Investment",
    badgeIcon: "pound-sterling",
    badgeVariant: "gold",
    title: "Transparent Pricing",
    subtitle: "Quality treatments with clear, honest pricing",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // Safety Section
  safety: {
    badge: "Your Safety",
    badgeIcon: "shield-check",
    badgeVariant: "primary",
    title: "Safety First, Always",
    subtitle: "Our commitment to your wellbeing and comfort",
    subtitleClassName: "text-base md:text-lg text-foreground",
    maxWidth: 2
  },

  // P-Shot Microsite Presets
  'pshot.stats': {
    badge: "Treatment At A Glance",
    badgeIcon: "info",
    badgeVariant: "gold",
    title: "Real Results by the Numbers",
    subtitle: "Thousands of men have trusted Dr Abbas with their confidence",
    subtitleClassName: "text-primary-foreground/80"
  },
  'pshot.benefits': {
    badge: "Real Benefits",
    badgeIcon: "check-circle",
    badgeVariant: "primary",
    title: "What Changes When You Take Action",
    subtitle: "Real benefits men experience every day"
  },
  'pshot.process': {
    badge: "Your Journey",
    badgeIcon: "clock",
    badgeVariant: "primary",
    title: "What to Expect",
    subtitle: "40 minutes. No surgery. No downtime."
  },
  'pshot.faq': {
    badge: "FAQ",
    badgeIcon: "help-circle",
    badgeVariant: "primary",
    title: "Common Questions",
    subtitle: "Everything you need to know about the P-Shot"
  }
};

/**
 * Get a section preset with optional overrides
 *
 * @param {string} presetName - Name of the preset to use
 * @param {Object} overrides - Custom values to override preset defaults
 * @returns {Object} Merged preset configuration
 *
 * @example
 * // Use preset with custom title
 * const preset = getSectionPreset('faq', { title: 'Treatment FAQs' });
 *
 * @example
 * // Use preset as-is
 * const preset = getSectionPreset('stats');
 */
export function getSectionPreset(presetName, overrides = {}) {
  const preset = sectionPresets[presetName];

  if (!preset) {
    console.warn(`Section preset "${presetName}" not found. Available presets:`, Object.keys(sectionPresets));
    return overrides;
  }

  return {
    ...preset,
    ...overrides
  };
}

/**
 * Get section header props from data or preset
 *
 * Utility function to extract section header props from data object
 * or use preset with data overrides.
 *
 * @param {Object} data - Data object (may contain title, subtitle, badge, etc.)
 * @param {string} presetName - Preset name to use as fallback
 * @returns {Object} Section header props
 *
 * @example
 * // Data provides custom values, uses preset for missing ones
 * const props = getSectionHeaderProps(data, 'faq');
 */
export function getSectionHeaderProps(data, presetName) {
  const preset = sectionPresets[presetName] || {};

  return {
    badge: data?.badge ?? preset.badge,
    badgeIcon: data?.badgeIcon ?? preset.badgeIcon,
    badgeVariant: data?.badgeVariant ?? preset.badgeVariant,
    title: data?.title ?? preset.title,
    subtitle: data?.subtitle ?? preset.subtitle,
    subtitleClassName: data?.subtitleClassName ?? preset.subtitleClassName,
    maxWidth: data?.maxWidth ?? preset.maxWidth
  };
}
