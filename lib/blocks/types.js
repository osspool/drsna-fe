/**
 * Block Type Definitions
 *
 * JSDoc type definitions for all block props.
 * These serve as lightweight schemas for validation and documentation.
 * Can be used by SectionRenderer to validate props in development.
 */

/**
 * @typedef {Object} HeroData
 * @property {string} title - Main title
 * @property {string} [description] - Description text
 * @property {string} [backgroundImage] - Background image URL
 * @property {Array<{value: string, label: string}>} [stats] - Stats to display
 * @property {Object} [cta] - Call-to-action button
 * @property {string} cta.text - Button text
 * @property {string} cta.href - Button link
 */

/**
 * @typedef {Object} CTAData
 * @property {string} [title] - Section title
 * @property {string} [subtitle] - Subtitle text
 * @property {string} [buttonText] - Primary button text
 * @property {string} [buttonHref] - Primary button link
 * @property {string} [secondaryText] - Secondary button text
 * @property {string} [secondaryHref] - Secondary button link
 * @property {'default'|'gradient'|'dark'} [variant] - Style variant
 */

/**
 * @typedef {Object} FeaturesData
 * @property {string} [badge] - Section badge
 * @property {string} title - Section title
 * @property {string} [subtitle] - Section subtitle
 * @property {Array<FeatureItem>} features - Feature items
 * @property {'default'|'grid'|'compact'} [variant] - Layout variant
 */

/**
 * @typedef {Object} FeatureItem
 * @property {string} icon - Icon name (kebab-case)
 * @property {string} title - Feature title
 * @property {string} description - Feature description
 */

/**
 * @typedef {Object} TestimonialsData
 * @property {string} [badge] - Section badge
 * @property {string} [title] - Section title
 * @property {Array<Testimonial>} testimonials - Testimonial items
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} text - Testimonial text
 * @property {string} name - Author name
 * @property {string} [role] - Author role/title
 * @property {string} [image] - Author image URL
 * @property {number} [rating] - Rating (1-5)
 */

/**
 * @typedef {Object} FAQData
 * @property {string} [badge] - Section badge
 * @property {string} [title] - Section title
 * @property {Array<FAQItem>} faqs - FAQ items
 * @property {'default'|'accordion'} [variant] - Display variant
 */

/**
 * @typedef {Object} FAQItem
 * @property {string} question - Question text
 * @property {string} answer - Answer text
 */

/**
 * @typedef {Object} GalleryData
 * @property {string} [title] - Section title
 * @property {Array<GalleryImage>} images - Gallery images
 * @property {number} [columns] - Number of columns (2-4)
 */

/**
 * @typedef {Object} GalleryImage
 * @property {string} src - Image URL
 * @property {string} alt - Alt text
 * @property {string} [caption] - Image caption
 */

/**
 * @typedef {Object} OverviewData
 * @property {string} title - Section title
 * @property {string} content - Main content (supports \n\n for paragraphs)
 * @property {string} [image] - Side image URL
 * @property {Array<string>} [highlights] - Highlight bullet points
 */

/**
 * @typedef {Object} PricingData
 * @property {string} [title] - Section title
 * @property {Object} [singlePrice] - Single price display
 * @property {string} singlePrice.currentPrice - Current price
 * @property {string} [singlePrice.originalPrice] - Original price (for discounts)
 * @property {string} [singlePrice.currency] - Currency code
 * @property {Array<PricingPackage>} [packages] - Multiple pricing packages
 */

/**
 * @typedef {Object} PricingPackage
 * @property {string} name - Package name
 * @property {string} price - Package price
 * @property {Array<string>} features - Included features
 * @property {boolean} [popular] - Mark as popular
 */

/**
 * @typedef {Object} ProcessData
 * @property {string} [title] - Section title
 * @property {string} [subtitle] - Section subtitle
 * @property {Array<ProcessStep>} steps - Process steps
 */

/**
 * @typedef {Object} ProcessStep
 * @property {string} title - Step title
 * @property {string} description - Step description
 * @property {string} [icon] - Step icon
 * @property {string} [image] - Step image
 */

/**
 * @typedef {Object} TreatmentAreasData
 * @property {string} title - Section title
 * @property {string} [subtitle] - Section subtitle
 * @property {Array<TreatmentArea>} areas - Treatment areas
 */

/**
 * @typedef {Object} TreatmentArea
 * @property {string} name - Area name
 * @property {string} description - Area description
 * @property {string} [image] - Area image
 * @property {string} [icon] - Area icon
 * @property {string} [price] - Price text
 * @property {string} [duration] - Duration text
 */

/**
 * @typedef {Object} ContactInfoData
 * @property {Array<ContactCard>} cards - Contact info cards
 */

/**
 * @typedef {Object} ContactCard
 * @property {string} icon - Card icon
 * @property {string} title - Card title
 * @property {Array<string>} details - Detail lines
 * @property {string} action - Action button text
 * @property {string} actionLink - Action button link
 */

/**
 * Block schema registry for runtime validation
 */
export const blockSchemas = {
  'hero.category': ['title'],
  'hero.treatment': ['title'],
  'section.features': ['title', 'features'],
  'section.testimonials': ['testimonials'],
  'section.faq': ['faqs'],
  'section.cta': [],
  'block.overview': ['title', 'content'],
  'block.gallery': ['images'],
  'block.pricing': [],
  'block.treatment-areas': ['title', 'areas'],
  'contact.info-cards': ['cards'],
};

/**
 * Validate block props in development
 *
 * @param {string} blockId - Block registry ID
 * @param {Object} props - Props to validate
 * @param {Array<string>} [requiredOverride] - Optional override required fields (from block spec)
 * @returns {boolean} - Whether props are valid
 */
export function validateBlockProps(blockId, props, requiredOverride) {
  if (process.env.NODE_ENV !== 'development') return true;

  const requiredFields = requiredOverride || blockSchemas[blockId];
  if (!requiredFields) return true;

  const data = props.data || props;
  const missing = requiredFields.filter(field => !data[field]);

  if (missing.length > 0) {
    console.warn(
      `[Block Validation] ${blockId} missing required fields:`,
      missing.join(', ')
    );
    return false;
  }

  return true;
}
