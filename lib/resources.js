import overviewData from "@/data/resources/index.json";
import hairGuide from "@/data/resources/guides/hair-fall-roadmap.json";
import intimacyGuide from "@/data/resources/guides/intimacy-connection-guide.json";
import youthGuide from "@/data/resources/guides/youthful-appearance-science.json";
import stemCellGuide from "@/data/resources/guides/stem-cell-treatment-for-healing-regeneration.json";
import hairMarkdown from "@/data/resources/content/hair-fall-roadmap.js";
import intimacyMarkdown from "@/data/resources/content/intimacy-connection-guide.js";
import youthMarkdown from "@/data/resources/content/youthful-appearance-science.js";
import stemCellMarkdown from "@/data/resources/content/stem-cell-treatment-for-healing-regeneration.js";
import { buildMetadata } from '@/lib/seo-helpers';
import { getBaseUrl } from "./domain-helpers";

const guideMap = {
  [hairGuide.slug]: { ...hairGuide, content: hairMarkdown },
  [intimacyGuide.slug]: { ...intimacyGuide, content: intimacyMarkdown },
  [youthGuide.slug]: { ...youthGuide, content: youthMarkdown },
  [stemCellGuide.slug]: { ...stemCellGuide, content: stemCellMarkdown },
};

function normalizeGuideCard(guide = {}) {
  if (!guide.slug) return null;

  return {
    slug: guide.slug,
    title: guide.title,
    category: guide.category || "Resource Guides",
    excerpt: guide.excerpt || guide.summary,
    estimatedRead: guide.estimatedRead || guide.readTime,
    updated: guide.updated || guide.lastUpdated,
    image: guide.image || guide.heroImage,
    keywords: guide.keywords || guide.seo?.keywords,
    cta: guide.cta || "Read guide",
    faqs: guide.faqs,
  };
}

export async function getResourcesOverview() {
  const existingGuides = (overviewData.guides || [])
    .map((guide) => {
      const fullGuide = guideMap[guide.slug];
      return normalizeGuideCard({
        ...guide,
        faqs: fullGuide?.faqs,
        summary: fullGuide?.summary,
        readTime: fullGuide?.readTime,
        heroImage: fullGuide?.heroImage,
      });
    })
    .filter(Boolean);

  const existingSlugs = new Set(existingGuides.map((guide) => guide.slug));
  const missingGuides = Object.values(guideMap)
    .filter((guide) => !existingSlugs.has(guide.slug))
    .map((guide) => normalizeGuideCard(guide))
    .filter(Boolean);

  return {
    ...overviewData,
    guides: [...existingGuides, ...missingGuides],
  };
}

export async function getResourceGuidesList() {
  const baseGuides = overviewData.guides || [];
  const baseSlugs = new Set(baseGuides.map((guide) => guide.slug));

  const missingGuides = Object.values(guideMap)
    .filter((guide) => !baseSlugs.has(guide.slug))
    .map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      updated: guide.lastUpdated,
    }));

  return [...baseGuides, ...missingGuides];
}

export async function getResourceGuide(slug) {
  return guideMap[slug];
}

export async function getAllResourcePaths() {
  return Object.values(guideMap).map((guide) => ({
    slug: guide.slug,
    updated: guide.lastUpdated,
  }));
}

/**
 * Generate metadata for Resources page using standardized helper
 */
export async function getResourcesMetadata() {
  const baseUrl = await getBaseUrl();
  return buildMetadata(overviewData, 'hero.image', 'Resources', baseUrl);
}
