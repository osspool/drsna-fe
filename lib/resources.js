import overviewData from "@/data/resources/index.json";
import hairGuide from "@/data/resources/guides/hair-fall-roadmap.json";
import intimacyGuide from "@/data/resources/guides/intimacy-connection-guide.json";
import youthGuide from "@/data/resources/guides/youthful-appearance-science.json";
import hairMarkdown from "@/data/resources/content/hair-fall-roadmap.js";
import intimacyMarkdown from "@/data/resources/content/intimacy-connection-guide.js";
import youthMarkdown from "@/data/resources/content/youthful-appearance-science.js";
import { buildMetadata } from '@/lib/seo-helpers';
import { getBaseUrl } from "./domain-helpers";

const guideMap = {
  [hairGuide.slug]: { ...hairGuide, content: hairMarkdown },
  [intimacyGuide.slug]: { ...intimacyGuide, content: intimacyMarkdown },
  [youthGuide.slug]: { ...youthGuide, content: youthMarkdown },
};

export async function getResourcesOverview() {
  return overviewData;
}

export async function getResourceGuidesList() {
  return overviewData.guides;
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
