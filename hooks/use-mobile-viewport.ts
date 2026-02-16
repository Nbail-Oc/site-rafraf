import { useEffect, useState } from 'react';

/**
 * Hook to detect if the device is mobile or tablet
 * Breakpoints: mobile < 768px, tablet 768px-1024px, desktop >= 1024px
 */
export function useMobileViewport() {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewport('mobile');
      } else if (width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { viewport, isMobile: viewport === 'mobile', isTablet: viewport === 'tablet', isMounted };
}

/**
 * Hook to detect if device prefers reduced motion OR is on mobile
 * Returns true if animations should be disabled
 */
export function useDisableAnimationOnMobile() {
  const [shouldDisable, setShouldDisable] = useState(false);
  const { isMobile } = useMobileViewport();
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    setShouldDisable(isMobile || prefersReducedMotion);
  }, [isMobile, prefersReducedMotion]);

  return shouldDisable;
}
