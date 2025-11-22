import { generateStableKey } from "@/lib/utils";

/**
 * Testimonials Skeleton Loader
 *
 * Loading skeleton for testimonials section during lazy loading
 */
export function TestimonialsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={generateStableKey("testimonial-skeleton", i, "testimonial-skeleton-card")} className="bg-card rounded-2xl p-6 border border-border">
          {/* Rating stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={generateStableKey("testimonial-star", j, "testimonial-skeleton-star")} className="w-4 h-4 bg-muted rounded animate-pulse" />
            ))}
          </div>

          {/* Quote */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-muted rounded animate-pulse w-full" />
            <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
            <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
              <div className="h-2 bg-muted rounded animate-pulse w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
