import { headers } from 'next/headers';
import { getCategories } from '@/lib/categories';
import { getAllTreatmentPaths } from '@/lib/treatments';
import { getAllSubcategoryPaths } from '@/lib/subcategories';
import { getDomainByHost } from '@/lib/domains';
import { getAllResourcePaths } from '@/lib/resources';

/**
 * Generate dynamic sitemap for all pages
 * Multi-domain aware - returns appropriate sitemap based on request host
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const domain = getDomainByHost(host);
  const baseUrl = domain.url;

  // Static pages from domain config
  const staticPages = domain.staticPages.map((page) => ({
    url: `${baseUrl}${page.path === '/' ? '' : page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Only include dynamic content if configured for this domain
  let categoryPages = [];
  let subcategoryPages = [];
  let treatmentPages = [];
  let resourcePages = [];

  if (domain.includeCategories) {
    try {
      const categoriesArray = await getCategories();
      
      categoryPages = categoriesArray.map((category) => ({
        url: `${baseUrl}/treatments/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    } catch (e) {
      // Categories may not be available
      console.error('Error loading categories for sitemap:', e);
    }
  }

  if (domain.includeSubcategories) {
    try {
      const subcategories = await getAllSubcategoryPaths();
      subcategoryPages = subcategories.map((sub) => ({
        url: `${baseUrl}/treatments/${sub.category}/${sub.subcategory}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    } catch (e) {
      // Subcategories may not be available
    }
  }

  if (domain.includeTreatments) {
    try {
      const treatments = await getAllTreatmentPaths();
      treatmentPages = treatments.map((treatment) => ({
        url: `${baseUrl}/treatments/${treatment.category}/${treatment.subcategory}/${treatment.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        // Include images for better SEO
        ...(treatment.image && {
          images: [treatment.image]
        })
      }));
    } catch (e) {
      // Treatments may not be available
    }
  }

  if (domain.includeResources) {
    try {
      const resources = await getAllResourcePaths();
      resourcePages = resources.map((resource) => ({
        url: `${baseUrl}/resources/${resource.slug}`,
        lastModified: resource.updated ? new Date(resource.updated) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    } catch (e) {
      // Resources optional
    }
  }

  return [
    ...staticPages,
    ...categoryPages,
    ...subcategoryPages,
    ...treatmentPages,
    ...resourcePages,
  ];
}
