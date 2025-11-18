/**
 * Home Page Prop Mappers
 *
 * Transforms home page data into component props.
 * Used by lib/sections/home.js
 */

export function mapHomeHeroProps(homeData) {
  return {
    data: homeData?.hero
  };
}

export function mapHomeAwardSpotlightProps(homeData) {
  return {
    data: homeData?.awardSpotlight
  };
}

export function mapHomeTreatmentBentoProps(homeData) {
  return {
    data: homeData?.treatmentBento
  };
}

export function mapHomeFeaturedTreatmentsProps(homeData) {
  return {
    data: homeData?.featuredTreatments
  };
}

export function mapHomeClinicShowcaseProps(homeData) {
  return {
    data: homeData?.clinicShowcase
  };
}

export function mapHomePShotFeaturedProps(homeData) {
  return {
    data: homeData?.pshotFeatured
  };
}

export function mapHomeGlobalReachProps(homeData) {
  return {
    data: homeData?.globalReach
  };
}

export function mapHomeTestimonialsProps(homeData) {
  const testimonialsData = homeData?.testimonials;
  return {
    variant: testimonialsData?.variant || 'video',
    data: testimonialsData,
    title: testimonialsData?.title,
    subtitle: testimonialsData?.subtitle,
    badge: testimonialsData?.badge
  };
}

export function mapHomeFaqProps(homeData) {
  const faqData = homeData?.faq;
  return {
    data: faqData?.items,
    variant: faqData?.variant || 'with-icons',
    title: faqData?.title,
    subtitle: faqData?.subtitle,
    badge: faqData?.badge
  };
}

export function mapHomeRegulatoryProps(homeData) {
  return {
    data: homeData?.regulatory
  };
}

export function mapHomeCtaProps(homeData) {
  return {
    data: homeData?.cta,
    variant: homeData?.cta?.variant || 'contact'
  };
}
