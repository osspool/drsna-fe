/**
 * Treatment Detail Page Configuration
 *
 * Config-driven rendering for treatment detail pages.
 * Uses direct data passing where possible (no mappers needed).
 *
 * Config format:
 * - id: Unique identifier
 * - block: Block ID from registry
 * - dataKey: Path to data (e.g., 'overview', 'whatToExpect')
 * - props: Additional static props (e.g., { variant: 'cards' })
 * - condition: Optional custom condition function
 * - mapper: Only for special cases that need data transformation
 */

/**
 * Treatment detail page sections in display order
 */
export const treatmentDetailPageConfig = [
  {
    id: 'hero',
    block: 'hero.treatment',
    dataKey: 'hero',
    // Hero expects treatment and params directly, not wrapped in data
    mapper: (treatment) => ({
      treatment: treatment,
      params: treatment._params
    })
  },
  {
    id: 'quickStats',
    block: 'section.stats',
    dataKey: 'quickStats',
    props: { variant: 'default' }
  },
  {
    id: 'overview',
    block: 'block.overview',
    dataKey: 'overview'
  },
  {
    id: 'howItWorks',
    block: 'block.how-it-works',
    dataKey: 'howItWorks'
  },
  {
    id: 'whyChooseDrSNA',
    block: 'section.features',
    dataKey: 'whyChooseDrSNA',
    condition: (treatment) => treatment.whyChooseDrSNA?.enabled,
    props: { variant: 'cards' }
  },
  {
    id: 'video',
    block: 'block.video',
    dataKey: 'video',
    condition: (treatment) => treatment.video?.enabled
  },
  {
    id: 'whatToExpect',
    block: 'treatment.process-timeline',
    dataKey: 'whatToExpect',
    condition: (treatment) => treatment.whatToExpect?.enabled
  },
  {
    id: 'gallery',
    block: 'block.gallery',
    dataKey: 'gallery'
  },
  {
    id: 'treatmentAreas',
    block: 'block.treatment-areas',
    dataKey: 'treatsAreas'
  },
  {
    id: 'benefits',
    block: 'section.features',
    dataKey: 'benefits',
    props: { variant: 'default' }
  },
  {
    id: 'process',
    block: 'treatment.process-timeline',
    dataKey: 'process',
    props: { variant: 'detailed' }
  },
  {
    id: 'beforeAfter',
    block: 'block.before-after',
    dataKey: 'beforeAfter',
    condition: (treatment) => treatment.beforeAfter?.enabled
  },
  {
    id: 'pricing',
    block: 'block.pricing',
    dataKey: 'pricing'
  },
  {
    id: 'comparison',
    block: 'block.comparison',
    dataKey: 'comparison'
  },
  {
    id: 'candidacy',
    block: 'block.candidacy',
    dataKey: 'candidacy'
  },
  {
    id: 'safety',
    block: 'block.safety',
    dataKey: 'safety'
  },
  {
    id: 'videoTestimonials',
    block: 'section.testimonials',
    dataKey: 'videoTestimonials',
    condition: (treatment) => treatment.videoTestimonials?.enabled,
    props: { variant: 'video-detailed' }
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials',
    condition: (treatment) => (
      treatment.testimonials &&
      Array.isArray(treatment.testimonials) &&
      treatment.testimonials.length > 0 &&
      treatment.testimonials.length <= 3
    ),
    props: { variant: 'text' }
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq',
    condition: (treatment) => treatment.faq && treatment.faq.length > 0,
    props: { variant: 'treatment' }
  },
  {
    id: 'relatedTreatments',
    block: 'treatment.related',
    dataKey: 'relatedTreatments',
    condition: (treatment) => treatment.relatedTreatments && treatment.relatedTreatments.length > 0,
    // RelatedTreatments expects specific props, not data wrapper
    mapper: (treatment) => ({
      treatments: treatment.relatedTreatments,
      categoryId: treatment._params?.category,
      subcategoryId: treatment._params?.subcategory
    })
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta',
    props: { variant: 'treatment' }
  }
];
