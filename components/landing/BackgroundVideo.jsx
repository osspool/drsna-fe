"use client";

import React, { useState, useEffect } from "react";

export default function BackgroundVideo({
  url = "https://www.youtube.com/watch?v=nUqENQZHd80",
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(url);

  useEffect(() => {
    // Mark as loaded after mount
    setIsLoaded(true);
  }, []);

  if (!videoId) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* YouTube iframe */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
        title="Background video"
        allow="autoplay; encrypted-media"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "56.25vw", // 16:9 aspect ratio
          minHeight: "100vh",
          minWidth: "177.77vh", // 16:9 aspect ratio
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          border: "none",
        }}
      />

      {/* Dark overlay for better text contrast */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,.3) 100%)",
          zIndex: 1,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
}
