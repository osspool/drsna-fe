import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/custom/ui/icon";
import { generateStableKey } from "@/lib/utils";

export default function TwoColumnImageQuote({ data = {} }) {
  const {
    eyebrow,
    title = "The Lyra ecosystem brings together our models.",
    subtitle,
    paragraphs = [],
    features = [],
    quote,
    image,
    imageAlt,
    caption,
    images = {
      light: "/payments-light.png",
      width: 1207,
      height: 929,
      altLight: "Featured image"
    }
  } = data;

  const resolvedImage = image || images?.light;
  const resolvedAlt = imageAlt || images?.altLight || images?.alt || title;

  return (
    <Section background="muted" padding="xl">
      <Container className="max-w-6xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div className="space-y-6 rounded-[32px] border border-border/60 bg-card/60 p-8 md:p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
            {eyebrow && (
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            )}

            {paragraphs.length > 0 && (
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                {paragraphs.map((paragraph, idx) => (
                  <p key={generateStableKey(paragraph, idx, "two-column-paragraph")}>{paragraph}</p>
                ))}
              </div>
            )}

            {features.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border/60">
                {features.map((feature, idx) => (
                  <div key={generateStableKey(feature, idx, "two-column-feature")} className="flex items-start gap-3">
                    {feature.icon && (
                      <span className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name={feature.icon} size={18} className="text-primary" />
                      </span>
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {quote?.text && (
              <figure className="rounded-3xl border border-border bg-background/60 p-6 space-y-3 shadow-lg">
                <blockquote className="text-lg text-foreground leading-relaxed italic">
                  “{quote.text}”
                </blockquote>
                {quote.cite && (
                  <figcaption className="text-sm font-semibold text-muted-foreground">
                    {quote.cite}
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-primary/20 blur-3xl opacity-30 pointer-events-none" />
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-background">
              <Image
                src={resolvedImage}
                alt={resolvedAlt}
                width={images.width || 1200}
                height={images.height || 900}
                className="w-full h-full object-cover aspect-[4/3]"
                priority={false}
              />
            </div>
            {caption && (
              <p className="mt-3 text-sm text-muted-foreground text-center">
                {caption}
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
