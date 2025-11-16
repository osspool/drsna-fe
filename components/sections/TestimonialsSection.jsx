"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Star, Check, Quote } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { useImageOrientation } from "@/hooks/use-image-orientation";
import { getYouTubeThumbnailUrl } from "@/lib/utils";
import { motion } from "framer-motion";

export function TestimonialsSection({
  data,
  variant = "text",
  title,
  subtitle,
  badge,
  background = "default"
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const testimonials = data?.testimonials || data?.items || data || [];
  const heading = title || data?.title || data?.heading;
  const description = subtitle || data?.subtitle || data?.description;
  const badgeText = badge || data?.badge;

  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted",
    accent: "bg-accent/5",
    cream: "bg-cream",
    gradient: "bg-gradient-to-b from-secondary to-background"
  };

  if (variant === "video") {
    return (
      <section className={`py-20 border-y border-border ${bgClasses[background]}`}>
        <Container>
          <div className="text-center mb-16 space-y-4">
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                  {badgeText}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-royal-blue">
              {heading || "Patient Testimonials"}
            </h2>
            {description && (
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((video, index) => {
              const videoIdentifier = video.id || video.videoId;

              return (
                <div key={videoIdentifier || index} className="group">
                  <div className="gradient-border group-hover:gradient-border-hover rounded-3xl h-full w-full transition-all duration-500">
                    <div className="gradient-border-inner rounded-[calc(1.5rem-4px)] overflow-hidden">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <VideoThumbnail video={video} />

                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

                        <button
                          onClick={() => setSelectedVideo(videoIdentifier)}
                          className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-lg">
                            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                          </div>
                        </button>

                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full border border-primary/30 bg-background/80 backdrop-blur-sm">
                          <span className="text-primary text-sm font-medium">#Testimonial</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-5xl w-full p-0 bg-card border-border overflow-hidden">
            <DialogClose className="absolute right-4 top-4 z-50 rounded-full p-2 border border-border bg-background/80 backdrop-blur-sm hover:bg-primary hover:border-primary transition-all duration-300 group">
              <X className="h-5 w-5 text-foreground group-hover:text-primary-foreground" />
              <span className="sr-only">Close</span>
            </DialogClose>
            {selectedVideo && (
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="Patient Testimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>
    );
  }

  // Video testimonials with detailed info (quote, rating, verified badge)
  if (variant === "video-detailed") {
    const [playing, setPlaying] = useState({});

    const handlePlay = (index) => {
      setPlaying({ [index]: true });
    };

    // Handle data structure - could be data.testimonials or data itself
    const videoTestimonials = Array.isArray(data?.testimonials)
      ? data.testimonials
      : Array.isArray(testimonials)
        ? testimonials
        : [];

    if (videoTestimonials.length === 0) return null;

    return (
      <Section background={background}>
        <Container>
          {/* Header */}
          {(heading || description) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {heading && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                  {heading}
                </h2>
              )}
              {description && (
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </motion.div>
          )}

          {/* Video Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {videoTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group h-full"
              >
                <div className="gradient-border group-hover:gradient-border-hover rounded-3xl h-full w-full transition-all duration-500">
                  <div className="gradient-border-inner rounded-[calc(1.5rem-4px)] flex flex-col h-full">
                    {/* Video */}
                    <div className="relative">
                      <VideoPlayer
                        video={testimonial.video}
                        isPlaying={!!playing[index]}
                        onPlay={() => handlePlay(index)}
                        size="md"
                        className="rounded-none"
                      />

                      {/* Quote Badge */}
                      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Quote className="w-5 h-5 text-primary-foreground" fill="currentColor" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8 flex-1 flex flex-col">
                      {/* Rating */}
                      {testimonial.rating && (
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                          ))}
                        </div>
                      )}

                      {/* Quote */}
                      {testimonial.quote && (
                        <p className="text-foreground/80 leading-relaxed mb-6 italic">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      )}

                      {/* Patient Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          {testimonial.treatment && (
                            <p className="text-sm text-muted-foreground">
                              {testimonial.treatment}
                            </p>
                          )}
                        </div>

                        {testimonial.verified && (
                          <div className="flex items-center gap-1 text-sm text-primary font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </div>
                        )}
                      </div>

                      {/* Results Achieved (optional) */}
                      {testimonial.results && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-medium text-foreground mb-2">Results Achieved:</p>
                          <p className="text-sm text-muted-foreground">{testimonial.results}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Optional CTA */}
          {videoTestimonials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground text-sm">
                All testimonials are from verified patients who underwent treatment at Dr. SNA Clinic
              </p>
            </motion.div>
          )}
        </Container>
      </Section>
    );
  }

  if (variant === "carousel") {
    return (
      <section className={`py-20 ${bgClasses[background]}`}>
        <Container>
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {badgeText}
              </span>
            </div>
          )}

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16 text-foreground">
            {heading || "Patient Testimonials"}
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-border">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6 italic">
                        "{testimonial.content || testimonial.text}"
                      </p>

                      <div className="flex items-center gap-3 border-t border-border pt-4">
                        {testimonial.image && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                            {testimonial.age && `, ${testimonial.age}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.treatment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Container>
      </section>
    );
  }

  return (
    <section className={`py-20 ${bgClasses[background]}`}>
      <Container>
        <div className="text-center mb-16">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {badgeText}
              </span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            {heading || "What Our Patients Say"}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-3xl border border-border hover:border-primary/30 hover:shadow-xl transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text || testimonial.content}&rdquo;
              </p>

              <div className="pt-6 border-t border-border">
                <p className="font-heading font-bold text-foreground">
                  {testimonial.name}
                </p>
                {testimonial.age && (
                  <p className="text-sm text-muted-foreground">
                    Age {testimonial.age} • {testimonial.treatment}
                  </p>
                )}
                {testimonial.verified && (
                  <div className="flex items-center gap-1 mt-2 text-primary text-xs">
                    <Check className="w-3 h-3" />
                    <span>Verified Patient</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function VideoThumbnail({ video }) {
  const videoIdentifier = video.id || video.videoId;
  const manualOrientation =
    video.orientation || (typeof video.isPortrait === "boolean" ? (video.isPortrait ? "portrait" : "landscape") : undefined);
  const initialThumbnail =
    video.thumbnail || (videoIdentifier ? getYouTubeThumbnailUrl(videoIdentifier, { orientationHint: manualOrientation }) : null);
  const orientation = useImageOrientation(initialThumbnail);
  const resolvedOrientation = manualOrientation || orientation;
  const isPortrait = resolvedOrientation === "portrait";
  const PORTRAIT_DEFAULT_SCALE = 4;
  const baseScale =
    typeof video.thumbnailZoom === "number"
      ? video.thumbnailZoom
      : isPortrait
        ? PORTRAIT_DEFAULT_SCALE
        : 1;
  const thumbnailSrc =
    video.thumbnail || (videoIdentifier ? getYouTubeThumbnailUrl(videoIdentifier, { orientationHint: resolvedOrientation }) : null);
  const computeBackgroundSize = () => {
    if (!isPortrait) return "cover";
    const widthPercent = Math.max(baseScale * 100, 400);
    return `${widthPercent}% auto`;
  };

  if (!thumbnailSrc) {
    return <div className="absolute inset-0 bg-muted" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-label={video.title || "Patient testimonial"}>
      <div
        className="h-full w-full transition-[background-size] duration-500 group-hover:scale-[1.02]"
        style={{
          backgroundImage: `url(${thumbnailSrc})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: computeBackgroundSize(),
        }}
      />
    </div>
  );
}
