"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Quote } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TestimonialCard } from "@/components/common/TestimonialCard";
import { RatingStars } from "@/components/common/RatingStars";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
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

import { VideoThumbnail } from "./VideoThumbnail";

export function TestimonialsSection({
  data,
  variant,
  title,
  subtitle,
  badge,
  background = "default"
}) {
  const resolvedVariant = variant ?? data?.variant ?? "text";
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

  if (resolvedVariant === "video") {
    return (
      <section className={`py-20 border-y border-border ${bgClasses[background]}`}>
        <Container>
          <SectionHeader
            badge={badgeText}
            title={heading || "Patient Testimonials"}
            titleClassName="text-4xl md:text-5xl"
            subtitle={description}
            subtitleClassName="text-lg"
            maxWidth={2}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((video, index) => {
              const videoIdentifier = video.id || video.videoId;

              return (
                <div key={videoIdentifier || index} className="group">
                  <div className="gradient-border group-hover:gradient-border-hover rounded-3xl h-full w-full transition-all duration-500">
                    <div className="gradient-border-inner rounded-[calc(1.5rem-4px)] overflow-hidden">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <VideoThumbnail video={video} />

                        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/30 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

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
            <DialogTitle className="sr-only">Patient Testimonial Video</DialogTitle>
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
  if (resolvedVariant === "video-detailed") {
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
            <SectionHeader
              title={heading}
              titleClassName="text-foreground"
              subtitle={description}
              subtitleClassName="text-muted-foreground"
            />
          )}

          {/* Video Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {videoTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="opacity-0 animate-fade-in-up group h-full"
                style={{ animationDelay: `${index * 150}ms` }}
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
                        <RatingStars rating={testimonial.rating} size="md" className="mb-4" />
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
              </div>
            ))}
          </div>

          {/* Optional CTA */}
          {videoTestimonials.length > 0 && (
            <div
              className="opacity-0 animate-fade-in-up text-center mt-12"
            >
              <p className="text-muted-foreground text-sm">
                All testimonials are from verified patients who underwent treatment at Dr. SNA Clinic
              </p>
            </div>
          )}
        </Container>
      </Section>
    );
  }

  if (variant === "carousel") {
    return (
      <section className={`py-20 ${bgClasses[background]}`}>
        <Container>
          <SectionHeader
            badge={badgeText}
            badgeIcon="star"
            title={heading || "Patient Testimonials"}
            titleClassName="text-4xl md:text-5xl text-foreground"
          />

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
                      <RatingStars rating={testimonial.rating || 5} size="lg" className="mb-4" />

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
                              sizes="48px"
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
        <SectionHeader
          badge={badgeText}
          badgeIcon="star"
          title={heading || "What Our Patients Say"}
          titleClassName="text-foreground"
          subtitle={description}
          subtitleClassName="text-muted-foreground text-lg"
          maxWidth={2}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={{
                ...testimonial,
                quote: testimonial.text || testimonial.content || testimonial.quote,
              }}
              variant="default"
              className="p-8 rounded-3xl"
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

