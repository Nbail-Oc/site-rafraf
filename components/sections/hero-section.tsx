"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const word = "RafRaf";

const sideImages = [
  {
    src: "/images/farm-field.jpg",
    alt: "Lush Indian agricultural farmland",
    position: "left",
    span: 1,
  },
  {
    src: "/images/farmers-harvest.jpg",
    alt: "Farmers harvesting fresh produce",
    position: "left",
    span: 1,
  },
  {
    src: "/images/packing-facility.jpg",
    alt: "Modern cold storage packing facility",
    position: "right",
    span: 1,
  },
  {
    src: "/images/export-logistics.jpg",
    alt: "Export cargo logistics",
    position: "right",
    span: 1,
  },
];

// Responsive animation configuration
const getAnimationConfig = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  
  if (width < 768) {
    return {
      screenSize: 'mobile',
      centerShrinkTarget: 0.55,
      sideColumnWidth: 0,
      gap: 0,
      borderRadiusTarget: 16,
      textFadeEndPercent: 0.15,
      enableSideAnimation: false,
    };
  }
  
  if (width < 1024) {
    return {
      screenSize: 'tablet',
      centerShrinkTarget: 0.48,
      sideColumnWidth: 0.12,
      gap: 8,
      borderRadiusTarget: 20,
      textFadeEndPercent: 0.18,
      enableSideAnimation: true,
    };
  }
  
  return {
    screenSize: 'desktop',
    centerShrinkTarget: 0.42,
    sideColumnWidth: 0.22,
    gap: 16,
    borderRadiusTarget: 24,
    textFadeEndPercent: 0.20,
    enableSideAnimation: true,
  };
};

