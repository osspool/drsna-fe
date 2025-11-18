/**
 * Section Skeleton Loader
 *
 * Generic skeleton loader for heavy section components.
 * Shows placeholder for section with title and content areas.
 */

export function SectionSkeleton() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-lg mx-auto" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded-lg mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video bg-muted animate-pulse rounded-lg" />
              <div className="h-6 bg-muted animate-pulse rounded-lg" />
              <div className="h-4 bg-muted animate-pulse rounded-lg w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
