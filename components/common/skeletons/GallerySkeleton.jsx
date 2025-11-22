import { generateStableKey } from "@/lib/utils";

/**
 * Gallery Skeleton Loader
 *
 * Loading skeleton for gallery components during lazy loading
 */
export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={generateStableKey("gallery-skeleton", i, "gallery-skeleton-item")}
          className="aspect-square bg-muted animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}
