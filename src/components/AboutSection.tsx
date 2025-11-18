"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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

    return (
        <section
            ref={sectionRef}
            className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Text Content */}
                    <div
                        className={`space-y-4 sm:space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}
                    >
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent"
                            style={{ fontFamily: "'Waterfall', cursive" }}
                        >
                            The Art of Handpan
                        </h2>

                        <div className="space-y-3 sm:space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                            <p>
                                The handpan is more than just a musical instrument—it's a gateway to meditation,
                                healing, and profound musical expression.
                            </p>

                            <p>
                                Born from the revolutionary Hang drum concept in 2000, handpans have captured
                                hearts worldwide with their ethereal, therapeutic tones.
                            </p>

                            <p>
                                Each handpan consists of two carefully crafted metal half-shells, forming a
                                resonant chamber with precisely tuned tone fields. The center note, surrounded
                                by a circle of harmonically related tones, creates scales that naturally guide
                                players into meditative states.
                            </p>

                            <p>
                                At Vanda, we honor this ancient craft while pushing the boundaries of what's
                                possible. Our instruments are not just tools for music—they're companions
                                for your journey of self-discovery.
                            </p>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div
                        className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        {/* Featured Workshop Image */}
                        <div className="mb-6">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                                <Image
                                    src="/workshop pics/photo_2025-09-28_14-02-17.jpg"
                                    alt="Handpan crafting process in our workshop"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}