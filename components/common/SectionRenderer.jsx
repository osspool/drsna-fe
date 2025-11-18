import { getBlock } from "@/lib/blocks/registry";

/**
 * Generic Section Renderer Component
 *
 * Universal renderer for section registries across all page types.
 * Supports custom condition functions, nested dataKey checking, and central block registry.
 *
 * @param {Object} props
 * @param {Array} props.sections - Section config array with block IDs and mappers
 * @param {Object} props.data - Page data object
 * @param {Function} props.shouldRender - Optional custom shouldRender function
 */
export function SectionRenderer({ sections, data, shouldRender }) {
  if (!sections || !data) return null;

  // Use custom shouldRender if provided, otherwise use default
  const renderCheck = shouldRender || shouldRenderSection;

  return (
    <>
      {sections.map((section) => {
        // Check if section should render
        if (!renderCheck(data, section)) {
          return null;
        }

        // Get component from registry
        const Component = getBlock(section.block);

        if (!Component) {
          console.warn(`Section "${section.id}" has no valid block reference: "${section.block}"`);
          return null;
        }

        // Get props from mapper
        const props = section.mapper ? section.mapper(data) : {};

        // Render component with key for React reconciliation
        return <Component key={section.id} {...props} />;
      })}
    </>
  );
}

/**
 * Default shouldRender implementation
 * Checks dataKey and custom conditions, treats empty arrays/objects as falsy
 */
function shouldRenderSection(data, section) {
  // Use custom condition if provided
  if (section.condition) {
    return section.condition(data);
  }

  // Check dataKey (supports nested keys like 'faq.items')
  if (section.dataKey) {
    const value = section.dataKey
      .split('.')
      .reduce((obj, key) => obj?.[key], data);

    // Treat empty arrays and objects as falsy
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (value && typeof value === 'object') {
      return Object.keys(value).length > 0;
    }

    return Boolean(value);
  }

  return true;
}
