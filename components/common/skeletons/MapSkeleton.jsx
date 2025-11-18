/**
 * Map Skeleton Loader
 *
 * Loading skeleton for map components during lazy loading
 */
export function MapSkeleton() {
  return (
    <div className="aspect-video bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-muted-foreground/20 rounded-full mx-auto animate-pulse" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  );
}
