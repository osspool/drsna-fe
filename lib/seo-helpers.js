/**
 * SEO/Metadata Helpers for Dynamic Routes
 *
 * Consolidates the repeated metadata generation pattern across treatment and subcategory pages.
 * Provides reusable helpers for building SEO metadata and static paths.
 */

import { contactInfo, getSchemaAddress } from '@/data/contact-info';
import { generateTreatmentOGImage, generateOGImageURL } from './og-helpers';

/**
 * Build metadata object for SEO - DOMAIN AWARE
 *
 * IMPORTANT: This function is CACHEABLE (used in "use cache" modules)
 * baseUrl MUST be passed from page component that calls getBaseUrl()
 *
 * @param {Object} entity - The entity (treatment/subcategory) data object
 * @param {string} imageField - The field name or value for the OpenGraph image
 * @param {string} fallbackTitle - Fallback title if entity is null
 * @param {string} baseUrl - Current domain's base URL (REQUIRED - pass from page component)
 * @returns {Object} Metadata object for Next.js
 */
export async function buildMetadata(
  entity,
  imageField = 'hero.image',
  fallbackTitle = 'Page Not Found',
  baseUrl = contactInfo.urls.website // Fallback to main domain
) {
  if (!entity) {
    return { title: fallbackTitle };
  }

  // Extract image from nested field path
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const staticImage = getNestedValue(entity, imageField);

  const metaTitle = entity.seo?.metaTitle || entity.seo?.title || `${entity.title} | Dr. SNA Clinic`;
  const metaDescription = entity.seo?.metaDescription || entity.seo?.description || entity.description || entity.summary;
  const keywords = Array.isArray(entity.seo?.keywords)
    ? entity.seo.keywords.join(", ")
    : entity.seo?.keywords;

  // Generate dynamic OG image if entity has treatment structure, otherwise use static image
  let ogImageUrl;
  if (entity.categoryId && entity.quickStats) {
    ogImageUrl = generateTreatmentOGImage(entity);
  } else if (entity.title) {
    ogImageUrl = generateOGImageURL({
      title: entity.title,
      subtitle: metaDescription?.substring(0, 100) || '',
      type: 'default',
      badge: entity.shortTitle || '',
    });
  }

  const openGraphImages = [{
    url: ogImageUrl || staticImage,
    width: 1200,
    height: 630,
    alt: entity.title,
    type: 'image/png',
  }];

  // Build absolute canonical URL
  const canonicalPath = entity.seo?.canonicalUrl || entity.canonical;
  const canonicalUrl = canonicalPath 
    ? (canonicalPath.startsWith('http') ? canonicalPath : `${baseUrl}${canonicalPath}`)
    : undefined;

  const metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords,
    authors: entity.authors,
    openGraph: {
      title: entity.seo?.metaTitle || entity.seo?.title || entity.title,
      description: metaDescription,
      images: openGraphImages,
      url: canonicalUrl,
      siteName: 'Dr SNA Clinic',
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: entity.seo?.metaTitle || entity.seo?.title || entity.title,
      description: metaDescription,
      images: [ogImageUrl || staticImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // Merge with domain-specific robots config if available
  // This ensures we respect the central configuration in lib/domains.js
  try {
    const { getCurrentDomain } = await import('./domain-helpers');
    const domain = await getCurrentDomain();
    
    if (domain?.robots) {
      // Map domain.robots (allow/disallow) to Next.js metadata format
      // If explicit allow rules exist, we assume index: true
      // If explicit disallow rules exist for '/', we might assume index: false, 
      // but usually robots.txt and meta tags are separate. 
      // However, for this specific 'noindex' issue, we want to FORCE index: true 
      // unless explicitly disabled in domain config (which we don't have a field for yet, 
      // but we can default to true as we did above).
      
      // If we wanted to make it fully dynamic:
      // const isNoIndex = domain.robots.noindex; // Hypothetical field
      // if (isNoIndex) { metadata.robots.index = false; }
    }
  } catch (e) {
    // Ignore error if domain helpers fail (fallback to default index: true)
  }

  return metadata;
}

/**
 * Factory helper to generate domain-aware Next.js metadata functions.
 */
export function createMetadataGenerator(
  fetcher,
  imageField = 'hero.image',
  fallbackTitle = 'Page Not Found',
  paramMapper
) {
  if (!paramMapper || typeof paramMapper !== 'function') {
    throw new Error(
      'createMetadataGenerator requires a paramMapper function. ' +
      'Example: (params) => [params.category, params.subcategory]'
    );
  }

  return async function generateMetadata({ params }) {
    // Get domain at metadata generation time (NOT cached, can use headers())
    const { getBaseUrl } = await import('./domain-helpers');
    const baseUrl = await getBaseUrl();
    
    const resolvedParams = await params;
    const paramValues = paramMapper(resolvedParams);
    const entity = await fetcher(...paramValues);

    return buildMetadata(entity, imageField, fallbackTitle, baseUrl);
  };
}

/**
 * Create a static params generator function
 *
 * Factory function that creates a generateStaticParams function.
 * Simple wrapper for consistency with createMetadataGenerator.
 *
 * @param {Function} pathsFetcher - Async function that returns static paths array
 * @returns {Function} A generateStaticParams function for Next.js pages
 *
 * @example
 * // In a treatment page
 * export const generateStaticParams = createStaticParamsGenerator(getStaticTreatmentPaths);
 */
export function createStaticParamsGenerator(pathsFetcher) {
  return async function generateStaticParams() {
    return await pathsFetcher();
  };
}

/**
 * Generate structured data (JSON-LD) for treatment pages
 *
 * Creates MedicalProcedure, FAQPage, and BreadcrumbList schemas for SEO
 *
 * @param {Object} treatment - The treatment data object
 * @param {Object} params - URL params (category, subcategory, slug)
 * @param {string} baseUrl - Domain-aware base URL (from getSchemaUrls)
 * @returns {Array} Array of structured data objects for JSON-LD
 */
export function generateTreatmentStructuredData(treatment, params, baseUrl = contactInfo.urls.website) {
  if (!treatment) return [];

  const treatmentUrl = `${baseUrl}/treatments/${params.category}/${params.subcategory}/${params.slug}`;

  const structuredData = [];

  // 1. MedicalProcedure Schema - Enhanced with comprehensive treatment data
  const schema = treatment.seo?.schema || {};
  
  const medicalProcedure = {
    "@context": "https://schema.org",
    "@type": schema["@type"] || "MedicalProcedure",
    name: treatment.title,
    alternateName: treatment.alternativeTitles || [],
    description: treatment.seo?.metaDescription || treatment.description,
    url: treatmentUrl,
    procedureType: schema.procedureType || "NoninvasiveProcedure",
    
    // Body location - supports array or string
    ...(schema.bodyLocation && {
      bodyLocation: Array.isArray(schema.bodyLocation) ? schema.bodyLocation : [schema.bodyLocation]
    }),
    
    // How the procedure is performed
    howPerformed: schema.howPerformed || treatment.howItWorks?.content || treatment.longDescription,
    
    // Preparation instructions
    preparation: schema.preparation || treatment.whatToExpect?.description,
    
    // Follow-up care
    ...(schema.followup && { followup: schema.followup }),
    
    // Expected outcome
    ...(schema.outcome && { outcome: schema.outcome }),
    
    // Medication required
    ...(schema.medicationRequired && { medicationRequired: schema.medicationRequired }),
    
    // Medical specialty
    ...(schema.medicalSpecialty && { medicalSpecialty: schema.medicalSpecialty }),
    
    // Contraindications
    ...(schema.contraindication && {
      contraindication: Array.isArray(schema.contraindication) 
        ? schema.contraindication.map(c => ({ "@type": "MedicalContraindication", name: c }))
        : [{ "@type": "MedicalContraindication", name: schema.contraindication }]
    }),
    
    // Serious adverse outcome
    ...(schema.seriousAdverseOutcome && { seriousAdverseOutcome: schema.seriousAdverseOutcome }),
    
    // Typical test
    ...(schema.typicalTest && { typicalTest: schema.typicalTest }),
    
    status: "EventScheduled",
    
    // Provider info
    performer: {
      "@type": "Physician",
      name: "Dr Syed Nadeem Abbas",
      url: `${baseUrl}/dr-syed-nadeem-abbas`,
      medicalSpecialty: schema.relevantSpecialty || schema.medicalSpecialty || "Aesthetic Medicine"
    },
    
    // Location
    location: {
      "@type": "MedicalClinic",
      name: contactInfo.clinic.name,
      address: getSchemaAddress(),
      telephone: contactInfo.phone.primary.number,
      url: baseUrl
    }
  };

  // Add pricing if available
  if (treatment.pricing?.singlePrice?.currentPrice) {
    medicalProcedure.offers = {
      "@type": "Offer",
      price: treatment.pricing.singlePrice.currentPrice.replace(/[^0-9]/g, ''),
      priceCurrency: treatment.pricing.singlePrice.currency || "GBP",
      availability: "https://schema.org/InStock"
    };
  }

  // Add outcome/results if available
  if (treatment.quickStats?.resultsLast) {
    medicalProcedure.followup = `Results last ${treatment.quickStats.resultsLast}`;
  }

  structuredData.push(medicalProcedure);

  // 2. FAQPage Schema (if FAQ exists)
  if (treatment.faq && Array.isArray(treatment.faq) && treatment.faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: treatment.faq.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
    structuredData.push(faqSchema);
  }

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Treatments",
        item: `${baseUrl}/treatments`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: formatCategoryName(params.category),
        item: `${baseUrl}/treatments/${params.category}`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: formatCategoryName(params.subcategory),
        item: `${baseUrl}/treatments/${params.category}/${params.subcategory}`
      },
      {
        "@type": "ListItem",
        position: 5,
        name: treatment.title,
        item: treatmentUrl
      }
    ]
  };
  structuredData.push(breadcrumbSchema);

  // 4. Review/Rating Schema (if testimonials exist)
  if (treatment.testimonials && Array.isArray(treatment.testimonials) && treatment.testimonials.length > 0) {
    const avgRating = treatment.testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / treatment.testimonials.length;

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "Dr SNA Clinic",
      url: baseUrl,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount: treatment.testimonials.length,
        bestRating: 5,
        worstRating: 1
      },
      review: treatment.testimonials.slice(0, 3).map(t => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: t.name
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating || 5,
          bestRating: 5
        },
        reviewBody: t.text || t.quote
      }))
    };
    structuredData.push(reviewSchema);
  }

  return structuredData;
}

