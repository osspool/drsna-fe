import { getBlock, getBlockSpec } from "@/lib/blocks/registry";
import { validateBlockProps } from "@/lib/blocks/types";

const isPromiseLike = (value) => value && typeof value === 'object' && typeof value.then === 'function';

async function resolveSectionData(value) {
  if (!value) return value;
  if (typeof value === 'function') {
    const result = value();
    return isPromiseLike(result) ? await result : result;
  }
  if (isPromiseLike(value)) {
    return await value;
  }
  return value;
}

/**
 * Generic Section Renderer Component
 *
 * Universal renderer for section registries across all page types.
 * Supports direct data passing (no mappers needed) or legacy mapper functions.
 * Validates props in development mode to catch missing fields early.
 *
 * Config format:
 * {
 *   id: 'overview',
 *   block: 'block.overview',
 *   dataKey: 'overview',           // Pass data[dataKey] as the data prop
 *   props: { variant: 'cards' }    // Optional additional static props
 * }
 *
 * @param {Object} props
 * @param {Array} props.sections - Section config array
 * @param {Object} props.data - Page data object
 * @param {Function} props.shouldRender - Optional custom shouldRender function
 */
export async function SectionRenderer({ sections, data, shouldRender }) {
  if (!sections || !data) return null;

  const renderedSections = await Promise.all(
    sections.map(async (section) => {
        const spec = getBlockSpec(section.block);

        // Check if section should render
        if (!renderCheckWithSpec(data, section, spec, shouldRender)) {
          return null;
        }

        // Get component from registry
        const Component = getBlock(section.block);

        if (!Component) {
          console.warn(`Section "${section.id}" has no valid block reference: "${section.block}"`);
          return null;
        }

        // Resolve raw section data (may be function or promise for lazy sections)
        const rawSectionData = section.dataKey
          ? section.dataKey.split('.').reduce((obj, key) => obj?.[key], data)
          : data;
        const sectionData = await resolveSectionData(rawSectionData);

        // Get props - prefer block spec normalization, fallback to existing mapper
        let props;
        if (section.mapper) {
          // Legacy mapper support
          props = section.mapper(data);
        } else if (spec?.normalize) {
          props = spec.normalize(sectionData, data, section);
        } else {
          // Direct data passing - cleaner approach
          props = { data: sectionData };
        }

        // Merge defaults and static props (config overrides win last)
        props = {
          ...(spec?.defaults || {}),
          ...props,
          ...(section.props || {})
        };

        // Validate props in development
        validateBlockProps(section.block, props, spec?.required);

        // Render component with key for React reconciliation
        return <Component key={section.id} {...props} />;
      })
  );

  return <>{renderedSections}</>;
}

/**
 * Decide if a section should render using, in order:
 * - Custom shouldRender passed to SectionRenderer
 * - Section config condition
 * - Block spec shouldRender
 * - Default dataKey-based check
 */
function renderCheckWithSpec(data, section, spec, customShouldRender) {
  if (customShouldRender) {
    return customShouldRender(data, section);
  }

  if (section.condition) {
    return section.condition(data);
  }

  if (spec?.shouldRender) {
    const sectionData = section.dataKey
      ? section.dataKey.split('.').reduce((obj, key) => obj?.[key], data)
      : data;
    if (typeof sectionData === 'function' || isPromiseLike(sectionData)) {
      return true;
    }
    return spec.shouldRender(data, sectionData, section);
  }

  return shouldRenderSection(data, section);
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
    if (typeof value === 'function' || isPromiseLike(value)) {
      return true;
    }
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
