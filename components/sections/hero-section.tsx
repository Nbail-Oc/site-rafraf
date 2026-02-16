"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";

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

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isMobile } = useMobileViewport();

  // On mobile, disable complex scroll animations
  const enableScrollAnimation = !isMobile;

  useEffect(() => {
    // Skip scroll listener on mobile
    if (!enableScrollAnimation) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enableScrollAnimation]);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations
  const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
  const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
  const sideWidth = imageProgress * 22; // 0% to 22%
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24; // 0px to 24px
  const gap = imageProgress * 16; // 0px to 16px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation - disabled on mobile */}
      <div className={`${enableScrollAnimation ? 'sticky top-0' : ''} h-screen overflow-hidden`}>
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container - simplified on mobile */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ 
              gap: `${enableScrollAnimation ? gap : 12}px`, 
              padding: `${enableScrollAnimation ? imageProgress * 16 : 16}px`, 
              paddingBottom: `${enableScrollAnimation ? 60 + (imageProgress * 40) : 60}px` 
            }}
          >
            
            {/* Left Column - hidden on mobile */}
            <div 
              className="flex-col will-change-transform hidden md:flex"
              style={{
                width: `${enableScrollAnimation ? sideWidth : 0}%`,
                gap: `${gap}px`,
                transform: `translateX(${enableScrollAnimation ? sideTranslateLeft : 0}%) translateY(${enableScrollAnimation ? sideTranslateY : 0}%)`,
                opacity: enableScrollAnimation ? sideOpacity : 0,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
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

            {/* Main Hero Image - Center - full width on mobile */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${enableScrollAnimation ? centerWidth : 100}%`,
                height: `${enableScrollAnimation ? centerHeight : 100}%`,
                flex: "0 0 auto",
                borderRadius: `${enableScrollAnimation ? borderRadius : 0}px`,
              }}
            >
              <Image
                src="/images/hero-main.jpg"
                alt="Fresh Indian vegetables and fruits beautifully arranged"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Text - Fades out first - responsive sizing */}
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: enableScrollAnimation ? textOpacity : 0 }}
              >
                <h1 className="w-full text-4xl md:text-6xl lg:text-[22vw] font-medium leading-[0.8] tracking-tighter text-white">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block ${enableScrollAnimation ? 'animate-[slideUp_0.8s_ease-out_forwards]' : ''} opacity-100 md:opacity-0`}
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: enableScrollAnimation ? 'all 1.5s cubic-bezier(0.86, 0, 0.07, 1)' : 'none',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column - hidden on mobile */}
            <div 
              className="flex-col will-change-transform hidden md:flex"
              style={{
                width: `${enableScrollAnimation ? sideWidth : 0}%`,
                gap: `${gap}px`,
                transform: `translateX(${enableScrollAnimation ? sideTranslateRight : 0}%) translateY(${enableScrollAnimation ? sideTranslateY : 0}%)`,
                opacity: enableScrollAnimation ? sideOpacity : 0,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
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

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation - reduced on mobile */}
      <div className={`${enableScrollAnimation ? 'h-[200vh]' : 'h-0'}`} />

      {/* Tagline Section - responsive spacing and text */}
      <div className={`px-4 py-16 md:px-12 md:py-28 lg:px-20 lg:pt-56 lg:pb-44 ${enableScrollAnimation ? 'pt-32 pb-28 md:pt-48 md:pb-36' : 'pt-20 pb-24'}`}>
        <p className="mx-auto max-w-3xl text-center text-lg md:text-2xl lg:text-3xl leading-relaxed md:leading-relaxed lg:leading-snug text-muted-foreground text-balance">
          Premium Fresh Produce.
          <br />
          From Indian Farms to Global Markets.
        </p>
      </div>
    </section>
  );
}
