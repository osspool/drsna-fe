/**
 * Data Schemas for Content Generation
 *
 * Share these schemas with AI to generate properly structured content.
 *
 * Usage:
 * ```javascript
 * import { treatmentSchema, categorySchema, homeSchema } from '@/data/schemas';
 *
 * // Validate data
 * const result = treatmentSchema.safeParse(myData);
 * if (!result.success) {
 *   console.error(result.error);
 * }
 * ```
 */

// Core page schemas
export { treatmentSchema } from './treatment';
export { categorySchema } from './category';
export { subcategorySchema } from './subcategory';

// Specialty page schemas
export { homeSchema } from './home';
export { pshotSchema } from './pshot';
export { doctorProfileSchema } from './doctor-profile';
