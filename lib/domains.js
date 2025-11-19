/**
 * Multi-Domain Configuration
 *
 * Scalable domain configuration for SEO, sitemap, and robots.txt generation.
 * Add new domains here and they'll automatically get proper SEO setup.
 */

export const domains = {
  // Main clinic domain
  main: {
    id: 'main',
    name: 'Dr SNA Clinic',
    url: 'https://drsnaclinic.com',
    hosts: ['drsnaclinic.com', 'www.drsnaclinic.com', 'localhost:3000'],

    // LLM-friendly metadata for AI crawlers
    llms: {
      title: 'Dr SNA Clinic',
      description: 'Premier aesthetic medicine clinic in London offering advanced treatments in facial aesthetics, intimate health, pain management, and regenerative medicine. Led by Dr. Syed Nadeem Abbas, GMC registered specialist.',
      specialties: [
        'Aesthetic Medicine',
        'Regenerative Medicine',
        'Intimate Health',
        'Pain Management',
        'PRP Therapy',
        'BMAC Stem Cell Therapy'
      ],
      keyDifferentiators: [
        'GMC-registered specialist doctor',
        'CQC-regulated clinic',
        'Advanced regenerative medicine',
        'Evidence-based protocols',
        'Specialized intimate health procedures'
      ]
    },

    // Static pages for this domain - treatment-focused for high rankings
    staticPages: [
      { path: '/', changeFrequency: 'weekly', priority: 1.0 },

      // TOP 8 TREATMENTS - Highest priority for niche rankings
      { path: '/treatments/intimate-health/male/p-shot', changeFrequency: 'weekly', priority: 0.95 },
      { path: '/treatments/intimate-health/male/shockwave-therapy', changeFrequency: 'weekly', priority: 0.95 },
      { path: '/treatments/aesthetic-medicine/face/prp-facelift', changeFrequency: 'weekly', priority: 0.95 },
      { path: '/treatments/aesthetic-medicine/hair/prp-hair', changeFrequency: 'weekly', priority: 0.95 },
      { path: '/treatments/pain-management/conditions/knee-treatment', changeFrequency: 'weekly', priority: 0.95 },
      { path: '/treatments/pain-management/treatments/arthrosamid-injection', changeFrequency: 'weekly', priority: 0.95 },
      { path: '/treatments/pain-management/treatments/bmac-therapy', changeFrequency: 'weekly', priority: 0.95 },
      { path: '/treatments/aesthetic-medicine/face/dermal-fillers', changeFrequency: 'weekly', priority: 0.9 },

      // Secondary pages
      { path: '/contact', changeFrequency: 'weekly', priority: 0.85 },
      { path: '/treatments', changeFrequency: 'weekly', priority: 0.8 },
      { path: '/treatments/aesthetic-medicine', changeFrequency: 'weekly', priority: 0.75 },
      { path: '/treatments/intimate-health', changeFrequency: 'weekly', priority: 0.75 },
      { path: '/treatments/pain-management', changeFrequency: 'weekly', priority: 0.75 },
      { path: '/dr-syed-nadeem-abbas', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/about-us', changeFrequency: 'monthly', priority: 0.6 },
      { path: '/resources', changeFrequency: 'weekly', priority: 0.7 },
    ],

    // Dynamic content - set to true to include in sitemap
    includeTreatments: true,
    includeCategories: true,
    includeSubcategories: true,
    includeResources: true,

    // Robots configuration
    robots: {
      allow: ['/'],
      disallow: ['/api/', '/admin/', '/_next/', '/private/'],
    },
  },

  // P-Shot dedicated domain
  pshot: {
    id: 'pshot',
    name: 'P-Shot UK',
    url: 'https://pshots.co.uk',
    hosts: ['pshots.co.uk', 'www.pshots.co.uk', 'pshot.localhost:3000'],

    // LLM-friendly metadata for AI crawlers
    llms: {
      title: 'P-Shot UK',
      description: "The UK's leading specialist clinic for the Priapus Shot (P-Shot), a revolutionary platelet-rich plasma therapy for male sexual health and enhancement.",
      specialties: [
        'P-Shot (Priapus Shot)',
        'Erectile Dysfunction Treatment',
        "Peyronie's Disease Treatment",
        'Male Enhancement',
        'PRP Therapy for Men',
        'Shockwave Therapy'
      ],
      keyDifferentiators: [
        "UK's most experienced P-Shot provider",
        'Thousands of successful procedures',
        'GMC-registered specialist',
        'Discreet London clinic',
        'Combination therapy options',
        'Evidence-based approach'
      ]
    },

    // Static pages for P-Shot domain (only pshot content)
    staticPages: [
      { path: '/', changeFrequency: 'weekly', priority: 1.0 },
      // Add more P-Shot specific pages as they're created
      // { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
      // { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
      // { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    ],

    // P-Shot domain doesn't have treatments/categories
    includeTreatments: false,
    includeCategories: false,
    includeSubcategories: false,
    includeResources: false,

    // Robots configuration
    robots: {
      allow: ['/'],
      disallow: ['/api/', '/_next/'],
    },
  },
};

/**
 * Get domain config by hostname
 * @param {string} hostname - The request hostname
 * @returns {Object} Domain configuration
 */
export function getDomainByHost(hostname) {
  const cleanHost = hostname?.replace(/:\d+$/, '').toLowerCase() || '';

  for (const domain of Object.values(domains)) {
    if (domain.hosts.some(h => cleanHost.includes(h.replace(/:\d+$/, '')))) {
      return domain;
    }
  }

  // Default to main domain
  return domains.main;
}

/**
 * Get domain config by ID
 * @param {string} id - Domain ID (main, pshot, etc.)
 * @returns {Object} Domain configuration
 */
export function getDomainById(id) {
  return domains[id] || domains.main;
}

/**
 * Get all domain URLs for cross-domain linking
 * @returns {Array} Array of domain configs
 */
export function getAllDomains() {
  return Object.values(domains);
}
