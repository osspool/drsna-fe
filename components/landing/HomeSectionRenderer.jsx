import { homeSections, shouldRenderHomeSection } from "@/lib/sections/home";

/**
 * Home Section Renderer Component
 *
 * Config-driven rendering of home page sections.
 * Iterates through the sections config and conditionally renders each section
 * based on data availability, reducing boilerplate in the page component.
 *
 * @param {Object} homeData - Complete home page data object
 * @returns {JSX.Element[]} Array of rendered section components
 */
export function HomeSectionRenderer({ homeData }) {
  return (
    <>
      {homeSections.map((section) => {
        // Check if section should render
        if (!shouldRenderHomeSection(homeData, section)) {
          return null;
        }

        // Get component and props
        const Component = section.component;
        const props = section.props(homeData);

        // Render component with key for React reconciliation
        return <Component key={section.id} {...props} />;
      })}
    </>
  );
}
