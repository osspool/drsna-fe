import Link from "next/link";

export function TreatmentRecommendations({ treatments }) {
  if (!treatments?.length) return null;

  return (
    <section className="py-12">
      <div className="flex flex-col gap-3 mb-6 text-center">
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">
          Recommended Next Steps
        </p>
        <h2 className="text-3xl font-heading font-bold text-foreground">
          Treatments that accelerate results
        </h2>
        <p className="text-base text-muted-foreground">
          Book a consult to personalise dosage, combinations, and timelines.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {treatments.map((treatment) => (
          <Link
            key={treatment.href}
            href={treatment.href}
            className="rounded-3xl border border-border bg-card p-6 text-left hover:border-primary/40 hover:-translate-y-1 transition"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Clinic protocol
            </p>
            <h3 className="mt-2 text-xl font-heading font-semibold text-foreground">
              {treatment.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {treatment.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-primary font-semibold">
              View treatment →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
