/**
 * SEO/Metadata Helpers for Dynamic Routes
 *
 * Consolidates the repeated metadata generation pattern across treatment and subcategory pages.
 * Provides reusable helpers for building SEO metadata and static paths.
 */

/**
 * Build metadata object for SEO
 *
 * @param {Object} entity - The entity (treatment/subcategory) data object
 * @param {string} imageField - The field name or value for the OpenGraph image (e.g., 'hero.image', 'hero.backgroundImage')
 * @param {string} fallbackTitle - Fallback title if entity is null
 * @returns {Object} Metadata object for Next.js
 */
export function buildMetadata(
  entity,
  imageField = 'hero.image',
  fallbackTitle = 'Page Not Found'
) {
  if (!entity) {
    return { title: fallbackTitle };
  }

  // Extract image from nested field path (e.g., 'hero.image' -> entity.hero?.image)
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const image = getNestedValue(entity, imageField);

  return {
    title: entity.seo?.metaTitle || `${entity.title} | Dr. SNA Clinic`,
    description: entity.seo?.metaDescription || entity.description,
    keywords: entity.seo?.keywords?.join(", "),
    openGraph: {
      title: entity.seo?.metaTitle || entity.title,
      description: entity.seo?.metaDescription || entity.description,
      images: image ? [image] : undefined,
    },
  };
}

/**
 * Create a metadata generator function for dynamic routes
 *
 * Factory function that creates a generateMetadata function with the correct fetcher.
 * Eliminates the boilerplate of resolving params, fetching data, and building metadata.
 *
 * @param {Function} fetcher - Async function that fetches the entity data
 * @param {string} imageField - The field path for the OpenGraph image
 * @param {string} fallbackTitle - Fallback title if entity not found
 * @param {Function} paramMapper - REQUIRED function to map params to fetcher arguments (prevents fragile Object.values ordering)
 * @returns {Function} A generateMetadata function for Next.js pages
 *
 * @example
 * // In a treatment page with explicit param mapping
 * export const generateMetadata = createMetadataGenerator(
 *   getTreatment,
 *   'hero.image',
 *   'Treatment Not Found',
 *   (params) => [params.category, params.subcategory, params.slug]
 * );
 *
 * @example
 * // In a subcategory page with explicit param mapping
 * export const generateMetadata = createMetadataGenerator(
 *   getSubcategory,
 *   'hero.backgroundImage',
 *   'Treatment Not Found',
 *   (params) => [params.category, params.subcategory]
 * );
 */
export function createMetadataGenerator(
  fetcher,
  imageField = 'hero.image',
  fallbackTitle = 'Page Not Found',
  paramMapper
) {
  if (!paramMapper || typeof paramMapper !== 'function') {
    throw new Error(
      'createMetadataGenerator requires a paramMapper function to prevent fragile Object.values ordering. ' +
      'Example: (params) => [params.category, params.subcategory]'
    );
  }

  return async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const paramValues = paramMapper(resolvedParams);
    const entity = await fetcher(...paramValues);

    return buildMetadata(entity, imageField, fallbackTitle);
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
