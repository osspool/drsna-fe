import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
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
