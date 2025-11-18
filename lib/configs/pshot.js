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
    block: 'section.stats',
    dataKey: 'stats',
    props: { variant: 'highlight', title: 'P-Shot By The Numbers' }
  },
  {
    id: 'doctorCredentials',
    block: 'specialty.doctor-credentials',
    dataKey: 'doctorCredentials'
  },
  {
    id: 'benefits',
    block: 'section.features',
    dataKey: 'benefits',
    props: { variant: 'cards', layout: 'grid-3' }
  },
  {
    id: 'process',
    block: 'treatment.process-timeline',
    dataKey: 'process',
    props: { variant: 'detailed' }
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
    block: 'section.faq',
    dataKey: 'faq',
    condition: (data) => (
      data.faq &&
      Array.isArray(data.faq) &&
      data.faq.length > 0
    ),
    props: {
      variant: 'with-icons',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about the P-Shot treatment'
    }
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta',
    props: { variant: 'default' }
  },
];
