"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ShinyText from './ShinyText';

export default function HorizontalAlbum() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
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
    // Set initial viewport dimensions
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);

    // Handle window resize
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
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
      // First visit - show album after 500ms
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Automatic looping animation instead of scroll-based
    let animationFrameId: number | null = null;
    let startTime: number | null = null;
    const duration = 20000; // 20 seconds for full cycle

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate progress (0 to 1 and back)
      const cycle = (elapsed % duration) / duration;
      const progress = Math.sin(cycle * Math.PI * 2) * 0.5 + 0.5; // Smooth sine wave

      setScrollProgress(progress);

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation when visible
    if (isVisible) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible]);

  return (
    <>
      {/* Ultra-light Album Section - Only scroll movement and borders */}
      <div
        className={`absolute left-0 right-0 z-20 transition-all duration-1000 ease-in-out overflow-visible ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        style={{
          height: isMobile ? '160px' : '280px',
          // Smart positioning based on viewport dimensions to prevent overlap
          top: (() => {
            // Calculate dynamic positioning based on both width and height
            const baseOffset = Math.min(viewportHeight * 0.1, 100); // Reduced offset

            if (viewportWidth >= 3840) {
              // 4K+ screens: position slightly lower
              return `calc(80vh - ${baseOffset}px)`;
            } else if (viewportWidth >= 2560) {
              // 1440p+ screens: adjust positioning
              return `calc(90vh - ${Math.min(baseOffset, 60)}px)`;
            } else if (viewportWidth >= 1920) {
              // 1080p+ screens: fine-tune position
              return `calc(100vh - 50px)`;
            } else {
              // Standard screens
              return `calc(120vh - 40px)`;
            }
          })()
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
