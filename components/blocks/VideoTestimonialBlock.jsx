"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Quote, Star } from "lucide-react";
import { useState } from "react";

export function VideoTestimonialBlock({ data }) {
  const { 
    title = "What Our Patients Say", 
    subtitle,
    testimonials = [], 
    background = "gradient-cream",
    enabled = true 
  } = data;
  
  const [playing, setPlaying] = useState({});

  if (!enabled || !testimonials || testimonials.length === 0) return null;

  const handlePlay = (index) => {
    setPlaying({ [index]: true });
  };

  return (
    <Section background={background}>
      <Container>
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Video Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
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
                      "{testimonial.quote}"
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
        {testimonials.length > 0 && (
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

