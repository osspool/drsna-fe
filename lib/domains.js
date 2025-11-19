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

    // Static pages for this domain
    staticPages: [
      { path: '/', changeFrequency: 'weekly', priority: 1.0 },
      { path: '/treatments', changeFrequency: 'weekly', priority: 0.9 },
      { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
      { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
      { path: '/dr-syed-nadeem-abbas', changeFrequency: 'monthly', priority: 0.9 },
    ],

    // Dynamic content - set to true to include in sitemap
    includeTreatments: true,
    includeCategories: true,
    includeSubcategories: true,

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
