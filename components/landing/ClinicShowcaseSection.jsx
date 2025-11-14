"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Glow from "@/components/custom/ui/glow";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const defaultData = {
  badge: "Experience Excellence",
  title: "Your Sanctuary of",
  titleAccent: "Aesthetic Excellence",
  description:
    "Step inside our world-class clinic where luxury, privacy, and cutting-edge technology converge to create the perfect environment for your transformation",
  slides: [
    {
      src: "/images/drsnaclinic/showcase/clinic-1.jpg",
      title: "State-of-the-Art Reception",
      subtitle: "First Impressions That Last",
      description:
        "Welcome to our elegant reception area, where luxury meets comfort. Every detail is designed to put you at ease from the moment you arrive.",
    },
    {
      src: "/images/drsnaclinic/showcase/clinic-2.jpg",
      title: "Premium Treatment Rooms",
      subtitle: "Where Excellence Meets Comfort",
      description:
        "Our advanced treatment rooms combine cutting-edge medical equipment with a soothing ambiance, ensuring your complete comfort during every procedure.",
    },
    {
      src: "/images/drsnaclinic/showcase/clinic-3.jpg",
      title: "Private Consultation Suites",
      subtitle: "Your Journey Begins Here",
      description:
        "Discreet, private spaces where Dr Abbas takes the time to understand your aesthetic goals and create your personalized treatment plan.",
    },
    {
      src: "/images/drsnaclinic/showcase/clinic-4.jpg",
      title: "Prestigious London Location",
      subtitle: "Wimpole Street Excellence",
      description:
        "Located in the heart of London's medical district, our clinic sets the standard for aesthetic medicine in one of the world's most iconic locations.",
    },
    {
      src: "/images/drsnaclinic/showcase/clinic-5.jpg",
      title: "Sophisticated Waiting Area",
      subtitle: "Relaxation Redefined",
      description:
        "Unwind in our beautifully appointed waiting area, designed to help you feel relaxed and confident before your transformation journey.",
    },
  ],
};

export function ClinicShowcaseSection({ data }) {
  const sectionData = data
    ? {
        ...defaultData,
        ...data,
        slides: data.slides || defaultData.slides,
      }
    : defaultData;

  const slides = sectionData.slides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const contentLength = slides.length || 1;
  const activeContent = slides[activeIndex] || slides[0];

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % contentLength);
    }, 5000);

    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [contentLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % contentLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [contentLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + contentLength) % contentLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [contentLength]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + contentLength) % contentLength === index;
    const isRight = (activeIndex + 1) % contentLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
    };
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <Section background="muted" padding="none" className="relative overflow-hidden">
      <Glow variant="center" className="opacity-40" />

      <div className="relative py-20 md:py-32">
       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full mb-8"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {sectionData.badge}
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 px-4">
              {sectionData.title}
              {sectionData.titleAccent && (
                <span className="text-primary"> {sectionData.titleAccent}</span>
              )}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              {sectionData.description}
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] md:h-[500px]"
                style={{ perspective: "1000px" }}
                ref={imageContainerRef}
              >
                {slides.map((content, index) => (
                  <div
                    key={content.src}
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                    style={{ ...getImageStyle(index), transition: "all 0.8s cubic-bezier(.4,2,.3,1)" }}
                  >
                    <Image
                      src={content.src}
                      alt={content.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-between h-full"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-8"
                  >
                    <div>
                      <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">
                        {activeContent.subtitle}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                        {activeContent.title}
                      </h3>
                    </div>

                    <motion.p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {activeContent.description.split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                          style={{ display: "inline-block" }}
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-4 mt-10 md:mt-16">
                  <button
                    onClick={handlePrev}
                    onMouseEnter={() => setHoverPrev(true)}
                    onMouseLeave={() => setHoverPrev(false)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      hoverPrev
                        ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                        : "bg-card border-primary/30 text-foreground hover:border-primary/50"
                    }`}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    onMouseEnter={() => setHoverNext(true)}
                    onMouseLeave={() => setHoverNext(false)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      hoverNext
                        ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                        : "bg-card border-primary/30 text-foreground hover:border-primary/50"
                    }`}
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="flex items-center gap-2 ml-6">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
      </div>
    </Section>
  );
}
