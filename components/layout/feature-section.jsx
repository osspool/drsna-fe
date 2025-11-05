import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

/**
 * A flexible two-column marketing/feature section.
 *
 * Props overview:
 * - layout
 *   - imageSide: "left" | "right" (default: "right")
 *   - className, containerClassName
 *   - padding, background (forwarded to Section)
 *
 * - content
 *   - eyebrow: string
 *   - title: string
 *   - highlight: string (rendered on next line with primary color)
 *   - description: string
 *   - rating: { show: boolean, stars?: number, text?: string }
 *   - stats: Array<{ label: string, value: string }>
 *
 * - ctas
 *   - primaryCta?: { href: string, label: string, variant?: "default" | "outline" | "secondary", className?: string, iconRight?: React.ReactNode }
 *   - secondaryCta?: same as primaryCta
 *
 * - image
 *   - image: { src: string, alt: string, priority?: boolean, className?: string, aspect?: string }
 *   - imageVariant: "card" | "dashboard" (pre-styled frames)
 *   - imageChipText?: string (small badge above image, for "card" variant)
 *   - imageCaption?: string (small caption below image, for "card" variant)
 *   - imageGradientClassName?: string (outer glow/gradient behind the frame)
 */
export function FeatureSection({
  // layout
  imageSide = "right",
  className,
  containerClassName,
  padding = "lg",
  background = "default",

  // content
  eyebrow,
  title,
  highlight,
  description,
  rating,
  stats,

  // ctas
  primaryCta,
  secondaryCta,

  // image
  image,
  imageVariant = "card",
  imageChipText,
  imageCaption,
  imageGradientClassName,
}) {
  const isImageLeft = imageSide === "left";

  const gridOrderForContent = cn(
    "space-y-7",
    isImageLeft ? "order-first lg:order-last" : "order-first"
  );
  const gridOrderForVisual = cn(
    "relative",
    isImageLeft ? "order-last lg:order-first" : "order-last"
  );

  const renderRating = () => {
    if (!rating?.show) return null;
    const starCount = typeof rating.stars === "number" ? rating.stars : 5;
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center text-gold">
          {Array.from({ length: starCount }).map((_, index) => (
            <Star key={index} size={18} className="fill-current text-primary mr-1" />
          ))}
        </div>
        {rating?.text ? (
          <span className="text-sm text-muted-foreground">{rating.text}</span>
        ) : null}
      </div>
    );
  };

  const renderStats = () => {
    if (!Array.isArray(stats) || stats.length === 0) return null;
    return (
      <div className="grid grid-cols-3 gap-6 pt-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderCtas = () => {
    if (!primaryCta && !secondaryCta) return null;
    return (
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {primaryCta ? (
          <Button
            asChild
            size="lg"
            variant={primaryCta.variant || "default"}
            className={cn(primaryCta.className)}
          >
            <Link href={primaryCta.href} className="group inline-flex items-center">
              {primaryCta.label}
              {primaryCta.iconRight ? (
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  {primaryCta.iconRight}
                </span>
              ) : null}
            </Link>
          </Button>
        ) : null}
        {secondaryCta ? (
          <Button
            asChild
            size="lg"
            variant={secondaryCta.variant || "outline"}
            className={cn(secondaryCta.className)}
          >
            <Link href={secondaryCta.href} className="group inline-flex items-center">
              {secondaryCta.label}
              {secondaryCta.iconRight ? (
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  {secondaryCta.iconRight}
                </span>
              ) : null}
            </Link>
          </Button>
        ) : null}
      </div>
    );
  };

  const renderVisualCard = () => {
    if (!image?.src) return null;

    if (imageVariant === "dashboard") {
      return (
        <div className="relative">
          <div
            aria-hidden
            className={cn(
              "absolute -inset-8 rounded-[36px] bg-gradient-to-r blur-3xl opacity-40",
              imageGradientClassName
            )}
          />
          <div className="relative rounded-[28px] border bg-muted/20 ring-1 ring-border shadow-2xl overflow-hidden">
            <div className="aspect-[16/10] bg-black/80">
              <Image
                src={image.src}
                alt={image.alt || ""}
                width={1200}
                height={800}
                className={cn("w-full h-full object-cover opacity-95", image.className)}
                priority={Boolean(image.priority)}
              />
            </div>
          </div>
        </div>
      );
    }

    // default "card" variant
    return (
      <div className="relative">
        <div aria-hidden className={cn("absolute -inset-8 rounded-[36px] bg-gradient-to-br from-primary/25 via-primary/10 to-transparent blur-3xl opacity-60", imageGradientClassName)} />
        <div className="relative rounded-2xl border bg-card ring-1 ring-border shadow-xl overflow-hidden">
          <div className="p-4 sm:p-6">
            {imageChipText ? (
              <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {imageChipText}
              </div>
            ) : null}
            <div className="relative w-full">
              <Image
                src={image.src}
                alt={image.alt || ""}
                width={1200}
                height={800}
                className={cn("w-full h-auto object-contain", image.className)}
                priority={Boolean(image.priority)}
              />
            </div>
            {imageCaption ? (
              <div className="mt-4 text-xs text-muted-foreground">{imageCaption}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section padding={padding} background={background} className={className}>
      <div className={cn("grid lg:grid-cols-2 gap-16 items-center", containerClassName)}>
        {/* Visual */}
        <div className={gridOrderForVisual}>{renderVisualCard()}</div>

        {/* Content */}
        <div className={gridOrderForContent}>
          <div className="space-y-4">
            {eyebrow ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                {eyebrow}
              </div>
            ) : null}
            {(title || highlight) ? (
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {title}
                {highlight ? <span className="block text-primary">{highlight}</span> : null}
              </h2>
            ) : null}
            {description ? (
              <p className="text-muted-foreground leading-relaxed text-justify max-w-prose text-base md:text-lg">
                {description}
              </p>
            ) : null}
          </div>

          {renderRating()}
          {renderCtas()}
          {renderStats()}
        </div>
      </div>
    </Section>
  );
}

export default FeatureSection;


