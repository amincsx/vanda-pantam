"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function CraftsmanshipSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    const workshopImages = [
        '/workshop pics/IMG_3783.PNG',
        '/workshop pics/IMG_3785.PNG',
        '/workshop pics/IMG_3786.PNG',
        '/workshop pics/IMG_3787.PNG',
        '/workshop pics/IMG_3788.PNG',
        '/workshop pics/IMG_3789.PNG',
        '/workshop pics/IMG_3790.PNG',
        '/workshop pics/IMG_3791.PNG'
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % workshopImages.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isVisible, workshopImages.length]);

    const craftingSteps = [
        {
            title: "Material Selection",
            description: "We carefully select premium steel for optimal resonance and durability.",
            icon: ""
        },
        {
            title: "Shaping & Forming",
            description: "Each shell is meticulously shaped using traditional handcrafting techniques.",
            icon: ""
        },
        {
            title: "Tone Field Creation",
            description: "Precise tuning creates the harmonic relationships that define each scale.",
            icon: ""
        },
        {
            title: "Assembly & Tuning",
            description: "Final assembly and fine-tuning ensure perfect pitch and resonance.",
            icon: ""
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900"
        >
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
                    <h2
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        style={{ fontFamily: "'Waterfall', cursive" }}
                    >
                        Master Craftsmanship
                    </h2>
                    <p
                        className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-2 sm:px-0 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        Every Vanda handpan is a testament to centuries-old metalworking traditions,
                        combined with modern precision and an unwavering commitment to sonic perfection.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">

                    {/* Workshop Images */}
                    <div
                        className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}
                    >
                        <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                            {/* Main workshop image */}
                            <div className="relative aspect-[4/3] sm:aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-800">
                                <Image
                                    src={workshopImages[currentImage]}
                                    alt="Workshop craftsmanship"
                                    fill
                                    className="object-cover transition-opacity duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Image counter */}
                                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2">
                                    <span className="text-white text-xs sm:text-sm">
                                        {currentImage + 1} / {workshopImages.length}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail strip */}
                            <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto pb-2 scrollbar-hide">
                                {workshopImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all touch-target ${currentImage === index
                                            ? 'border-yellow-400 scale-105'
                                            : 'border-gray-600 hover:border-gray-400'
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Workshop ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Crafting Process */}
                    <div
                        className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                            {craftingSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 min-w-[130px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                        }`}
                                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                                >
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-200 mb-1.5 sm:mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 sm:mt-6 md:mt-8">
                            <h4 className="text-base sm:text-lg font-semibold text-yellow-200 mb-1.5 sm:mb-2">
                                Quality Guarantee
                            </h4>
                            <p className="text-sm sm:text-base text-gray-300">
                                Each Vanda handpan undergoes rigorous testing and comes with our lifetime
                                craftsmanship guarantee. We stand behind every instrument we create.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}