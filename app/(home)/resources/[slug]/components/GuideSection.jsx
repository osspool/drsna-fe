export function GuideSection({ section }) {
  if (!section?.items?.length) return null;

  return (
    <section className="py-10">
      <div className="flex flex-col gap-3 mb-6">
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">
          {section.badge || "INSIGHT"}
        </p>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          {section.title}
        </h2>
        {section.intro && (
          <p className="text-base text-muted-foreground max-w-3xl">
            {section.intro}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {section.items.map((item, index) => (
          <div
            key={`${item.heading}-${index}`}
            className="rounded-3xl border border-border bg-card/80 px-6 py-6 shadow-sm hover:-translate-y-1 transition"
          >
            <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-primary mb-3">
              <span>{item.badge}</span>
              <span className="text-muted-foreground">Step {index + 1}</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {item.heading}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
