import { PageBreadcrumb } from "@/components/common/PageBreadcrumb";

/**
 * ResourceBreadcrumb Component
 *
 * Displays breadcrumb navigation for resource guides with schema.org markup.
 *
 * Breadcrumb structure: Home → Resources → [Category] → Guide Title
 *
 * SEO Benefits:
 * - Rich snippets in Google search results
 * - Better internal linking structure
 * - Improved crawlability and site hierarchy understanding
 * - Reduced bounce rate through easy navigation
 *
 * @param {Object} props
 * @param {string} [props.category] - Resource category (e.g., "Intimate Health")
 * @param {string} props.title - Current guide title
 * @param {string} [props.baseUrl] - Base URL for schema.org markup
 */
export function ResourceBreadcrumb({ category, title, baseUrl }) {
  // Build breadcrumb items: Home → Resources → [Category?] → Title
  const items = [
    { name: "Resources", path: "/resources" },
    { name: title, path: null }, // Current page (no path = current)
  ];

  // Optionally show category badge alongside breadcrumb
  return (
    <div className="flex flex-col gap-2">
      <PageBreadcrumb items={items} baseUrl={baseUrl} />
      {category && (
        <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
          {category}
        </span>
      )}
    </div>
  );
}
