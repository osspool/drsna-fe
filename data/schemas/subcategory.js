/**
 * Subcategory Page Data Schema
 *
 * Use this schema to generate subcategory page content.
 * Subcategories group treatments (e.g., Face, Body under Aesthetic Medicine).
 */

import { z } from 'zod';

const iconSchema = z.string().describe('Lucide icon name');

// Treatment card schema (embedded in subcategory)
const treatmentCardSchema = z.object({
  title: z.string(),
  shortDescription: z.string().describe('One-liner for cards'),
  description: z.string().describe('2-3 sentences'),
  image: z.string(),
  icon: iconSchema.optional(),
  duration: z.string().describe('e.g., "30-45 mins"'),
  downtime: z.string().describe('e.g., "Minimal", "None"'),
  results: z.string().describe('When results appear'),
  longevity: z.string().describe('How long results last'),
  price: z.string().describe('e.g., "From £450"'),
  benefits: z.array(z.string()).max(4),
  featured: z.boolean().optional(),
  popular: z.boolean().optional()
});

export const subcategorySchema = z.object({
  // Identity
  id: z.string().describe('URL slug (e.g., "face")'),
  categoryId: z.string().describe('Parent category'),
  title: z.string(),
  shortTitle: z.string().optional(),
  tagline: z.string(),
  description: z.string().describe('1-2 sentences'),
  longDescription: z.string().optional(),

  // SEO
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string().max(160),
    keywords: z.array(z.string()),
    h1: z.string().optional()
  }),

  // Hero
  hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    image: z.string().optional(),
    backgroundImage: z.string().optional(),
    cta: z.string().default('Discover Your Treatment')
  }),

  // Introduction
  introduction: z.object({
    title: z.string(),
    content: z.string().describe('2-3 paragraphs'),
    image: z.string().optional(),
    highlights: z.array(z.string()).max(5).describe('Bullet points')
  }),

  // Treatment categories (groupings within subcategory)
  treatmentCategories: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: iconSchema,
    treatments: z.array(z.string()).describe('Array of treatment IDs'),
    benefits: z.array(z.string()).max(4)
  })).optional(),

  // Treatments - object keyed by treatment ID
  treatments: z.record(z.string(), treatmentCardSchema).describe('Key is treatment slug'),

  // Benefits
  benefits: z.object({
    title: z.string(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: iconSchema
    })).max(6)
  }),

  // Process
  process: z.object({
    title: z.string(),
    steps: z.array(z.object({
      number: z.number(),
      title: z.string(),
      description: z.string(),
      icon: iconSchema.optional()
    })).max(5)
  }),

  // Before/After
  beforeAfter: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    note: z.string().default('Individual results may vary')
  }).optional(),

  // FAQ
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).max(8),

  // CTA
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    primaryButton: z.string().default('Book Consultation'),
    secondaryButton: z.string().optional(),
    note: z.string().optional()
  })
});

export default subcategorySchema;
