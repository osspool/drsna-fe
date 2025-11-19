import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { FAQSection } from "@/components/sections/FAQSection";
import {
  getResourceGuide,
  getResourceGuidesList,
} from "@/lib/resources";
import {
  createMetadataGenerator,
  createStaticParamsGenerator,
  generateResourceStructuredData,
} from "@/lib/seo-helpers";
import { getBaseUrl } from "@/lib/domain-helpers";

function renderInline(text) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={`bold-${index}`}>
          {segment.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`text-${index}`}>{segment}</span>;
  });
}

function MarkdownContent({ content }) {
  if (!content) return null;
  const lines = content.trim().split("\n");
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground" key={`list-${elements.length}`}>
          {listItems.map((item, idx) => (
            <li key={`list-item-${idx}`}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 className="text-2xl font-heading font-semibold text-foreground mt-8" key={`h3-${index}`}>
          {renderInline(trimmed.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 className="text-3xl font-heading font-bold text-foreground mt-10" key={`h2-${index}`}>
          {renderInline(trimmed.slice(3))}
        </h2>
      );
    } else if (trimmed.startsWith(">")) {
      elements.push(
        <blockquote
          className="border-l-4 border-primary/50 bg-primary/5 px-4 py-3 rounded-r-2xl text-muted-foreground italic"
          key={`quote-${index}`}
        >
          {renderInline(trimmed.replace(/^>\s?/, ""))}
        </blockquote>
      );
    } else {
      elements.push(
        <p className="text-base text-muted-foreground leading-relaxed mt-4" key={`p-${index}`}>
          {renderInline(trimmed)}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-2">{elements}</div>;
}
/**
 * Generate static params using SEO helper
 */
export const generateStaticParams = createStaticParamsGenerator(getResourceGuidesList);

/**
 * Generate metadata using SEO helper for consistency
 */
export const generateMetadata = createMetadataGenerator(
  getResourceGuide,
  "heroImage",
  "Resource Not Found",
  (params) => [params.slug]
);

function MetricPills({ metrics }) {
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

function GuideSection({ section }) {
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

function TreatmentRecommendations({ treatments }) {
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

export default async function ResourceGuidePage({ params }) {
  const resolvedParams = await params;
  const guide = await getResourceGuide(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  const baseUrl = await getBaseUrl();
  // Generate structured data for SEO
  const structuredData = generateResourceStructuredData(
    guide,
    resolvedParams.slug,
    baseUrl
  );

  return (
    <>
      {/* Structured Data for SEO - enables Article rich snippets */}
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <main className="bg-background text-foreground">
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-black/90 to-royal-blue text-white">
        <Container className="relative z-10 py-28 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Updated {guide.lastUpdated || 'recently'}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              {guide.title}
            </h1>
            {guide.subtitle && <p className="text-lg text-white/80 max-w-2xl">{guide.subtitle}</p>}
            {guide.summary && <p className="text-base text-white/70">{guide.summary}</p>}
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" aria-hidden />
      </section>

      <Container className="py-16 md:py-20 space-y-8">
        {guide.content && (
          <section className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
            <MarkdownContent content={guide.content} />
          </section>
        )}

        {guide.sections?.map((section) => (
          <GuideSection key={section.title} section={section} />
        ))}

        <TreatmentRecommendations treatments={guide.recommendedTreatments} />

        {guide.faqs?.length ? (
          <FAQSection
            data={{
              title: "Frequently Asked Questions",
              subtitle: "Answers straight from our clinical consults",
              questions: guide.faqs,
            }}
            variant="with-icons"
          />
        ) : null}
      </Container>
    </main>
    </>
  );
}
