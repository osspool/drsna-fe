
/**
 * P-Shot Landing Page Data Loader
 *
 * Implements lazy loading pattern for below-the-fold sections
 * to reduce initial bundle size and improve page load performance.
 */

function createLazySection(loader) {
  let cachedPromise;
  return async () => {
    if (!cachedPromise) {
      cachedPromise = loader().then((module) => module.default ?? module);
    }
    return cachedPromise;
  };
}

const lazySections = {
  faq: createLazySection(() => import("@/data/pages/pshot/sections/faq.json")),
  testimonials: createLazySection(() => import("@/data/pages/pshot/sections/testimonials.json")),
  featuredTreatment: createLazySection(() => import("@/data/pages/pshot/sections/featured-treatment.json")),
  doctorCredentials: createLazySection(() => import("@/data/pages/pshot/sections/doctor-credentials.json")),
  videoTestimonials: createLazySection(() => import("@/data/pages/pshot/sections/video-testimonials.json")),
};

export async function getPShotPageData() {
  const { pshotLandingData } = await import("@/data/pages/pshot/landing-data");

  // Resolve all lazy sections
  const resolvedSections = {};
  for (const [key, loader] of Object.entries(lazySections)) {
    resolvedSections[key] = await loader();
  }

  return {
    ...pshotLandingData,
    ...resolvedSections,
  };
}
