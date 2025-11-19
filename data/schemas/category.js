/**
 * Category Page Data Schema
 *
 * Use this schema to generate category page content.
 * Categories are top-level groupings (e.g., Aesthetic Medicine, Intimate Health).
 */

import { z } from 'zod';

const iconSchema = z.string().describe('Lucide icon name');

export const categorySchema = z.object({
  // Identity
  id: z.string().describe('URL slug (e.g., "aesthetic-medicine")'),
  title: z.string(),
  shortTitle: z.string().optional().describe('For navigation'),
  tagline: z.string(),
  description: z.string().describe('1-2 sentences'),
  longDescription: z.string().optional().describe('2-3 paragraphs'),

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
    image: z.string(),
    video: z.string().optional(),
    cta: z.string().default('Explore Treatments'),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string()
    })).max(4).optional()
  }),

  // Introduction
  introduction: z.object({
    title: z.string(),
    content: z.string().describe('2-3 paragraphs'),
    highlights: z.array(z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    })).max(4).optional()
  }),

  // Subcategories list
  subcategories: z.array(z.object({
    id: z.string().describe('URL slug'),
    title: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    icon: iconSchema,
    image: z.string().optional(),
    treatmentCount: z.number().optional(),
    featured: z.boolean().optional()
  })),

  // Benefits
  benefits: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(z.object({
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
      duration: z.string().optional(),
      icon: iconSchema.optional()
    })).max(5)
  }),

  // Testimonials
  testimonials: z.array(z.object({
    name: z.string(),
    treatment: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    location: z.string().optional()
  })).max(3).optional(),

  // FAQ
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).max(6),

  // CTA
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    primaryButton: z.string().default('Book Consultation'),
    secondaryButton: z.string().optional(),
    phone: z.string().optional(),
    note: z.string().optional()
  })
});

export default categorySchema;