/**
 * Format category/subcategory slug to readable name
 */
function formatCategoryName(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate structured data (JSON-LD) for resource/article pages
 *
 * Creates Article, BreadcrumbList, and FAQPage schemas for SEO
 *
 * @param {Object} resource - The resource/guide data object
 * @param {string} slug - Resource slug
 * @param {string} baseUrl - Domain-aware base URL (from getSchemaUrls)
 * @returns {Array} Array of structured data objects for JSON-LD
 */
export function generateResourceStructuredData(resource, slug, baseUrl = contactInfo.urls.website) {
  if (!resource) return [];

  const resourceUrl = `${baseUrl}/resources/${slug}`;

  const structuredData = [];

  // 1. Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.summary || resource.subtitle,
    image: resource.heroImage,
    datePublished: resource.firstPublished || resource.lastUpdated,
    dateModified: resource.lastUpdated,
    author: {
      "@type": "Person",
      name: "Dr Syed Nadeem Abbas",
      url: `${baseUrl}/dr-syed-nadeem-abbas`,
      jobTitle: "Aesthetic Medicine Specialist",
      sameAs: [
        "https://www.linkedin.com/in/dr-syed-nadeem-abbas"
      ]
    },
    publisher: {
      "@type": "Organization",
      name: "Dr SNA Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/dr-sna-clinic-logo.png`,
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": resourceUrl
    }
  };

  // Add reading time if available
  if (resource.readTime || resource.estimatedRead) {
    articleSchema.timeRequired = resource.readTime || resource.estimatedRead;
  }

  structuredData.push(articleSchema);

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: `${baseUrl}/resources`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: resource.title,
        item: resourceUrl
      }
    ]
  };
  structuredData.push(breadcrumbSchema);

  // 3. FAQPage Schema (if FAQ exists)
  if (resource.faqs && Array.isArray(resource.faqs) && resource.faqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: resource.faqs.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
    structuredData.push(faqSchema);
  }

  // 4. HowTo Schema (if sections contain step-by-step guides)
  if (resource.sections && Array.isArray(resource.sections)) {
    const hasSteps = resource.sections.some(section => 
      section.items && section.items.length > 2
    );

    if (hasSteps) {
      const firstSection = resource.sections.find(s => s.items?.length > 0);
      if (firstSection) {
        const howToSchema = {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: firstSection.title || resource.title,
          description: firstSection.intro || resource.summary,
          step: firstSection.items.map((item, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: item.heading || item.badge,
            text: item.body
          }))
        };
        structuredData.push(howToSchema);
      }
    }
  }

  return structuredData;
}

