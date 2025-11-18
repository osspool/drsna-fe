import { treatmentSections, shouldRenderSection } from "@/lib/sections/treatment";

/**
 * Treatment Section Renderer Component
 *
 * Config-driven rendering of treatment page sections.
 * Iterates through the sections config and conditionally renders each section
 * based on data availability, reducing boilerplate in the page component.
 *
 * @param {Object} treatment - Complete treatment data object
 * @returns {JSX.Element[]} Array of rendered section components
 */
export function TreatmentSectionRenderer({ treatment }) {
  return (
    <>
      {treatmentSections.map((section) => {
        // Check if section should render
        if (!shouldRenderSection(treatment, section)) {
          return null;
        }

        // Get component and props
        const Component = section.component;
        const props = section.props(treatment);

        // Render component with key for React reconciliation
        return <Component key={section.id} {...props} />;
      })}
    </>
  );
}
