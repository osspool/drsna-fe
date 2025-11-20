import Image from "next/image";
import { Icon } from "@/components/custom/ui/icon";

export function TwoColumnFeaturesBlock({ data = {} }) {
  const {
    title = "The Lyra ecosystem brings together our models.",
    paragraphs = [
      "Gemini is evolving to be more than just the models. It supports an entire ecosystem — from products innovate.",
      "It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate"
    ],
    features = [
      { icon: "zap", title: "Faaast", description: "It supports an entire helping developers and innovate." },
      { icon: "cpu", title: "Powerful", description: "It supports an entire helping developers and businesses." }
    ],
    image,
    imageAlt,
    images = {
      light: "/exercice.png",
      dark: "/exercice-dark.png",
      width: 1206,
      height: 612,
      altLight: "payments illustration light",
      altDark: "payments illustration dark"
    }
  } = data;

  const imageUrl = image || images?.light;
  const imageAltText = imageAlt || images?.altLight || images?.alt || "Feature image";

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
          {title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative space-y-4">
            {paragraphs?.[0] ? <p className="text-muted-foreground">{paragraphs[0]}</p> : null}
            {paragraphs?.[1] ? <p className="text-muted-foreground">{paragraphs[1]}</p> : null}
            {Array.isArray(features) && features.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                {features.map((feature, index) => (
                  <div key={`${feature.title}-${index}`} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon name={feature.icon} size={16} className="shrink-0" />
                      <h3 className="text-sm font-medium">{feature.title}</h3>
                    </div>
                    {feature.description ? (
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative mt-6 sm:mt-0">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-300/10 to-transparent dark:from-zinc-700/10">
              <Image
                src={imageUrl}
                className="rounded-2xl shadow-lg object-cover w-full h-auto"
                alt={imageAltText}
                width={1200}
                height={800}
              />
            </div>
            {data.caption && (
              <p className="mt-3 text-sm text-center text-muted-foreground italic">
                {data.caption}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TwoColumnFeaturesBlock;
