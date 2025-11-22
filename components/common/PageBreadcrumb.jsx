import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

/**
 * PageBreadcrumb Component
 *
 * Reusable breadcrumb navigation with schema.org BreadcrumbList markup.
 *
 * SEO Benefits:
 * - Rich snippets in Google search results
 * - Better internal linking structure
 * - Improved crawlability and site hierarchy
 * - Reduced bounce rate through easy navigation
 *
 * @param {Object} props
 * @param {Array<{name: string, path: string|null}>} props.items - Breadcrumb items
 * @param {string} [props.baseUrl] - Base URL for schema.org markup
 * @param {string} [props.className] - Additional CSS classes
 */
export function PageBreadcrumb({ items, baseUrl, className = "" }) {
  // Ensure items always starts with Home
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    ...items.filter(item => item.name !== "Home")
  ];

  // Generate schema.org BreadcrumbList structured data
  const breadcrumbSchema = baseUrl ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.path && { "item": `${baseUrl}${item.path}` })
    }))
  } : null;

  return (
    <>
      {/* Schema.org BreadcrumbList for SEO */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Visual Breadcrumb */}
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isHome = index === 0;

            return (
              <div key={`breadcrumb-${index}`} className="contents">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-md">
                      {item.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.path} className={isHome ? "flex items-center gap-1.5" : ""}>
                        {isHome && <Home className="h-3.5 w-3.5" />}
                        <span>{item.name}</span>
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
