/**
 * Category Page Prop Mappers
 *
 * Transforms category page data into component props.
 * Used by lib/sections/category.js
 */

export function mapCategoryHeroProps(categoryData) {
  return {
    data: categoryData,
    showStats: true
  };
}

export function mapCategoryFeaturedProps(categoryData) {
  return {
    data: categoryData?.featured
  };
}

export function mapCategoryIntroProps(categoryData) {
  return {
    data: categoryData?.introduction
  };
}

export function mapCategorySubcategoriesProps(categoryData) {
  return {
    subcategories: categoryData?.subcategories,
    categoryId: categoryData?._categoryId
  };
}

export function mapCategoryBenefitsProps(categoryData) {
  return {
    data: categoryData?.benefits,
    variant: 'compact'
  };
}

export function mapCategoryProcessProps(categoryData) {
  return {
    data: categoryData?.process,
    variant: 'default'
  };
}

export function mapCategoryTestimonialsProps(categoryData) {
  return {
    testimonials: categoryData?.testimonials
  };
}

export function mapCategoryFaqProps(categoryData) {
  return {
    data: categoryData?.faq,
    variant: 'default'
  };
}

export function mapCategoryCtaProps(categoryData) {
  return {
    data: categoryData?.cta,
    variant: 'default'
  };
}
