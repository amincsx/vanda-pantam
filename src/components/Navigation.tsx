"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show navigation immediately
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width >= 1800);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    window.dispatchEvent(new CustomEvent('navHover', { detail: { hovering: true } }));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    window.dispatchEvent(new CustomEvent('navHover', { detail: { hovering: false } }));
  };

  return (
    <>
      {/* Mobile: hidden by default, opens with button (vertical menu) */}
      <div className="md:hidden">
        <button
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-50 p-3 bg-black/40 backdrop-blur-md rounded-lg border border-yellow-300/20 transition-all duration-500 touch-target ${isVisible ? 'opacity-100' : 'opacity-0'} ${isMenuOpen ? 'bg-yellow-300/20' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-yellow-300 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-yellow-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-yellow-300 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        <nav className={`fixed inset-0 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
            <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
              <Link href="/order" className="w-full text-center py-3 px-4 text-base text-yellow-300 hover:text-white bg-black/30 hover:bg-yellow-300/10 backdrop-blur-sm rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 transition-all duration-300 transform hover:scale-105 font-light touch-target" style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }} onClick={() => setIsMenuOpen(false)}>سفارش</Link>
              <Link href="/gallery" className="w-full text-center py-3 px-4 text-base text-yellow-300 hover:text-white bg-black/30 hover:bg-yellow-300/10 backdrop-blur-sm rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 transition-all duration-300 transform hover:scale-105 font-light touch-target" style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }} onClick={() => setIsMenuOpen(false)}>گالری</Link>
              <Link href="/about" className="w-full text-center py-3 px-4 text-base text-yellow-300 hover:text-white bg-black/30 hover:bg-yellow-300/10 backdrop-blur-sm rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 transition-all duration-300 transform hover:scale-105 font-light touch-target" style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }} onClick={() => setIsMenuOpen(false)}>درباره ما</Link>
              <Link href="/contact" className="w-full text-center py-3 px-4 text-base text-yellow-300 hover:text-white bg-black/30 hover:bg-yellow-300/10 backdrop-blur-sm rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 transition-all duration-300 transform hover:scale-105 font-light touch-target" style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }} onClick={() => setIsMenuOpen(false)}>تماس</Link>
              <Link href="/virtual-pantam" className="w-full text-center py-3 px-4 text-base text-yellow-300 hover:text-white bg-black/30 hover:bg-yellow-300/10 backdrop-blur-sm rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 transition-all duration-300 transform hover:scale-105 font-light touch-target" style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }} onClick={() => setIsMenuOpen(false)}>هندپن مجازی</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Desktop / Larger screens: horizontal nav */}
      <nav
        className={`hidden md:block group absolute left-1/2 z-50 bg-black/20 backdrop-blur-sm rounded-lg transition-all duration-500 ease-in-out hover:bg-black/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={{
          top: isLargeScreen ? '1rem' : '0.5rem', // 16px : 8px
          transform: (() => {
            let scale = 1;
            let translateY = '0px';
            if (isLargeScreen) scale = 1.2;
            if (isHovered) {
              scale *= 1.2;
              translateY = isLargeScreen ? '8px' : '4px'; // More movement for large screens
            }
            return `translateX(-50%) translateY(${translateY}) scale(${scale})`;
          })(),
          transformOrigin: 'center'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-4 py-2 hover:px-6 hover:py-3 transition-all duration-300 ease-in-out">
          <div
            className="flex justify-center items-center text-sm group-hover:text-base transition-all duration-300 font-light"
            style={{
              gap: isLargeScreen ? '1.8rem' : '1.5rem',
              fontSize: isLargeScreen ? '0.95rem' : '0.875rem', // smaller than text-base
              fontFamily: "var(--font-vazirmatn), sans-serif"
            }}
          >
            <Link href="/order" className="text-yellow-300 hover:text-white transition-colors duration-300">سفارش</Link>
            <Link href="/gallery" className="text-yellow-300 hover:text-white transition-colors duration-300">گالری</Link>
            <Link href="/about" className="text-yellow-300 hover:text-white transition-colors duration-300">درباره ما</Link>
            <Link href="/contact" className="text-yellow-300 hover:text-white transition-colors duration-300">تماس</Link>
            <Link href="/virtual-pantam" className="text-yellow-300 hover:text-white transition-colors duration-300">هندپن مجازی</Link>
          </div>
        </div>
      </nav>
    </>
  );
}