// Calculate actual pixel dimensions instead of percentages
const calculateDimensions = (scrollProgress: number, config: ReturnType<typeof getAnimationConfig>) => {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
  
  // Text fades out first
  const textFadeProgress = Math.min(scrollProgress / config.textFadeEndPercent, 1);
  const textOpacity = Math.max(0, 1 - textFadeProgress);
  
  // Image transforms start after text fades
  const imageProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - config.textFadeEndPercent) / (1 - config.textFadeEndPercent))
  );
  
  if (!config.enableSideAnimation) {
    // MOBILE: Simple center image animation
    const finalWidth = viewportWidth * config.centerShrinkTarget;
    const currentWidth = viewportWidth - (imageProgress * (viewportWidth - finalWidth));
    const finalHeight = viewportHeight * 0.7;
    const currentHeight = viewportHeight - (imageProgress * (viewportHeight - finalHeight));
    
    return {
      textOpacity,
      centerWidth: currentWidth,
      centerHeight: currentHeight,
      sideLeftWidth: 0,
      sideRightWidth: 0,
      leftTranslateX: 0,
      rightTranslateX: 0,
      sideTranslateY: 0,
      sideOpacity: 0,
      borderRadius: imageProgress * config.borderRadiusTarget,
      gap: 0,
      enableSideAnimation: false,
    };
  }
  
  // DESKTOP/TABLET: Full multi-column animation
  const finalCenterWidth = (viewportWidth - config.gap * 2) * config.centerShrinkTarget;
  const currentCenterWidth = viewportWidth - (imageProgress * (viewportWidth - finalCenterWidth));
  
  const finalHeight = viewportHeight * 0.7;
  const currentHeight = viewportHeight - (imageProgress * (viewportHeight - finalHeight));
  
  const finalSideWidth = (viewportWidth - config.gap * 2) * config.sideColumnWidth;
  const currentSideWidth = imageProgress * finalSideWidth;
  
  const sideOpacity = imageProgress;
  const leftTranslateX = -100 + (imageProgress * 100);
  const rightTranslateX = 100 - (imageProgress * 100);
  const sideTranslateY = -(imageProgress * 15);
  const gap = imageProgress * config.gap;
  
  return {
    textOpacity,
    centerWidth: currentCenterWidth,
    centerHeight: currentHeight,
    sideLeftWidth: currentSideWidth,
    sideRightWidth: currentSideWidth,
    leftTranslateX,
    rightTranslateX,
    sideTranslateY,
    sideOpacity,
    borderRadius: imageProgress * config.borderRadiusTarget,
    gap,
    enableSideAnimation: true,
  };
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [config, setConfig] = useState(getAnimationConfig());
  const rafRef = useRef<number | null>(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newConfig = getAnimationConfig();
      if (newConfig.screenSize !== config.screenSize) {
        setConfig(newConfig);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [config.screenSize]);

  // Calculate scroll progress
  const updateScrollProgress = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = window.innerHeight * 2;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
    
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollProgress]);

  const dimensions = calculateDimensions(scrollProgress, config);
  const {
    textOpacity,
    centerWidth,
    centerHeight,
    sideLeftWidth,
    sideRightWidth,
    leftTranslateX,
    rightTranslateX,
    sideTranslateY,
    borderRadius,
    gap,
    sideOpacity,
  } = dimensions;

  return (
    <section ref={sectionRef} className="relative bg-background w-full overflow-hidden">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container - FIXED: No padding that causes overflow */}
          <div 
            className="relative flex h-full items-center justify-center gap-0"
            style={{ 
              width: '100%',
              maxWidth: '100vw',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            
            {/* Left Column - hidden on mobile */}
            {config.enableSideAnimation && sideOpacity > 0 && (
              <div 
                className="flex flex-col flex-shrink-0 will-change-transform"
                style={{
                  width: `${sideLeftWidth}px`,
                  height: '100%',
                  gap: `${gap}px`,
                  paddingLeft: config.enableSideAnimation ? `${gap}px` : '0px',
                  paddingRight: config.enableSideAnimation ? `${gap / 2}px` : '0px',
                  transform: `translateX(${leftTranslateX}px) translateY(${sideTranslateY}%)`,
                  opacity: sideOpacity,
                  minWidth: 0,
                }}
              >
                {sideImages.filter(img => img.position === "left").map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative overflow-hidden will-change-transform flex-1"
                    style={{
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Center Image */}
            <div 
              className="relative overflow-hidden will-change-transform flex-shrink-0"
              style={{
                width: `${centerWidth}px`,
                height: `${centerHeight}px`,
                borderRadius: `${borderRadius}px`,
                marginLeft: config.enableSideAnimation ? `${gap}px` : '0px',
                marginRight: config.enableSideAnimation ? `${gap}px` : '0px',
                transition: 'border-radius 0.02s linear',
              }}
            >
              <Image
                src="/images/hero-main.jpg"
                alt="Fresh Indian vegetables and fruits beautifully arranged"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Text */}
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-4xl md:text-6xl lg:text-[22vw] font-medium leading-[0.8] tracking-tighter text-white pb-4 lg:pb-8">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards]"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column - hidden on mobile */}
            {config.enableSideAnimation && sideOpacity > 0 && (
              <div 
                className="flex flex-col flex-shrink-0 will-change-transform"
                style={{
                  width: `${sideRightWidth}px`,
                  height: '100%',
                  gap: `${gap}px`,
                  paddingLeft: config.enableSideAnimation ? `${gap / 2}px` : '0px',
                  paddingRight: config.enableSideAnimation ? `${gap}px` : '0px',
                  transform: `translateX(${rightTranslateX}px) translateY(${sideTranslateY}%)`,
                  opacity: sideOpacity,
                }}
              >
                {sideImages.filter(img => img.position === "right").map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative overflow-hidden will-change-transform flex-1"
                    style={{
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Tagline Section */}
      <div className="px-4 py-16 pt-20 pb-24 md:px-12 md:py-28 md:pt-32 md:pb-28 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-3xl text-center text-lg md:text-2xl lg:text-3xl leading-relaxed md:leading-relaxed lg:leading-snug text-muted-foreground text-balance">
          Premium Fresh Produce.
          <br />
          From Indian Farms to Global Markets.
        </p>
      </div>
    </section>
  );
}
