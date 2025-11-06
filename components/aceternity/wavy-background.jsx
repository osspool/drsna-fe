"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  let w,
    h,
    nt,
    i,
    x,
    ctx,
    canvas;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const resolvedColorsRef = useRef([]);
  const resolvedBackgroundRef = useRef("#ffffff");

  // Helper function to resolve CSS variables and hsl() colors
  const resolveColor = (colorString) => {
    if (!colorString) return null;

    try {
      // Create a temporary element to compute the color
      const testDiv = document.createElement('div');
      testDiv.style.backgroundColor = colorString;
      testDiv.style.display = 'none';
      document.body.appendChild(testDiv);
      const computedColor = window.getComputedStyle(testDiv).backgroundColor;
      document.body.removeChild(testDiv);

      // Return the computed color if valid
      if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)' && computedColor !== 'transparent') {
        console.log('✅ Color resolved:', colorString, '→', computedColor);
        return computedColor;
      } else {
        console.warn('⚠️ Color resolution returned transparent:', colorString);
        return null;
      }
    } catch (e) {
      console.error('❌ Failed to resolve color:', colorString, e);
      return null;
    }
  };

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    if (!canvas) {
      console.error('❌ Canvas ref is null');
      return;
    }

    ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error('❌ Could not get canvas context');
      return;
    }

    const container = containerRef.current;

    // Use container dimensions instead of window dimensions
    if (container) {
      w = ctx.canvas.width = container.offsetWidth;
      h = ctx.canvas.height = container.offsetHeight;
      console.log('📐 Canvas initialized with container dimensions:', w, 'x', h);
    } else {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      console.log('📐 Canvas initialized with window dimensions:', w, 'x', h);
    }

    if (w === 0 || h === 0) {
      console.warn('⚠️ Canvas has zero dimensions!');
      return;
    }

    ctx.filter = `blur(${blur}px)`;
    nt = 0;

    console.log('🎬 Starting animation with', resolvedColorsRef.current.length || waveColors.length, 'colors');

    // Improved resize handler with debouncing
    let resizeTimeout;
    window.onresize = function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (container) {
          w = ctx.canvas.width = container.offsetWidth;
          h = ctx.canvas.height = container.offsetHeight;
        } else {
          w = ctx.canvas.width = window.innerWidth;
          h = ctx.canvas.height = window.innerHeight;
        }
        ctx.filter = `blur(${blur}px)`;
      }, 100);
    };
    render();
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      const colorArray = resolvedColorsRef.current.length > 0 ? resolvedColorsRef.current : waveColors;
      ctx.strokeStyle = colorArray[i % colorArray.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId;
  const render = () => {
    if (!ctx) return;

    // Draw background at full opacity
    ctx.globalAlpha = 1;
    ctx.fillStyle = resolvedBackgroundRef.current || "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // Draw waves with specified opacity
    ctx.globalAlpha = waveOpacity || 0.5;
    drawWave(5);

    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    // Delay to ensure CSS is loaded and DOM is ready
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        console.log('🎨 Starting color resolution...');

        // Resolve wave colors
        const newColors = waveColors.map(color => {
          const resolved = resolveColor(color);
          return resolved || color; // Fallback to original if resolution fails
        });

        // Resolve background color
        const newBackground = resolveColor(backgroundFill) || backgroundFill || "#ffffff";
        console.log('🖼️ Background resolved:', backgroundFill, '→', newBackground);

        resolvedColorsRef.current = newColors;
        resolvedBackgroundRef.current = newBackground;

        // Initialize canvas after colors are resolved
        setTimeout(() => {
          init();
        }, 50);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Re-resolve colors when theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      console.log('🌓 Theme changed, re-resolving colors...');
      if (typeof window !== 'undefined') {
        const newColors = waveColors.map(color => resolveColor(color) || color);
        const newBackground = resolveColor(backgroundFill) || backgroundFill || "#ffffff";
        resolvedColorsRef.current = newColors;
        resolvedBackgroundRef.current = newBackground;
      }
    };

    // Listen for class changes on html/body for theme switching
    const observer = new MutationObserver(handleThemeChange);
    const targetNode = document.documentElement;
    observer.observe(targetNode, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, [backgroundFill]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen flex flex-col items-center justify-center relative overflow-hidden w-full",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 w-full h-full"
        ref={canvasRef}
        id="canvas"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
