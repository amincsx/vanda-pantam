"use client";

import { useState, useEffect } from 'react';

export default function VandaLogo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInPosition, setIsInPosition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check mobile viewport and large screen
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLargeScreen(width >= 1800);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Show logo immediately
    setIsVisible(true);
    setIsInPosition(true);
  }, []);

  useEffect(() => {
    // Listen for navigation hover events
    const handleNavHover = (event: CustomEvent) => {
      setIsHovered(event.detail.hovering);
    };

    window.addEventListener('navHover', handleNavHover as EventListener);

    return () => {
      window.removeEventListener('navHover', handleNavHover as EventListener);
    };
  }, []);


  return (
    <div
      className={`absolute z-40 transition-all duration-[3000ms] ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'
        } ${isInPosition
          ? isHovered
            ? `${isMobile ? 'top-4' : 'top-4'} left-1/2 transform -translate-x-1/2`
            : `${isMobile ? 'top-17' : 'top-20'} left-1/2 transform -translate-x-1/2`
          : 'left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        }`}
      style={!isInPosition ? { top: '50vh' } : {}}
    >
      <div>
        <div
          className="font-bold bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent transition-all duration-[3000ms] ease-in-out"
          style={{
            fontSize: isMobile
              ? (isInPosition ? '1.875rem' : '3.75rem') // text-3xl : text-6xl
              : isLargeScreen
                ? (isInPosition ? '4.5rem' : '8rem') // much larger for large screens
                : (isInPosition ? '2.25rem' : '4.5rem'), // text-4xl : text-8xl
            fontFamily: "'Waterfall', cursive",
            backgroundSize: '200% auto',
            animation: 'shine 8s linear infinite'
          }}
        >
          Vanda
        </div>
      </div>
    </div>
  );
}
