/**
 * Condition Helpers for Config Files
 *
 * Standardized functions for checking if sections should render.
 * Use these in config `condition` functions for consistency.
 */

/**
 * Check if value is a non-empty array
 *
 * @param {*} value - Value to check
 * @returns {boolean} True if array with items
 */
export function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Check if object is enabled (not explicitly disabled)
 *
 * @param {Object} obj - Object with optional `enabled` property
 * @returns {boolean} True if enabled !== false
 */
export function isEnabled(obj) {
  return obj && obj.enabled !== false;
}

/**
 * Check if value exists and is truthy
 *
 * @param {*} value - Value to check
 * @returns {boolean} True if value exists
 */
export function exists(value) {
  return Boolean(value);
}

/**
 * Check nested path for items
 *
 * @param {Object} data - Data object
 * @param {string} path - Dot-separated path (e.g., 'faq.items')
 * @returns {boolean} True if path leads to non-empty array
 */
export function hasItemsAtPath(data, path) {
  const value = path.split('.').reduce((obj, key) => obj?.[key], data);
  return hasItems(value);
}
