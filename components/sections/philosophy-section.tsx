"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [alpineTranslateX, setAlpineTranslateX] = useState(-100);
  const [forestTranslateX, setForestTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);
  const { isMobile } = useMobileViewport();

  // On mobile, disable complex scroll animations
  const enableScrollAnimation = !isMobile;

  const updateTransforms = useCallback(() => {
    if (!enableScrollAnimation || !sectionRef.current) {
      // Reset to initial state on mobile
      setAlpineTranslateX(-100);
      setForestTranslateX(100);
      setTitleOpacity(1);
      return;
    }
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    
    // Alpine comes from left (-100% to 0%)
    setAlpineTranslateX((1 - progress) * -100);
    
    // Forest comes from right (100% to 0%)
    setForestTranslateX((1 - progress) * 100);
    
    // Title fades out as blocks come together
    setTitleOpacity(1 - progress);
  }, [enableScrollAnimation]);

  useEffect(() => {
    // Skip animation on mobile
    if (!enableScrollAnimation) {
      updateTransforms();
      return;
    }

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms, enableScrollAnimation]);

  return (
    <section id="products" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: enableScrollAnimation ? "200vh" : "auto" }}>
        <div className={`${enableScrollAnimation ? 'sticky top-0' : ''} h-screen flex items-center justify-center`}>
          <div className="relative w-full">
            {/* Title - positioned behind the blocks - responsive sizing */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: enableScrollAnimation ? titleOpacity : 0 }}
            >
              <h2 className="text-3xl md:text-6xl lg:text-[8vw] font-medium leading-[0.95] tracking-tighter text-foreground text-center px-6 text-balance">
                Farm Fresh. Export Ready.
              </h2>
            </div>

            {/* Product Grid - stack vertically on mobile */}
            <div className="relative z-10 grid grid-cols-1 gap-3 md:gap-4 px-4 md:grid-cols-2 md:px-12 lg:px-20">
              {/* Alpine Image - comes from left - no animation on mobile */}
              <div 
                className="relative aspect-[4/3] overflow-hidden rounded-lg md:rounded-2xl"
                style={{
                  transform: `translate3d(${enableScrollAnimation ? alpineTranslateX : 0}%, 0, 0)`,
                  WebkitTransform: `translate3d(${enableScrollAnimation ? alpineTranslateX : 0}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transition: enableScrollAnimation ? 'none' : 'transform 0.3s ease-out',
                }}
              >
                <Image
                  src="/images/product-vegetables.jpg"
                  alt="Premium Indian vegetables in export packaging"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                    Vegetables
                  </span>
                </div>
              </div>

              {/* Forest Image - comes from right - no animation on mobile */}
              <div 
                className="relative aspect-[4/3] overflow-hidden rounded-lg md:rounded-2xl"
                style={{
                  transform: `translate3d(${enableScrollAnimation ? forestTranslateX : 0}%, 0, 0)`,
                  WebkitTransform: `translate3d(${enableScrollAnimation ? forestTranslateX : 0}%, 0, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transition: enableScrollAnimation ? 'none' : 'transform 0.3s ease-out',
                }}
              >
                <Image
                  src="/images/product-fruits.jpg"
                  alt="Premium Indian fruits - pomegranates, grapes, and bananas"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white">
                    Fruits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description - responsive padding and text */}
      <div className={`px-4 py-12 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14 ${enableScrollAnimation ? '' : 'py-20'}`}>
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Direct from Source
          </p>
          <p className="mt-6 md:mt-8 leading-relaxed text-muted-foreground text-lg md:text-2xl lg:text-3xl text-center text-balance">
            RafRaf International connects premium Indian produce directly with UAE businesses. 
            We partner with trusted farmers to deliver fresh, organic vegetables and fruits that meet international quality standards.
          </p>
        </div>
      </div>
    </section>
  );
}
