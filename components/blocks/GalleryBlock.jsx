"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { generateStableKey } from "@/lib/utils";

export function GalleryBlock({ data }) {
  const { title, subtitle, images = [], columns = 3 } = data;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  if (!images || images.length === 0) return null;

  // Determine grid columns class
  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "md:grid-cols-2 lg:grid-cols-3";

  return (
    <Section background="muted">
      <Container>
        {/* Header */}
        {(title || subtitle) && (
          <SectionHeader
            title={title}
            subtitle={subtitle}
            subtitleClassName="text-muted-foreground"
            spacing="md"
          />
        )}

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 ${gridColsClass} gap-6`}>
          {images.map((image, index) => (
            <div
              key={generateStableKey(image, index, "gallery-image")}
              className="opacity-0 animate-fade-in-up group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleImageClick(image, index)}
            >
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-secondary/5 shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={image.src || image.url || image}
                  alt={image.alt || image.title || `Treatment image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Title/Caption */}
                {(image.title || image.caption) && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-sm md:text-base">
                      {image.title || image.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent showCloseButton={false} className="max-w-[95vw] md:max-w-5xl max-h-[95vh] p-0 bg-black/95 border-none">
            <DialogHeader>
              <DialogTitle className="sr-only">
                {selectedImage?.title || selectedImage?.caption || "Image viewer"}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Previous Button */}
              {images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Image */}
              {selectedImage && (
                <div className="relative w-full h-full p-8">
                  <Image
                    src={selectedImage.src || selectedImage.url || selectedImage}
                    alt={selectedImage.alt || selectedImage.title || "Treatment image"}
                    fill
                    className="object-contain"
                    sizes="95vw"
                  />
                </div>
              )}

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Caption */}
              {(selectedImage?.title || selectedImage?.caption) && (
                <div className="absolute bottom-8 left-0 right-0 text-center px-8">
                  <p className="text-white text-lg font-semibold">
                    {selectedImage.title || selectedImage.caption}
                  </p>
                </div>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur rounded-full">
                  <p className="text-white text-sm font-medium">
                    {selectedIndex + 1} / {images.length}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </Section>
  );
}

