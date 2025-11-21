/**
 * Dr Abbas Profile Page Configuration
 *
 * Defines the section order and block mappings for Dr Abbas profile page.
 * Uses direct data passing without mappers.
 */

export const drAbbasPageConfig = [
  {
    id: 'hero',
    block: 'hero.landing-v1',
    dataKey: 'hero'
  },
  {
    id: 'quickStats',
    block: 'section.stats',
    dataKey: 'quickStats',
    props: { variant: 'cards' }
  },
  {
    id: 'overview',
    block: 'block.overview',
    dataKey: 'overview'
  },
  {
    id: 'doctorQuote',
    block: 'block.image-quote',
    dataKey: 'doctorQuote',
    condition: (data) => Boolean(data.doctorQuote)
  },
  {
    id: 'emotionalConnection',
    block: 'treatment.two-column-features',
    dataKey: 'emotionalConnection',
    condition: (data) => Boolean(data.emotionalConnection)
  },
  {
    id: 'treatsAreas',
    block: 'block.treatment-areas',
    dataKey: 'treatsAreas',
    condition: (data) => Array.isArray(data.treatsAreas?.areas) && data.treatsAreas.areas.length > 0
  },
  {
    id: 'safety',
    block: 'block.safety',
    dataKey: 'safety',
    condition: (data) => Array.isArray(data.safety?.certifications) && data.safety.certifications.length > 0
  },
  {
    id: 'whyChooseDrSNA',
    block: 'section.features',
    dataKey: 'whyChooseDrSNA',
    props: { variant: 'cards' }
  },
  {
    id: 'gallery',
    block: 'block.gallery',
    dataKey: 'gallery'
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
    props: { variant: 'text' }
  },
  {
    id: 'faq',
    block: 'section.faq',
    dataKey: 'faq',
    condition: (data) => (
      data.faq &&
      Array.isArray(data.faq) &&
      data.faq.length > 0
    )
  },
  {
    id: 'cta',
    block: 'section.cta',
    dataKey: 'cta'
  },
];
