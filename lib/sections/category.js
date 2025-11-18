/**
 * Category Page Sections Configuration
 *
 * Config-driven rendering for category pages.
 * Each section defines component, data key, and props transformer.
 */

import { CategoryHero } from "@/components/heroes/treatments/CategoryHero";
import TwoColumnTextFeaturesImage from "@/components/custom/ui/blocks/TwoColumnTextFeaturesImage";
import { CategoryIntro } from "@/components/sections/category/CategoryIntro";
import { SubcategoryGrid } from "@/components/treatments/SubcategoryGrid";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { CategoryTestimonials } from "@/components/sections/category/CategoryTestimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import * as mappers from "@/lib/mappers/category";

/**
 * Category page sections in display order
 * Each section will be rendered conditionally based on data availability
 */
export const categorySections = [
  {
    id: 'hero',
    component: CategoryHero,
    dataKey: 'hero',
    props: mappers.mapCategoryHeroProps
  },
  {
    id: 'featured',
    component: TwoColumnTextFeaturesImage,
    dataKey: 'featured',
    props: mappers.mapCategoryFeaturedProps
  },
  {
    id: 'introduction',
    component: CategoryIntro,
    dataKey: 'introduction',
    props: mappers.mapCategoryIntroProps
  },
  {
    id: 'subcategories',
    component: SubcategoryGrid,
    dataKey: 'subcategories',
    condition: (categoryData) => (
      categoryData.subcategories &&
      Array.isArray(categoryData.subcategories) &&
      categoryData.subcategories.length > 0
    ),
    props: mappers.mapCategorySubcategoriesProps
  },
  {
    id: 'benefits',
    component: FeaturesSection,
    dataKey: 'benefits',
    props: mappers.mapCategoryBenefitsProps
  },
  {
    id: 'process',
    component: ProcessTimeline,
    dataKey: 'process',
    props: mappers.mapCategoryProcessProps
  },
  {
    id: 'testimonials',
    component: CategoryTestimonials,
    dataKey: 'testimonials',
    condition: (categoryData) => (
      categoryData.testimonials &&
      Array.isArray(categoryData.testimonials) &&
      categoryData.testimonials.length > 0
    ),
    props: mappers.mapCategoryTestimonialsProps
  },
  {
    id: 'faq',
    component: FAQSection,
    dataKey: 'faq',
    condition: (categoryData) => (
      categoryData.faq &&
      Array.isArray(categoryData.faq) &&
      categoryData.faq.length > 0
    ),
    props: mappers.mapCategoryFaqProps
  },
  {
    id: 'cta',
    component: CTASection,
    dataKey: 'cta',
    props: mappers.mapCategoryCtaProps
  }
];
