/**
 * Treatment Page Data Schema
 *
 * Use this schema to generate treatment page content.
 * Each treatment has sections that can be enabled/disabled.
 */

import { z } from 'zod';

// Reusable schemas
const iconSchema = z.string().describe('Lucide icon name (e.g., "sparkles", "heart", "shield")');

const ctaSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  primaryButton: z.string().default('Book Consultation'),
  secondaryButton: z.string().optional(),
  urgency: z.string().optional().describe('Limited time offer text'),
  guarantee: z.string().optional()
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string()
});

const testimonialSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
  treatment: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
  date: z.string().optional(),
  verified: z.boolean().default(true),
  location: z.string().optional()
});

// Main treatment schema
export const treatmentSchema = z.object({
  // Identity
  id: z.string().describe('URL slug (e.g., "prp-facelift")'),
  categoryId: z.string().describe('Parent category (e.g., "aesthetic-medicine")'),
  subcategoryId: z.string().describe('Subcategory (e.g., "face")'),
  title: z.string(),
  shortTitle: z.string().optional(),
  tagline: z.string().describe('Short catchy phrase'),
  description: z.string().describe('1-2 sentence overview'),
  longDescription: z.string().optional().describe('2-3 paragraphs'),

  // SEO
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string().max(160),
    keywords: z.array(z.string()),
    h1: z.string().optional()
  }),

  // Hero section
  hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    image: z.string().describe('Image URL'),
    video: z.string().optional(),
    badge: z.string().optional().describe('e.g., "Most Popular"')
  }),

  // Quick stats bar
  quickStats: z.object({
    duration: z.string().describe('e.g., "30-45 mins"'),
    anesthesia: z.string().optional(),
    downtime: z.string().describe('e.g., "None", "1-2 days"'),
    resultsVisible: z.string().describe('e.g., "Immediate", "2-4 weeks"'),
    resultsLast: z.string().describe('e.g., "6-12 months"'),
    painLevel: z.string().optional(),
    price: z.string().describe('e.g., "From £450"'),
    sessions: z.string().optional()
  }),

  // Overview/intro section
  overview: z.object({
    title: z.string(),
    content: z.string().describe('2-3 paragraphs explaining the treatment'),
    image: z.string().optional(),
    highlights: z.array(z.string()).max(5).describe('Key points as bullet list')
  }),

  // How it works - science/mechanism
  howItWorks: z.object({
    enabled: z.boolean().default(true),
    title: z.string(),
    subtitle: z.string().optional(),
    content: z.string().describe('Scientific explanation'),
    benefits: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: iconSchema
    })).max(6),
    growthFactors: z.array(z.string()).optional().describe('For PRP treatments')
  }).optional(),

  // Benefits section
  benefits: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: iconSchema
    })).max(6)
  }),

  // Treatment process/journey
  process: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    steps: z.array(z.object({
      number: z.number(),
      title: z.string(),
      description: z.string(),
      duration: z.string().optional(),
      icon: iconSchema.optional()
    })).max(6)
  }),

  // Candidacy - who is/isn't suitable
  candidacy: z.object({
    title: z.string().default('Am I a Good Candidate?'),
    suitable: z.array(z.string()).describe('Who should consider this'),
    notSuitable: z.array(z.string()).describe('Contraindications'),
    note: z.string().optional()
  }).optional(),

  // Pricing
  pricing: z.object({
    title: z.string().default('Investment in Your Results'),
    subtitle: z.string().optional(),
    disclaimer: z.string().optional(),
    singlePrice: z.object({
      currentPrice: z.string(),
      originalPrice: z.string().optional(),
      consultationFee: z.string().optional(),
      consultationNote: z.string().optional()
    }).optional(),
    packages: z.array(z.object({
      name: z.string(),
      price: z.string(),
      description: z.string().optional(),
      includes: z.string().optional(),
      popular: z.boolean().optional(),
      savings: z.string().optional()
    })).optional(),
    includes: z.array(z.string()).optional().describe('Whats included'),
    financing: z.object({
      available: z.boolean(),
      buttonText: z.string().optional()
    }).optional()
  }).optional(),

  // Before/After gallery
  beforeAfter: z.object({
    enabled: z.boolean().default(true),
    title: z.string().default('Real Results'),
    subtitle: z.string().optional(),
    disclaimer: z.string().default('Individual results may vary'),
    gallery: z.array(z.object({
      id: z.string(),
      title: z.string(),
      before: z.string().describe('Before image URL'),
      after: z.string().describe('After image URL'),
      description: z.string().optional(),
      area: z.string().optional()
    }))
  }).optional(),

  // Comparison with alternatives
  comparison: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    comparisons: z.array(z.object({
      treatment: z.string(),
      naturalness: z.string(),
      results: z.string(),
      downtime: z.string(),
      cost: z.string(),
      duration: z.string()
    }))
  }).optional(),

  // Testimonials
  testimonials: z.array(testimonialSchema).max(5).optional(),

  // FAQ
  faq: z.array(faqItemSchema).max(8),

  // Related treatments
  relatedTreatments: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    reason: z.string().describe('Why its related')
  })).max(4).optional(),

  // CTA
  cta: ctaSchema
});

export default treatmentSchema;
