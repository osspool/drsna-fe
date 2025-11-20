export function MetricPills({ metrics }) {
  if (!metrics?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {metrics.map((metric) => (
        <div
          key={`${metric.label}-${metric.value}`}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90"
        >
          <span className="font-semibold">{metric.value}</span>
          <span className="ml-2 text-white/70">{metric.label}</span>
        </div>
      ))}
    </div>
  );
}
