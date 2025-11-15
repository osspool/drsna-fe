"use client";

import { Play } from "lucide-react";
import { useImageOrientation } from "@/hooks/use-image-orientation";
import { cn, getYouTubeId, getYouTubeThumbnailUrl } from "@/lib/utils";

const PLAY_BUTTON_SIZES = {
  lg: "w-24 h-24",
  md: "w-20 h-20",
  sm: "w-16 h-16",
};

const PLAY_ICON_SIZES = {
  lg: "w-10 h-10",
  md: "w-8 h-8",
  sm: "w-6 h-6",
};

export function VideoPlayer({ video = {}, isPlaying = false, onPlay, size = "md", className = "" }) {
  const videoId = getYouTubeId(video.url);
  const PORTRAIT_DEFAULT_SCALE = 4;
  const manualOrientation =
    video.orientation || (typeof video.isPortrait === "boolean" ? (video.isPortrait ? "portrait" : "landscape") : undefined);
  const initialThumbnail = video.thumbnail || (videoId ? getYouTubeThumbnailUrl(videoId, { orientationHint: manualOrientation }) : null);
  const orientation = useImageOrientation(initialThumbnail);
  const resolvedOrientation = manualOrientation || orientation;
  const isPortraitThumbnail = resolvedOrientation === "portrait";
  const thumbnail =
    video.thumbnail || (videoId ? getYouTubeThumbnailUrl(videoId, { orientationHint: resolvedOrientation }) : null);

  const computeBackgroundSize = () => {
    if (!isPortraitThumbnail) return "cover";
    const widthPercent = Math.max(baseScale * 100, 400);
    return `${widthPercent}% auto`;
  };

  const baseScale =
    typeof video.thumbnailZoom === "number"
      ? video.thumbnailZoom
      : isPortraitThumbnail
        ? PORTRAIT_DEFAULT_SCALE
        : 1;

  const handlePlay = () => {
    if (typeof onPlay === "function") {
      onPlay();
    }
  };

  if (!video?.url) return null;

  return (
    <div className={cn("group relative aspect-video overflow-hidden shadow-2xl bg-secondary/10", className)}>
      {isPlaying ? (
        videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title || "Clinic video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <video
            src={video.url}
            controls
            autoPlay
            poster={thumbnail || undefined}
            className="w-full h-full object-cover"
          />
        )
      ) : (
        <>
          {thumbnail ? (
            <div
              className="absolute inset-0 overflow-hidden"
              aria-label={video.title || "Video thumbnail"}
            >
              <div
                className="h-full w-full transition-[background-size] duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${thumbnail})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: computeBackgroundSize(),
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
            aria-label={`Play ${video.title || "video"}`}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full bg-primary/90 hover:bg-primary transition-all duration-300 hover:scale-110 shadow-2xl",
                PLAY_BUTTON_SIZES[size]
              )}
            >
              <Play className={cn(PLAY_ICON_SIZES[size], "text-primary-foreground ml-1")} fill="currentColor" />
            </div>
          </button>
        </>
      )}
    </div>
  );
}
