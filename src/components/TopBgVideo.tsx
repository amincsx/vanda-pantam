"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function TopBgVideo() {
  const [isBlurred, setIsBlurred] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showFreezeImage, setShowFreezeImage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    // Check if this is the first visit BEFORE any other component sets it
    const hasVisited = localStorage.getItem('vanda-has-visited');
    const firstVisit = !hasVisited;
    setIsFirstVisit(firstVisit);

    if (!firstVisit) {
      // Not first visit - no blur effect
      setIsBlurred(false);
    } else {
      // First visit - remove blur after 1 second
      const timer = setTimeout(() => {
        setIsBlurred(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleVideo = async () => {
      if (videoRef.current) {
        try {
          // Reset video to beginning
          videoRef.current.currentTime = 0;

          // Always try to play the video first
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log("Video started playing");
          }
        } catch (error) {
          console.error("Video play failed:", error);
          // If video fails to play, show freeze image as fallback
          setShowFreezeImage(true);
        }
      }
    };

    handleVideo();
  }, []);

  return (
    <div className="w-full flex justify-start 3xl:justify-center relative">
      {/* Video container with mask */}
      <div
        className="relative z-10 3xl:scale-200"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 60%,  rgba(0,0,0,0.1) 70%,transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, rgba(0, 0, 0, 0.94) 70%,transparent 100%)'
        }}
      >
        <video
          ref={videoRef}
          className={`shadow-2xl transition-all duration-1000 ease-in-out ${showFreezeImage ? 'opacity-0' : 'opacity-100'}`}
          style={{
            objectFit: isMobile ? 'cover' : (isLargeScreen ? 'cover' : 'none'),
            objectPosition: 'center',
            width: isLargeScreen ? '100vw' : 'auto',
            height: isLargeScreen ? '60vh' : 'auto',
            maxHeight: isMobile ? '60vh' : (isLargeScreen ? '60vh' : 'auto'),
            aspectRatio: isMobile ? '16/9' : 'auto',
            filter: `blur(${isBlurred ? '8px' : '0px'}) drop-shadow(0 0 40px rgba(0, 0, 0, 0.6))`
          }}
          muted
          playsInline
          autoPlay
          loop={false}
          controls={false}
          preload="none"
          poster="/1080 pic.jpg"
          onLoadStart={() => console.log("Video loading started")}
          onLoadedData={() => console.log("Video loaded")}
          onError={(e) => console.error("Video error:", e)}
          onPlay={() => console.log("Video playing")}
          onPause={() => console.log("Video paused")}
          onEnded={() => {
            console.log("Video ended, showing freeze image");
            setShowFreezeImage(true);
          }}
        >
          <source src="/topbg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Freeze Image */}
        {showFreezeImage && (
          <Image
            src="/1080 pic.jpg"
            alt="Freeze frame"
            fill
            className={`transition-all duration-1000 ease-in-out ${showFreezeImage ? 'opacity-100' : 'opacity-0'}`}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.05)',
              filter: `blur(${isBlurred ? '8px' : '0px'}) drop-shadow(0 0 40px rgba(0, 0, 0, 0.6))`
            }}
            sizes="100vw"
          />
        )}

        {/* Blur overlay for bottom transition area only */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: '5%',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
          }}
        />
      </div>
    </div>
  );
}
