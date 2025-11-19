import { headers } from 'next/headers';
import { getDomainByHost } from './domains';
import { contactInfo } from '@/data/contact-info';

/**
 * Domain-Aware Helper Functions
 * 
 * Ensures all URLs, metadata, and structured data use the correct domain
 * based on the current request context (drsnaclinic.com vs pshots.co.uk, etc.)
 */

/**
 * Get the current domain context from request headers
 * Server-side only
 */
export async function getCurrentDomain() {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    return getDomainByHost(host);
  } catch (error) {
    // Fallback to main domain if headers not available
    return {
      id: 'main',
      url: contactInfo.urls.website,
      name: contactInfo.clinic.name,
    };
  }
}

/**
 * Get the base URL for the current domain
 * Use this instead of hardcoding https://drsnaclinic.com
 */
export async function getBaseUrl() {
  const domain = await getCurrentDomain();
  return domain.url;
}

/**
 * Build a full URL for the current domain
 * @param {string} path - Relative path (e.g., '/treatments/p-shot')
 * @returns {string} Full URL (e.g., 'https://drsnaclinic.com/treatments/p-shot')
 */
export async function buildUrl(path) {
  const baseUrl = await getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get domain-aware contact info
 * Returns phone/email/address that matches current domain
 */
export async function getDomainContactInfo() {
  const domain = await getCurrentDomain();
  
  // For now, all domains use same contact info
  // But this allows future customization per domain
  return {
    ...contactInfo,
    urls: {
      ...contactInfo.urls,
      website: domain.url,
    },
  };
}

/**
 * Build domain-aware canonical URL
 * @param {string} relativePath - Relative path from data file (e.g., '/treatments/p-shot')
 * @returns {string} Full canonical URL for current domain
 */
export async function buildCanonicalUrl(relativePath) {
  if (!relativePath) return undefined;
  
  // If already absolute URL, return as-is
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  return await buildUrl(relativePath);
}

/**
 * Build domain-aware OpenGraph metadata
 * @param {Object} metadata - Base metadata object
 * @returns {Object} Metadata with domain-aware URLs
 */
export async function buildDomainAwareMetadata(metadata) {
  const domain = await getCurrentDomain();
  const baseUrl = domain.url;
  
  return {
    ...metadata,
    metadataBase: new URL(baseUrl),
    openGraph: {
      ...metadata.openGraph,
      url: baseUrl,
      siteName: domain.name || contactInfo.clinic.name,
    },
    alternates: {
      ...metadata.alternates,
      canonical: metadata.alternates?.canonical 
        ? await buildCanonicalUrl(metadata.alternates.canonical)
        : undefined,
    },
  };
}

/**
 * Get domain-aware schema.org URLs
 * Use this in generateTreatmentStructuredData and other structured data helpers
 */
export async function getSchemaUrls() {
  const baseUrl = await getBaseUrl();
  const domain = await getCurrentDomain();
  
  return {
    website: baseUrl,
    domain: domain,
    buildTreatmentUrl: (category, subcategory, slug) => 
      `${baseUrl}/treatments/${category}/${subcategory}/${slug}`,
    buildCategoryUrl: (category) => 
      `${baseUrl}/treatments/${category}`,
    buildSubcategoryUrl: (category, subcategory) => 
      `${baseUrl}/treatments/${category}/${subcategory}`,
    buildResourceUrl: (slug) => 
      `${baseUrl}/resources/${slug}`,
    buildPageUrl: (path) => 
      `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`,
  };
}

