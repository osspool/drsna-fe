import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function durationToISO(duration) {
  if (!duration) return null;
  const match = duration.toLowerCase().match(/(\d+)\s*(hour|hr|hours|minute|min|mins)/);
  if (!match) return null;
  const value = parseInt(match[1], 10);
  if (Number.isNaN(value)) return null;
  const unit = match[2];
  if (unit.startsWith("hour") || unit.startsWith("hr")) {
    return `PT${value}H`;
  }
  return `PT${value}M`;
}


export function getYouTubeId(url = "") {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }
    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }
    const pathSegments = parsed.pathname.split("/").filter(Boolean);
    if (parsed.hostname.includes("youtube.com") && pathSegments[0] === "embed") {
      return pathSegments[1];
    }
  } catch (error) {
    return null;
  }
  return null;
}

export function getYouTubeThumbnailUrl(videoId, { orientationHint } = {}) {
  if (!videoId) return null;
  const preferPortrait = orientationHint === "portrait";
  const candidates = preferPortrait
    ? [
        `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      ]
    : [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
      ];
  return candidates[0];
}
