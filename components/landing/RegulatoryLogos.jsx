"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { SmartImage } from "@/components/common/SmartImage";

const defaultData = {
  badge: "Certified Excellence",
  title: "Regulated & Accredited",
  logos: [
    {
      name: "CQC - Care Quality Commission",
      src: "/images/drsnaclinic/regulation/care-quality-comission-CQC.webp",
    },
    {
      name: "BMA - British Medical Association",
      src: "/images/drsnaclinic/regulation/BMA-Logo.webp",
    },
    {
      name: "Royal College of General Practitioners",
      src: "/images/drsnaclinic/regulation/royal-college.webp",
    },
    {
      name: "Royal College of Surgeons of Edinburgh",
      src: "/images/drsnaclinic/regulation/royal-college-surgeons-edinburg.webp",
    },
    {
      name: "Queen Mary University",
      src: "/images/drsnaclinic/regulation/queen-mary.webp",
    },
  ],
};

export function RegulatoryLogos({ data }) {
  const sectionData = data
    ? {
        ...defaultData,
        ...data,
        logos: data.logos || defaultData.logos,
      }
    : defaultData;

  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div
          className="opacity-0 animate-fade-in-up text-center mb-12"
        >
          {sectionData.badge && (
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              {sectionData.badge}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            {sectionData.title}
          </h2>
        </div>

        {/* Infinite Slider for all screen sizes */}
        <div className="relative overflow-hidden">
          <InfiniteSlider
            speedOnHover={20}
            speed={40}
            gap={80}
          >
            {sectionData.logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center  transition-all duration-300"
              >
                <SmartImage
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  width={120}
                  height={80}
                  className="object-contain h-20 w-auto"
                />
              </div>
            ))}
          </InfiniteSlider>


        </div>
      </div>
    </section>
  );
}
