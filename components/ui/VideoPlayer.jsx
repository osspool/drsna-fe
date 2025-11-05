"use client";

import { Play } from "lucide-react";
import { cn, getYouTubeId } from "@/lib/utils";

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
  // Use maxresdefault for best quality, fall back to hqdefault which is more reliable
  const thumbnail = video.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null);

  const handlePlay = () => {
    if (typeof onPlay === "function") {
      onPlay();
    }
  };

  if (!video?.url) return null;

  return (
    <div className={cn("relative aspect-video overflow-hidden shadow-2xl bg-dark-brown/10", className)}>
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
            <img src={thumbnail} alt={video.title || "Video thumbnail"} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-dark-brown/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/70 via-transparent to-transparent" />
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            aria-label={`Play ${video.title || "video"}`}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full bg-gold/90 hover:bg-gold transition-all duration-300 hover:scale-110",
                PLAY_BUTTON_SIZES[size]
              )}
            >
              <Play className={cn(PLAY_ICON_SIZES[size], "text-white ml-1")} fill="white" />
            </div>
          </button>
        </>
      )}
    </div>
  );
}
