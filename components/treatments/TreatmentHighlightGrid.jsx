import { FeaturedGrid } from "@/components/common/FeaturedGrid";

/**
 * Treatment Highlight Grid Component
 *
 * Displays individual treatments in a featured grid layout.
 * Now uses the unified FeaturedGrid component with variant="treatment".
 * Can be used across different pages (subcategory, category, home, etc.)
 *
 * @param {Object[]} treatments - Array of treatment objects
 * @param {string} treatments[].id - Treatment ID
 * @param {string} treatments[].title - Treatment title
 * @param {string} treatments[].shortDescription - Short description
 * @param {string} treatments[].price - Treatment price (optional)
 * @param {string} categoryId - Category ID for URL
 * @param {string} subcategoryId - Subcategory ID for URL
 * @param {string} title - Section title (default: "Most Popular Treatments")
 * @param {string} titleIcon - Icon name for title (default: "sparkles")
 * @param {string} badgeText - Text for treatment badge (default: "Popular")
 * @param {string} background - Section background variant (default: "gradient-cream")
 * @param {number} maxItems - Maximum items to show (default: 3)
 */
export function TreatmentHighlightGrid({
  treatments,
  categoryId,
  subcategoryId,
  title = "Most Popular Treatments",
  titleIcon = "sparkles",
  badgeText = "Popular",
  background = "gradient-cream",
  maxItems = 3
}) {
  if (!treatments || treatments.length === 0) return null;

  // Add badge to each treatment item for the grid
  const itemsWithBadge = treatments.map(treatment => ({
    ...treatment,
    badge: badgeText
  }));

  return (
    <FeaturedGrid
      variant="treatment"
      items={itemsWithBadge}
      header={{
        title,
        titleIcon
      }}
      background={background}
      padding="lg"
      maxItems={maxItems}
      categoryId={categoryId}
      subcategoryId={subcategoryId}
    />
  );
}
