
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
  awardSpotlight: createLazySection(() => import("@/data/home/sections/award-spotlight.json")),
  pshotFeatured: createLazySection(() => import("@/data/home/sections/pshot-featured.json")),
  globalReach: createLazySection(() => import("@/data/home/sections/global-reach.json")),
  testimonials: createLazySection(() => import("@/data/home/sections/testimonials.json")),
};

export async function getHomePageData() {
  const baseData = (await import("@/data/home/page.json")).default;

  // Resolve all lazy sections
  const resolvedSections = {};
  for (const [key, loader] of Object.entries(lazySections)) {
    resolvedSections[key] = await loader();
  }

  return {
    ...baseData,
    ...resolvedSections,
  };
}
