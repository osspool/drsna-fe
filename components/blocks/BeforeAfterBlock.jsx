"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowLeftRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

function buildGalleryItems(data) {
  const gallerySource = data?.gallery || data?.images || [];

  return gallerySource
    .map((item, index) => ({
      id: item.id || `before-after-${index}`,
      title: item.title || item.caption || `Transformation ${index + 1}`,
      before: item.before,
      after: item.after,
      description: item.description || data?.description,
      area: item.area,
    }))
    .filter(item => item.before && item.after);
}

export function BeforeAfterBlock({ data }) {
  const isEnabled = data?.enabled ?? true;
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const gallery = buildGalleryItems(data);

  useEffect(() => {
    setActiveIndex(prev => {
      if (gallery.length === 0) {
        return 0;
      }

      return Math.min(prev, gallery.length - 1);
    });
    setSliderPosition(50);
  }, [gallery.length]);

  if (!isEnabled || gallery.length === 0) {
    return null;
  }

  const currentItem = gallery[activeIndex];
  const title = data?.title || data?.heading || "Before & After Transformations";
  const subtitle = data?.subtitle || data?.description || "See the transformative results our patients have achieved";

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % gallery.length);
    setSliderPosition(50);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + gallery.length) % gallery.length);
    setSliderPosition(50);
  };

  const handleSliderMove = xPercentage => {
    setSliderPosition(Math.max(0, Math.min(100, xPercentage)));
  };

  return (
    <section className="py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <ArrowLeftRight className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Real Results
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Main Comparison */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-card rounded-3xl p-4 md:p-6 shadow-2xl border border-border">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted select-none"
              onMouseMove={event => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - rect.left;
                handleSliderMove((x / rect.width) * 100);
              }}
              onTouchMove={event => {
                const rect = event.currentTarget.getBoundingClientRect();
                const touch = event.touches[0];
                const x = touch.clientX - rect.left;
                handleSliderMove((x / rect.width) * 100);
              }}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <Image
                  src={currentItem.before}
                  alt={`Before - ${currentItem.title}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 px-4 py-2 bg-foreground/80 backdrop-blur-sm rounded-full">
                  <span className="text-background text-sm font-semibold">BEFORE</span>
                </div>
              </div>

              {/* After Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={currentItem.after}
                  alt={`After - ${currentItem.title}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full">
                  <span className="text-primary-foreground text-sm font-semibold">AFTER</span>
                </div>
              </div>

              {/* Slider Line */}
              <div
                className="absolute inset-y-0 w-1 bg-background shadow-xl cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background rounded-full shadow-2xl flex items-center justify-center border-4 border-primary/30">
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="w-4 h-4 text-primary" />
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Bar */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                  {currentItem.title}
                </h3>
                {currentItem.description && (
                  <p className="text-muted-foreground">{currentItem.description}</p>
                )}
                {currentItem.area && (
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full">
                    <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                      {currentItem.area}
                    </span>
                  </div>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <span className="text-sm text-muted-foreground font-medium min-w-[60px] text-center">
                    {activeIndex + 1} / {gallery.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {gallery.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIndex(index);
                  setSliderPosition(50);
                }}
                className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  index === activeIndex
                    ? "border-primary shadow-lg scale-110"
                    : "border-border hover:border-primary/50 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={item.after} alt={item.title} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {data?.disclaimer && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground/70 italic max-w-2xl mx-auto">
              {data.disclaimer}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

// Compact grid variant for multi-case layouts
export function BeforeAfterGrid({ gallery, title, subtitle }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <Container>
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              {title}
            </h2>
            {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map(item => (
            <div
              key={item.id}
              className="bg-secondary/50 rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <Image src={item.before} alt={`Before - ${item.title}`} fill className="object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-foreground/80 rounded text-background text-xs font-semibold">
                    BEFORE
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image src={item.after} alt={`After - ${item.title}`} fill className="object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 rounded text-primary-foreground text-xs font-semibold">
                    AFTER
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
