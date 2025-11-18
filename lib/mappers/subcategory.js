/**
 * Subcategory Page Prop Mappers
 *
 * Pure functions that transform subcategory page data into component props.
 */

/**
 * CategoryHero component props for subcategory variant
 */
export function mapSubcategoryHeroProps(data, params) {
  return {
    data: data.subcategoryData,
    variant: "subcategory",
    breadcrumb: {
      categoryId: params.category,
      categoryName: data.categoryName
    }
  };
}

/**
 * SubcategoryIntro component props
 */
export function mapSubcategoryIntroProps(data) {
  return {
    data: data.subcategoryData.introduction,
    title: data.subcategoryData.title
  };
}

/**
 * TreatmentHighlightGrid component props for featured treatments
 */
export function mapFeaturedTreatmentsProps(data, params) {
  return {
    treatments: data.featuredTreatments,
    categoryId: params.category,
    subcategoryId: params.subcategory,
    title: "Most Popular Treatments",
    badgeText: "Popular"
  };
}

/**
 * SubcategoryTreatmentGrid component props
 */
export function mapTreatmentGridProps(data, params) {
  return {
    treatments: data.treatmentsArray,
    categoryId: params.category,
    subcategoryId: params.subcategory,
    title: data.subcategoryData.title
  };
}

/**
 * FeaturesSection component props for benefits
 */
export function mapBenefitsProps(data) {
  return {
    data: data.subcategoryData.benefits,
    variant: "compact"
  };
}

/**
 * ProcessTimeline component props
 */
export function mapProcessProps(data) {
  return {
    data: data.subcategoryData.process,
    variant: "vertical"
  };
}

/**
 * FAQSection component props
 */
export function mapFAQProps(data) {
  return {
    data: data.subcategoryData.faq,
    variant: "default"
  };
}

/**
 * CTASection component props
 */
export function mapCTAProps(data) {
  return {
    data: data.subcategoryData.cta,
    variant: "default"
  };
}
