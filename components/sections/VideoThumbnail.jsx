import { useImageOrientation } from "@/hooks/use-image-orientation";
import { getYouTubeThumbnailUrl } from "@/lib/utils";

export function VideoThumbnail({ video }) {
  const videoIdentifier = video.id || video.videoId;
  const manualOrientation =
    video.orientation || (typeof video.isPortrait === "boolean" ? (video.isPortrait ? "portrait" : "landscape") : undefined);
  const initialThumbnail =
    video.thumbnail || (videoIdentifier ? getYouTubeThumbnailUrl(videoIdentifier, { orientationHint: manualOrientation }) : null);
  const orientation = useImageOrientation(initialThumbnail);
  const resolvedOrientation = manualOrientation || orientation;
  const isPortrait = resolvedOrientation === "portrait";
  const PORTRAIT_DEFAULT_SCALE = 4;
  
  // Check if it's a local image (custom thumbnail)
  const isLocalImage = video.thumbnail && video.thumbnail.startsWith('/');

  const baseScale =
    typeof video.thumbnailZoom === "number"
      ? video.thumbnailZoom
      : isPortrait && !isLocalImage // Only apply default portrait scale if it's NOT a local image
        ? PORTRAIT_DEFAULT_SCALE
        : 1;
        
  const thumbnailSrc =
    video.thumbnail || (videoIdentifier ? getYouTubeThumbnailUrl(videoIdentifier, { orientationHint: resolvedOrientation }) : null);
    
  const computeBackgroundSize = () => {
    if (isLocalImage) return "cover"; // Always cover for local images
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
