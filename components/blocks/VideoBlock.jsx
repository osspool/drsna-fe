"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useState } from "react";
import { generateStableKey } from "@/lib/utils";

export function VideoBlock({ data }) {
  const {
    title,
    subtitle,
    description,
    videos = [],
    layout = "grid",
    featureContent,
    enabled = true,
  } = data;
  const [playing, setPlaying] = useState({});

  if (!enabled || !videos || videos.length === 0) return null;

  const handlePlay = (index) => {
    setPlaying({ [index]: true });
  };

  // Feature Layout: Text + Video side by side
  if (layout === "feature" && videos[0]) {
    const video = videos[0];
    const videoOnLeft = featureContent?.videoSide === "left";
    const contentTitle = featureContent?.title ?? title;
    const contentSubtitle = featureContent?.subtitle ?? subtitle;
    const contentDescription = featureContent?.description ?? description;
    const highlights = featureContent?.highlights || [];
    const hasContent =
      contentTitle || contentSubtitle || contentDescription || highlights.length > 0;

    return (
      <Section background="gradient-cream">
        <Container>
          <div
            className={`grid gap-12 items-center ${
              hasContent ? "lg:grid-cols-2" : "justify-center"
            }`}
          >
            <div
              className={`opacity-0 ${
                videoOnLeft
                  ? "animate-slide-in-left lg:order-first"
                  : hasContent
                  ? "animate-slide-in-right lg:order-last"
                  : "animate-fade-in-up"
              }`}
            >
              <VideoPlayer
                video={video}
                isPlaying={!!playing[0]}
                onPlay={() => handlePlay(0)}
                size={hasContent ? "md" : "lg"}
              />
              {video.title && (
                <p className="mt-4 text-center text-muted-foreground font-medium">
                  {video.title}
                </p>
              )}
            </div>

            {hasContent && (
              <div
                className={`opacity-0 ${
                  videoOnLeft
                    ? "animate-slide-in-right lg:order-last"
                    : "animate-slide-in-left lg:order-first"
                }`}
              >
                <div className="space-y-6">
                  <SectionHeader
                    title={contentTitle}
                    subtitle={contentSubtitle}
                    subtitleClassName="text-muted-foreground"
                    align="left"
                    spacing="sm"
                    animate={false}
                  />
                  {contentDescription && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {contentDescription}
                    </p>
                  )}
                  {highlights.length > 0 && (
                    <ul className="space-y-3">
                      {highlights.map((item, index) => (
                        <li
                          key={generateStableKey(item, index, "video-highlight")}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
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
          <div className="opacity-0 animate-fade-in-up max-w-5xl mx-auto">

            {(title || subtitle) && (
              <div className="text-center mb-12">
                {title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-lg md:text-xl text-muted-foreground">
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
              <p className="mt-6 text-center text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </Container>
      </Section>
    );
  }

  // Grid Layout: Multiple Videos
  return (
    <Section background="gradient-cream">
      <Container>
        {(title || subtitle) && (
          <div className="opacity-0 animate-fade-in-up text-center mb-12">

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
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={generateStableKey(video, index, "video-grid-item")}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                        {video.title}
                      </h3>
                    )}
                    {video.description && (
                      <p className="text-muted-foreground">
                        {video.description}
                      </p>
                    )}
                    {video.duration && (
                      <p className="text-sm text-muted-foreground/80 mt-2">
                        Duration: {video.duration}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

