"use client";

import { useState, useEffect } from 'react';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShinyText({ children, className = "", style = {} }: ShinyTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('vanda-has-visited');
    
    if (hasVisited) {
      // Not first visit - show content immediately
      setIsVisible(true);
    } else {
      // First visit - show content after 1 second delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div 
      className={`${className} relative inline-block transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={style}
    >
      <div className="text-yellow-200">
        {children}
      </div>
    </div>
  );
}
