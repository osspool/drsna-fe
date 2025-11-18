/**
 * Treatment Page Prop Mappers
 *
 * Transforms treatment data into component props.
 * Used by lib/sections/treatment.js
 */

export function mapStatsProps(treatment) {
  return {
    data: treatment.quickStats,
    variant: 'default'
  };
}

export function mapOverviewProps(treatment) {
  return {
    data: treatment.overview
  };
}

export function mapHowItWorksProps(treatment) {
  return {
    data: treatment.howItWorks
  };
}

export function mapWhyChooseProps(treatment) {
  return {
    data: treatment.whyChooseDrSNA,
    variant: 'cards'
  };
}

export function mapVideoProps(treatment) {
  return {
    data: treatment.video
  };
}

export function mapWhatToExpectProps(treatment) {
  return {
    data: treatment.whatToExpect,
    variant: treatment.whatToExpect?.variant || 'timeline'
  };
}

export function mapGalleryProps(treatment) {
  return {
    data: treatment.gallery
  };
}

export function mapTreatmentAreasProps(treatment) {
  return {
    data: treatment.treatsAreas
  };
}

export function mapBenefitsProps(treatment) {
  return {
    data: treatment.benefits,
    variant: 'default'
  };
}

export function mapProcessProps(treatment) {
  return {
    data: treatment.process,
    variant: 'detailed'
  };
}

export function mapBeforeAfterProps(treatment) {
  return {
    data: treatment.beforeAfter
  };
}

export function mapPricingProps(treatment) {
  return {
    data: treatment.pricing
  };
}

export function mapComparisonProps(treatment) {
  return {
    data: treatment.comparison
  };
}

export function mapCandidacyProps(treatment) {
  return {
    data: treatment.candidacy
  };
}

export function mapSafetyProps(treatment) {
  return {
    data: treatment.safety
  };
}

export function mapVideoTestimonialsProps(treatment) {
  return {
    data: treatment.videoTestimonials,
    variant: 'video-detailed'
  };
}

export function mapTestimonialsProps(treatment) {
  return {
    data: treatment.testimonials,
    variant: 'text'
  };
}

export function mapFaqProps(treatment) {
  return {
    data: treatment.faq?.slice(0, 6),
    variant: 'treatment'
  };
}
