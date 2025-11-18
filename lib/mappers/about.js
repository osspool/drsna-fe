/**
 * About Page Prop Mappers
 *
 * Pure functions that transform about page data into component props.
 * Maps data to existing visual blocks for consistency.
 */

/**
 * CategoryHero component props
 */
export function mapHeroProps(data) {
  return {
    data: data.hero,
    variant: "category",
    showStats: true
  };
}

/**
 * OverviewBlock component props
 */
export function mapIntroductionProps(data) {
  return {
    data: data.introduction
  };
}

/**
 * AwardSpotlightSection component props for mission
 */
export function mapMissionProps(data) {
  return {
    data: data.mission
  };
}

/**
 * AwardSpotlightSection component props for story
 */
export function mapStoryProps(data) {
  return {
    data: data.story
  };
}

/**
 * TeamSection component props
 */
export function mapTeamProps(data) {
  return {
    data: data.team
  };
}

/**
 * ClinicShowcaseSection component props
 */
export function mapClinicShowcaseProps(data) {
  return {
    data: data.clinicShowcase
  };
}

/**
 * ExpertiseBlock component props
 */
export function mapExpertiseProps(data) {
  return {
    data: data.expertise
  };
}

/**
 * GalleryBlock component props
 */
export function mapServicesProps(data) {
  return {
    data: {
      title: data.services.title,
      subtitle: data.services.subtitle,
      items: data.services.list.map(service => ({
        title: service.name,
        description: service.description,
        image: service.image,
        tags: service.idealFor || service.designedFor || []
      }))
    }
  };
}

/**
 * WhyChooseSection component props
 */
export function mapWhyChooseProps(data) {
  return {
    data: data.whyChoose
  };
}

/**
 * TestimonialsSection component props
 */
export function mapTestimonialsProps(data) {
  return {
    data: data.testimonials
  };
}

/**
 * FAQSection component props
 */
export function mapFAQProps(data) {
  return {
    data: data.faq.items,
    title: data.faq.title
  };
}

/**
 * CTASection component props
 */
export function mapCTAProps(data) {
  return {
    data: data.cta
  };
}
