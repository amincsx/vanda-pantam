"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ShinyText from './ShinyText';

export default function HorizontalAlbum() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const isMobile = viewportWidth < 768;

  // Reduced images for faster initial loading (show first 8 images)
  const images = [
    '2.webp',
    '3.webp',
    '4.webp',
    '5.webp',
    '6.webp',
    '7.webp',
    '8.webp',
    '9.webp'
  ];

  // Persian texts
  const persianTexts = [
    "persian ones"
  ];

  useEffect(() => {
    // Set initial viewport width
    setViewportWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('vanda-has-visited');

    if (hasVisited) {
      // Not first visit - show album immediately
      setIsVisible(true);
    } else {
      // First visit - show album after 500ms (faster than before)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let currentProgress = 0;
    let targetProgress = 0;
    let isAnimating = false;
    let lastScrollTime = 0;

    const handleScroll = () => {
      const now = Date.now();
      // Throttle scroll events to 60fps max
      if (now - lastScrollTime < 16) return;
      lastScrollTime = now;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress more accurately
      const maxScroll = documentHeight - windowHeight;
      const rawProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // Use more direct progress for better accuracy
      targetProgress = rawProgress;

      // Start animation if not already running
      if (!isAnimating) {
        startAnimation();
      }
    };

    const startAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      animate();
    };

    const animate = () => {
      // Smooth interpolation between current and target progress
      const diff = targetProgress - currentProgress;
      const damping = 0.15; // Increased for faster response

      currentProgress += diff * damping;
      setScrollProgress(currentProgress);

      // Continue animating if there's still significant difference
      if (Math.abs(diff) > 0.005) { // Increased threshold for less precision but better performance
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Snap to final position for precision
        currentProgress = targetProgress;
        setScrollProgress(currentProgress);
        isAnimating = false;
        animationFrameId = null;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      {/* Ultra-light Album Section - Only scroll movement and borders */}
      <div
        className={`absolute left-0 right-0 z-30 transition-all duration-1000 ease-in-out overflow-visible ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        style={{
          height: isMobile ? '160px' : '280px',
          top: 'calc(120vh - 40px)'
        }}
      >
        {/* Glass borders for top and bottom */}
        <div
          className="absolute left-0 right-0 z-40 pointer-events-none"
          style={{
            height: '7px',
            top: '-5px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)',
            backdropFilter: 'blur(5px)'
          }}
        />
        <div
          className="absolute left-0 right-0 z-40 pointer-events-none"
          style={{
            height: '7px',
            bottom: '-5px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)',
            backdropFilter: 'blur(5px)'
          }}
        />

        {/* Album container with scroll-based movement */}
        <div
          className="flex relative z-50"
          style={{
            width: `${images.length * (isMobile ? 300 : 600)}px`,
            height: isMobile ? '160px' : '280px',
            transform: `translate3d(${scrollProgress * Math.min(0, viewportWidth - images.length * (isMobile ? 300 : 600)) * 0.3}px, 0, 0)`,
            gap: '0px',
            padding: '0px',
            willChange: 'transform'
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative"
              style={{
                width: isMobile ? '300px' : '600px',
                height: isMobile ? '160px' : '280px',
                marginLeft: index > 0 ? '-2px' : '0px'
              }}
            >
              {/* Simple image without any effects */}
              <Image
                src={`/${image}`}
                alt={`Album image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 250px, 500px"
                priority={index < 2}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
