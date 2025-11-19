import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getBaseUrl } from "@/lib/domain-helpers";

export default function NotFound() {
  return (
    <Suspense fallback={<StaticNotFound homeHref="/" bookingHref="/booking" />}>
      <DomainAwareNotFound />
    </Suspense>
  );
}

function StaticNotFound({ homeHref, bookingHref }) {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center">
      <Container className="py-20 flex flex-col items-center text-center gap-6">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">
          404 — Not Found
        </p>
        <h1 className="text-4xl font-heading font-bold">
          That page has moved or no longer exists.
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          We recently overhauled the site map. If you were looking for a
          treatment or resource, start from the homepage or reach out to us for
          help.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={homeHref}
            className="rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition"
          >
            Back to home
          </Link>
          <Link
            href={bookingHref}
            className="rounded-full border border-border px-6 py-3 font-semibold hover:border-primary/50 transition"
          >
            Book a consult
          </Link>
        </div>
      </Container>
    </main>
  );
}

async function DomainAwareNotFound() {
  const baseUrl = await getBaseUrl();
  return (
    <StaticNotFound
      homeHref={baseUrl}
      bookingHref={`${baseUrl}/booking`}
    />
  );
}