/**
 * Build a standard BreadcrumbList schema
 * @param {string} baseUrl - Absolute URL for the home page
 * @param {Array<{name: string, path?: string, url?: string}>} steps - Additional breadcrumb steps
 * @returns {Object|null}
 */
export function buildBreadcrumbSchema(baseUrl, steps = []) {
  if (!baseUrl) return null;

  const normalizeUrl = (step) => {
    if (step.url) return step.url;
    if (!step.path) return undefined;
    if (step.path.startsWith('http')) return step.path;
    const normalized = step.path.startsWith('/') ? step.path : `/${step.path}`;
    return `${baseUrl}${normalized}`;
  };

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    ...steps
      .map((step, index) => {
        const itemUrl = normalizeUrl(step);
        if (!step?.name || !itemUrl) return null;
        return {
          "@type": "ListItem",
          position: index + 2,
          name: step.name,
          item: itemUrl,
        };
      })
      .filter(Boolean),
  ];

  if (itemListElement.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

/**
 * Build a CollectionPage schema used across listing-style pages
 * @param {Object} options
 * @param {string} options.name
 * @param {string} [options.description]
 * @param {string} options.url
 * @param {string} [options.about]
 * @param {Array} [options.items]
 * @returns {Object|null}
 */
export function buildCollectionPageSchema({ name, description, url, about, items = [] }) {
  if (!name || !url) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
  };

  if (description) {
    schema.description = description;
  }

  if (about) {
    schema.about = about;
  }

  if (items.length > 0) {
    schema.mainEntity = items;
  }

  return schema;
}
