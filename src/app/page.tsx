"use client";

import TopBgVideo from "@/components/TopBgVideo";
import ShinyText from "@/components/ShinyText";
import Navigation from "@/components/Navigation";
import VandaLogo from "@/components/VandaLogo";
import HorizontalAlbum from "@/components/HorizontalAlbum";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import heavy components to reduce initial bundle size
const AboutSection = dynamic(() => import("../components/AboutSection"), {
  loading: () => <div className="h-32 bg-black animate-pulse" />
});
const CraftsmanshipSection = dynamic(() => import("../components/CraftsmanshipSection"), {
  loading: () => <div className="h-32 bg-black animate-pulse" />
});
const BenefitsSection = dynamic(() => import("../components/BenefitsSection"), {
  loading: () => <div className="h-32 bg-black animate-pulse" />
});

export default function Home() {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for mobile album
  const images = [
    '/2.webp',
    '/3.webp',
    '/4.webp',
    '/5.webp',
    '/6.webp',
    '/7.webp',
    '/8.webp',
    '/9.webp',
    '/10.webp',
    '/11.webp',
    '/12.webp',
    '/13.webp',
    '/1.webp'
  ];

  useEffect(() => {
    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Ensure page opens from the top
    window.scrollTo(0, 0);

    // Show text immediately with logo and navigation
    setIsTextVisible(true);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mobile album scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) return;

      const scrollTop = window.scrollY;

      // Change image every 150px of scroll
      const imageIndex = Math.floor(scrollTop / 150) % images.length;

      setCurrentImageIndex(imageIndex);
    };

    // Throttle scroll events for smoother performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [isMobile, images.length]);

  return (
    <div className="relative overflow-x-hidden w-full" style={{ minHeight: isMobile ? '100vh' : 'calc(100vh + 2500px)' }}>
      <Navigation />
      <VandaLogo />
      {/* Background layer */}
      <div
        className="fixed inset-0 w-full h-full bg-gradient-to-t from-black-900 via-gray-900 to-black-950 md:bg-gradient-to-t md:from-black-900 md:via-gray-900 md:to-black-950"
        style={{
          filter: 'blur(100px)',
        }}
      ></div>

      {/* Content layer */}
      <div className="relative z-10">
        <TopBgVideo />
        <div className="text-center p-4 pt-8 sm:pt-10 md:p-8 md:pt-24 3xl:p-16 3xl:pt-40">
          <div
            className={`text-3xl sm:text-4xl md:text-7xl 3xl:text-9xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent animate-shine transition-all duration-[2000ms] ease-in-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{
              fontFamily: "'Waterfall', cursive",
              backgroundSize: '200% auto',
              animation: 'shine 8s linear infinite'
            }}
          >
            The true instrument is you,
            <br />
            <h1
              className="text-2xl sm:text-3xl md:text-5xl 3xl:text-7xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent animate-shine mt-2"
              style={{
                fontFamily: "'Waterfall', cursive",
                backgroundSize: '200% auto',
                animation: 'shine 8s linear infinite'
              }}
            >
              welcome to vanda
            </h1>

            {/* Social Media Icons */}
            <div
              className={`flex justify-center space-x-4 sm:space-x-6 mt-8 sm:mt-12 md:mt-28 md:scale-130 3xl:mt-60 3xl:scale-175 transition-all duration-[2000ms] ease-in-out ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              {/* Instagram */}
              <a
                href="https://www.instagram.com/vanda_pantam/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-110 touch-target"
              >
                <svg
                  className="w-6 h-6 sm:w-5 sm:h-5 text-white/40 group-hover:text-white/60 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/989196075854"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-110 touch-target"
                title="+98 919 607 5854"
              >
                <svg
                  className="w-6 h-6 sm:w-5 sm:h-5 text-white/40 group-hover:text-white/60 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.892 3.488" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Horizontal Album at bottom */}
      <div className="hidden md:block">
        <HorizontalAlbum />
      </div>

      {/* Mobile Album Component - Before sections */}
      {isMobile && (
        <div className="md:hidden relative z-10">
          {/* Fog shadow background */}
          <div className="relative pointer-events-none h-32">
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.05) 65%, transparent 85%)',
                filter: 'blur(80px)'
              }}
            />
          </div>

          <div className="relative -mt-20">
            {/* Glass morphism container */}
            <div className="relative bg-black/20 backdrop-blur-md rounded-none shadow-2xl overflow-visible">
              {/* Album container with horizontal sliding */}
              <div className="relative w-full h-32 rounded-none overflow-hidden">
                {/* All images container - slides horizontally */}
                <div
                  className="flex transition-transform duration-[1500ms] ease-in-out h-full"
                  style={{
                    width: `${images.length * 100}%`,
                    transform: `translateX(-${currentImageIndex * (100 / images.length)}%)`
                  }}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 h-full relative"
                      style={{ width: `${100 / images.length}%` }}
                    >
                      <Image
                        src={image}
                        alt={`Album ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>

              </div>

              {/* Glass borders - positioned on outer container */}
              <div
                className="absolute left-0 right-0 z-50 pointer-events-none"
                style={{
                  height: '7px',
                  top: '-5px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)',
                  backdropFilter: 'blur(5px)'
                }}
              />
              <div
                className="absolute left-0 right-0 z-50 pointer-events-none"
                style={{
                  height: '7px',
                  bottom: '-6px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 70%, transparent 100%)',
                  backdropFilter: 'blur(5px)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Spacer to separate main content from new sections */}
      <div className="h-80 bg-black hidden md:block"></div>
      <div className="h-20 bg-black md:hidden"></div>

      {/* New Sections for Extended Content - Desktop Only */}
      <div className="hidden lg:block">
        <AboutSection />

        <div className="h-8 bg-black"></div>
        <CraftsmanshipSection />

        <div className="h-8 bg-black"></div>
        <BenefitsSection />
      </div>

      {/* Mobile Sections */}
      {isMobile && (
        <div className="lg:hidden">
          <AboutSection />
          <CraftsmanshipSection />
          <BenefitsSection />
        </div>
      )}
    </div>
  );
}
