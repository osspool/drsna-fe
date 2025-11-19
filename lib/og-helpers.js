/**
 * OG Image URL Helper
 *
 * Generates dynamic OG image URLs for the /api/og endpoint
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://drsnaclinic.com';

/**
 * Generate OG image URL for any page type
 *
 * @param {Object} options - OG image options
 * @param {string} options.title - Main title text
 * @param {string} options.subtitle - Subtitle/description
 * @param {string} options.type - Image type: 'default' | 'treatment' | 'category'
 * @param {string} options.icon - Lucide icon name: 'sparkles' | 'heart' | 'activity' | 'shield' | 'stethoscope' | 'zap' | 'award'
 * @param {string} options.badge - Optional badge text
 * @param {string} options.price - Optional price display
 * @param {Array} options.stats - Optional stats array [{value, label}]
 * @returns {string} Full OG image URL
 */
export function generateOGImageURL(options = {}) {
  const {
    title = 'Dr. SNA Clinic',
    subtitle = 'Premium Medical Treatments in London',
    type = 'default',
    icon = 'sparkles',
    badge = '',
    price = '',
    stats = [],
  } = options;

  const params = new URLSearchParams();

  if (title) params.set('title', title);
  if (subtitle) params.set('subtitle', subtitle);
  if (type) params.set('type', type);
  if (icon) params.set('icon', icon);
  if (badge) params.set('badge', badge);
  if (price) params.set('price', price);

  // Format stats as "value:label|value:label"
  if (stats.length > 0) {
    const statsStr = stats.map(s => `${s.value}:${s.label}`).join('|');
    params.set('stats', statsStr);
  }

  return `${BASE_URL}/api/og?${params.toString()}`;
}

/**
 * Generate OG image URL for treatment pages
 *
 * @param {Object} treatment - Treatment data object
 * @returns {string} OG image URL
 */
export function generateTreatmentOGImage(treatment) {
  if (!treatment) return generateOGImageURL();

  // Map category to icon
  const categoryIcons = {
    'aesthetic-medicine': 'sparkles',
    'intimate-health': 'heart',
    'pain-management': 'activity',
    'life-optimization': 'zap',
    'private-gp': 'stethoscope',
    'scientific-evidence': 'award',
  };

  const icon = categoryIcons[treatment.categoryId] || 'sparkles';
  const price = treatment.quickStats?.price || '';
  const badge = treatment.hero?.badge || treatment.shortTitle || '';

  return generateOGImageURL({
    title: treatment.seo?.metaTitle?.split('|')[0]?.trim() || treatment.title || 'Treatment',
    subtitle: treatment.seo?.metaDescription?.substring(0, 100) || treatment.description || '',
    type: 'treatment',
    icon,
    badge,
    price,
  });
}

/**
 * Generate OG image URL for category pages
 *
 * @param {Object} category - Category data object
 * @returns {string} OG image URL
 */
export function generateCategoryOGImage(category) {
  if (!category) return generateOGImageURL();

  const categoryIcons = {
    'aesthetic-medicine': 'sparkles',
    'intimate-health': 'heart',
    'pain-management': 'activity',
    'life-optimization': 'zap',
    'private-gp': 'stethoscope',
    'scientific-evidence': 'award',
  };

  const icon = categoryIcons[category.id] || 'sparkles';

  return generateOGImageURL({
    title: category.title || 'Treatments',
    subtitle: category.description || '',
    type: 'category',
    icon,
    badge: category.shortTitle || '',
    stats: [
      { value: `${category.treatmentCount || 0}+`, label: 'Treatments' },
      { value: '15+', label: 'Years Experience' },
    ],
  });
}

/**
 * Generate OG image URL for home page
 *
 * @returns {string} OG image URL
 */
export function generateHomeOGImage() {
  return generateOGImageURL({
    title: 'Dr. SNA Clinic',
    subtitle: 'Premium Aesthetic Medicine, Intimate Health & Pain Management in London',
    type: 'default',
    icon: 'award',
    badge: 'Marylebone, London',
    stats: [
      { value: '15+', label: 'Years' },
      { value: '10K+', label: 'Patients' },
      { value: '5.0', label: 'Rating' },
    ],
  });
}

/**
 * Generate OG image URL for about page
 *
 * @returns {string} OG image URL
 */
export function generateAboutOGImage() {
  return generateOGImageURL({
    title: 'Dr. Syed Nadeem Abbas',
    subtitle: 'Leading Aesthetic & Regenerative Medicine Specialist',
    type: 'default',
    icon: 'stethoscope',
    badge: 'About Us',
    stats: [
      { value: 'GMC', label: 'Registered' },
      { value: '15+', label: 'Years' },
      { value: 'CQC', label: 'Approved' },
    ],
  });
}

/**
 * Generate OG image URL for resources/guides
 *
 * @param {Object} guide - Guide data object
 * @returns {string} OG image URL
 */
export function generateResourceOGImage(guide) {
  if (!guide) {
    return generateOGImageURL({
      title: 'Resources & Guides',
      subtitle: 'Expert medical guides and resources from Dr. SNA Clinic',
      type: 'default',
      icon: 'award',
      badge: 'Resources',
    });
  }

  return generateOGImageURL({
    title: guide.title || 'Guide',
    subtitle: guide.description || '',
    type: 'category',
    icon: 'award',
    badge: guide.category || 'Guide',
  });
}
