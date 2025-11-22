import { generateStableKey } from "@/lib/utils";

/**
 * Process Timeline Skeleton Loader
 *
 * Loading skeleton for process timeline during lazy loading
 */
export function ProcessTimelineSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={generateStableKey("process-skeleton", i, "process-timeline-skeleton-step")} className="flex gap-6">
          {/* Step number */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
            <div className="h-4 bg-muted rounded animate-pulse w-full" />
            <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
