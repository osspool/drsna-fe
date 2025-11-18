/**
 * Profile Page Prop Mappers
 *
 * Transforms profile page data into component props.
 * Used by lib/sections/profile.js
 */

// =================
// DR ABBAS MAPPERS
// =================

export function mapProfileHeroProps(profileData) {
  return profileData?.hero || {};
}

export function mapProfileStatsProps(profileData) {
  return {
    data: profileData?.quickStats,
    variant: 'cards'
  };
}

export function mapProfileOverviewProps(profileData) {
  return {
    data: profileData?.overview
  };
}

export function mapProfileWhyChooseProps(profileData) {
  return {
    data: profileData?.whyChooseDrSNA,
    variant: 'cards'
  };
}

export function mapProfileGalleryProps(profileData) {
  return {
    data: profileData?.gallery
  };
}

export function mapProfileTestimonialsProps(profileData) {
  return {
    data: profileData?.testimonials,
    variant: 'text'
  };
}

export function mapProfileFaqProps(profileData) {
  return {
    data: profileData?.faq,
    title: profileData?.faqTitle
  };
}

export function mapProfileCtaProps(profileData) {
  return {
    data: profileData?.cta
  };
}

// ===============
// P-SHOT MAPPERS
// ===============

export function mapPShotHeroProps(pshotData) {
  return {
    data: pshotData?.hero
  };
}

export function mapPShotStatsProps(pshotData) {
  return {
    data: pshotData?.stats,
    variant: 'highlight',
    title: 'P-Shot By The Numbers'
  };
}

export function mapPShotCredentialsProps(pshotData) {
  return {
    data: pshotData?.doctorCredentials
  };
}

export function mapPShotBenefitsProps(pshotData) {
  const benefitsData = pshotData?.benefits;
  return {
    data: {
      title: benefitsData?.title,
      subtitle: benefitsData?.subtitle,
      features: benefitsData?.items?.map(item => ({
        title: item.title,
        description: item.description,
        icon: item.icon
      }))
    },
    variant: 'cards',
    layout: 'grid-3',
    background: 'muted'
  };
}

export function mapPShotProcessProps(pshotData) {
  const processData = pshotData?.process;
  return {
    data: {
      title: processData?.title,
      subtitle: processData?.subtitle,
      steps: processData?.steps?.map(step => ({
        title: step.title,
        description: step.description,
        duration: step.duration
      }))
    },
    variant: 'detailed'
  };
}

export function mapPShotVideoTestimonialsProps(pshotData) {
  return {
    variant: 'video',
    data: pshotData?.videoTestimonials,
    title: 'Real Patient Success Stories',
    subtitle: 'Hear from men who\'ve transformed their lives with the P-Shot',
    background: 'muted'
  };
}

export function mapPShotTestimonialsProps(pshotData) {
  return {
    variant: 'text',
    data: pshotData?.testimonials,
    title: 'What Our Patients Say',
    badge: 'Verified Reviews'
  };
}

export function mapPShotWhyChooseProps(pshotData) {
  const whyChooseData = pshotData?.whyChoose;
  return {
    data: {
      title: whyChooseData?.title,
      subtitle: whyChooseData?.subtitle,
      features: whyChooseData?.features?.map(feature => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon
      }))
    },
    variant: 'default',
    layout: 'grid-2',
    background: 'muted'
  };
}

export function mapPShotFaqProps(pshotData) {
  return {
    data: pshotData?.faq,
    variant: 'with-icons',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the P-Shot treatment'
  };
}

export function mapPShotCtaProps(pshotData) {
  return {
    data: pshotData?.cta,
    variant: 'default'
  };
}
