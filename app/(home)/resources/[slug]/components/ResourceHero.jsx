import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { MetricPills } from "./MetricPills";

export function ResourceHero({ guide }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-black/90 to-royal-blue text-white">
      <Container className="relative z-10 py-28 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Updated {guide.lastUpdated || "recently"}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            {guide.title}
          </h1>
          {guide.subtitle && (
            <p className="text-lg text-white/80 max-w-2xl">
              {guide.subtitle}
            </p>
          )}
          {guide.summary && (
            <p className="text-base text-white/70">{guide.summary}</p>
          )}
          <MetricPills metrics={guide.metrics} />
        </div>

        {guide.heroImage && (
          <div className="relative flex-1 aspect-[4/3] rounded-[32px] overflow-hidden border border-white/20 shadow-2xl">
            <SmartImage
              src={guide.heroImage}
              title={guide.title}
              description={guide.subtitle}
              alt={guide.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        )}
      </Container>
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50"
        aria-hidden
      />
    </section>
  );
}
