import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { getResourcesOverview, getResourcesMetadata } from "@/lib/resources";
import { getBaseUrl } from "@/lib/domain-helpers";
import { generateResourceStructuredData, buildBreadcrumbSchema } from "@/lib/seo-helpers";

/**
 * Generate metadata using standardized helper for consistency
 */
export async function generateMetadata() {
  return getResourcesMetadata();
}

function formatUpdatedDate(value) {
  if (!value) return "Always current";
  try {
    return new Date(value).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return value;
  }
}

export default async function ResourcesPage() {
  const overview = await getResourcesOverview();
  const guides = overview.guides || [];
  const baseUrl = await getBaseUrl();
  const structuredData = buildResourcesStructuredData(guides, baseUrl);

  return (
    <>
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <main className="bg-royal-blue text-white">
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-black/60 via-black/40 to-black/20 relative overflow-hidden">
        <Container className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            {overview.hero?.badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {overview.hero.badge}
              </span>
            )}
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white">
              {overview.hero?.title || "Clinic Resources"}
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl">
              {overview.hero?.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {overview.hero?.cta?.primary && (
                <Link
                  href={overview.hero.cta.primary.href}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                >
                  {overview.hero.cta.primary.text}
                </Link>
              )}
              {overview.hero?.cta?.secondary && (
                <Link
                  href={overview.hero.cta.secondary.href}
                  className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                >
                  {overview.hero.cta.secondary.text}
                </Link>
              )}
            </div>
          </div>

          {overview.hero?.image && (
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              <SmartImage
                src={overview.hero.image}
                alt={overview.hero.title}
                title={overview.hero.title}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          )}
        </Container>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/40" aria-hidden />
      </section>

      <section className="py-16 md:py-24 bg-background text-foreground">
        <Container>
          <div className="flex flex-col gap-4 mb-10 text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              EXPLORE GUIDES
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Deep dives written for curious patients
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Save time researching by leaning on our clinic notes, published studies, and real-world treatment data.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/resources/${guide.slug}`}
                className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <div className="relative h-52">
                  <SmartImage
                    src={guide.image}
                    title={guide.title}
                    description={guide.excerpt}
                    alt={guide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-sm font-semibold text-white/90 bg-black/40 px-3 py-1 rounded-full">
                    {guide.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {guide.updated ? `Updated ${formatUpdatedDate(guide.updated)}` : "Always current"}
                    </p>
                    <h3 className="mt-2 text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {guide.excerpt}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                    <span>{guide.estimatedRead}</span>
                    <span className="text-primary font-semibold">Read guide →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
    </>
  );
}

function buildResourcesStructuredData(guides, baseUrl) {
  if (!Array.isArray(guides) || !baseUrl) return [];
  const listSchema = guides.map((guide) =>
    generateResourceStructuredData({
      title: guide.title,
      summary: guide.excerpt,
      heroImage: guide.image,
      category: guide.category,
      faqs: guide.faqs,
      lastUpdated: guide.updated,
    }, guide.slug, baseUrl)
  ).flat();

  const breadcrumbSchema = buildBreadcrumbSchema(baseUrl, [
    { name: "Resources", path: "/resources" },
  ]);

  return breadcrumbSchema ? [...listSchema, breadcrumbSchema] : listSchema;
}
