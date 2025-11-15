import { useEffect, useState } from "react";

export function useImageOrientation(src) {
  const [orientation, setOrientation] = useState("landscape");

  useEffect(() => {
    if (!src) {
      setOrientation("landscape");
      return;
    }

    let cancelled = false;
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      if (cancelled) return;
      setOrientation(image.naturalHeight > image.naturalWidth ? "portrait" : "landscape");
    };
    image.onerror = () => {
      if (!cancelled) {
        setOrientation("landscape");
      }
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return orientation;
}
