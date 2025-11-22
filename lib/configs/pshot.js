/**
 * P-Shot Landing Page Configuration
 *
 * Defines the section order and block mappings for the P-Shot landing page.
 * Uses direct data passing without mappers where possible.
 */

export const pshotPageConfig = [
  {
    id: 'hero',
    block: 'hero.pshot',
    dataKey: 'hero'
  },
  {
    id: 'stats',
    block: 'block.stats',
    dataKey: 'stats',
    props: {
      padding: 'lg',
      background: 'default' // White background
    }
  },
  {
    id: 'doctorCredentials',
    block: 'specialty.doctor-credentials',
    dataKey: 'doctorCredentials',
    props: {
      background: 'gradient-cream' // Warm premium background
    }
  },
  {
    id: 'benefits',
    block: 'block.features-grid',
    dataKey: 'benefits',
    props: {
      padding: 'lg'
    }
  },
  {
    id: 'featuredTreatment',
    block: 'section.features',
    dataKey: 'featuredTreatment',
    condition: (data) => data.featuredTreatment?.benefits?.length > 0,
    mapper: (data) => ({
      badge: data.featuredTreatment.badge,
      title: data.featuredTreatment.title,
      subtitle: data.featuredTreatment.description,
      features: data.featuredTreatment.benefits,
    }),
    props: {
      variant: 'cards',
      layout: 'grid-2',
      background: 'muted'
    }
  },
  {
    id: 'process',
    block: 'block.timeline',
    dataKey: 'process',
    props: {
      background: 'default', // Alternating background for better flow
      padding: 'lg'
    }
  },
  {
    id: 'videoTestimonials',
    block: 'section.testimonials',
    dataKey: 'videoTestimonials',
    condition: (data) => (
      data.videoTestimonials &&
      Array.isArray(data.videoTestimonials) &&
      data.videoTestimonials.length > 0
    ),
    props: {
      variant: 'video',
      title: 'Real Patient Success Stories',
      subtitle: "Hear from men who've transformed their lives with the P-Shot",
      background: 'muted'
    }
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials',
    condition: (data) => (
      data.testimonials &&
      Array.isArray(data.testimonials) &&
      data.testimonials.length > 0
    ),
    props: {
      variant: 'text',
      title: 'What Our Patients Say',
      badge: 'Verified Reviews'
    }
  },
  {
    id: 'whyChoose',
    block: 'section.features',
    dataKey: 'whyChoose',
    props: { variant: 'default', layout: 'grid-2' }
  },
  {
    id: 'faq',
    block: 'block.faq',
    dataKey: 'faq',
    condition: (data) => (
      data.faq &&
      Array.isArray(data.faq) &&
      data.faq.length > 0
    ),
    props: {
      preset: 'pshot.faq',
      padding: 'lg'
    }
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta',
    props: { variant: 'default' }
  },
];
