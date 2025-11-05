"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { useState } from "react";

export function VideoBlock({ data }) {
  const { title, subtitle, description, videos = [], layout = "grid", featureContent, enabled = true } = data;
  const [playing, setPlaying] = useState({});

  if (!enabled || !videos || videos.length === 0) return null;

  const handlePlay = (index) => {
    setPlaying({ [index]: true });
  };

  // Feature Layout: Text + Video side by side
  if (layout === "feature" && videos[0]) {
    const video = videos[0];
    const videoOnLeft = featureContent?.videoSide === "left";

    return (
      <Section background="gradient-cream">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: videoOnLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={videoOnLeft ? "lg:order-first" : "lg:order-last"}
            >
              <VideoPlayer
                video={video}
                isPlaying={!!playing[0]}
                onPlay={() => handlePlay(0)}
                size="md"
              />
              {video.title && (
                <p className="mt-4 text-center text-dark-brown/70 font-medium">
                  {video.title}
                </p>
              )}
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: videoOnLeft ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={videoOnLeft ? "lg:order-last" : "lg:order-first"}
            >
              <div className="space-y-6">
                {featureContent?.title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown">
                    {featureContent.title}
                  </h2>
                )}
                {featureContent?.description && (
                  <p className="text-lg text-dark-brown/70 leading-relaxed">
                    {featureContent.description}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    );
  }

  // Single Large Video
  if (layout === "single" && videos[0]) {
    const video = videos[0];
    
    return (
      <Section background="white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {(title || subtitle) && (
              <div className="text-center mb-12">
                {title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-4">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-lg md:text-xl text-dark-brown/60">
                    {subtitle}
                  </p>
                )}
              </div>
            )}

            <VideoPlayer
              video={video}
              isPlaying={!!playing[0]}
              onPlay={() => handlePlay(0)}
              size="lg"
              className="rounded-3xl"
            />

            {description && (
              <p className="mt-6 text-center text-dark-brown/70 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        </Container>
      </Section>
    );
  }

  // Grid Layout: Multiple Videos
  return (
    <Section background="gradient-cream">
      <Container>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-dark-brown/60 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <VideoPlayer
                  video={video}
                  isPlaying={!!playing[index]}
                  onPlay={() => handlePlay(index)}
                  size="sm"
                  className="rounded-none"
                />
                {(video.title || video.description) && (
                  <div className="p-6">
                    {video.title && (
                      <h3 className="text-xl font-heading font-bold text-dark-brown mb-2">
                        {video.title}
                      </h3>
                    )}
                    {video.description && (
                      <p className="text-dark-brown/70">
                        {video.description}
                      </p>
                    )}
                    {video.duration && (
                      <p className="text-sm text-dark-brown/50 mt-2">
                        Duration: {video.duration}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

