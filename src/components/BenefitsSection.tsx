"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function BenefitsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);
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

    const benefits = [
        {
            title: "Stress Relief & Relaxation",
            description: "The soothing tones of handpan music naturally reduce cortisol levels and promote deep relaxation, making it an ideal tool for stress management.",
            icon: "",
            image: "/1.PNG"
        },
        {
            title: "Enhanced Focus & Meditation",
            description: "The harmonic resonance helps quiet the mind, making it easier to achieve meditative states and improve concentration.",
            icon: "",
            image: "/2.PNG"
        },
        {
            title: "Emotional Healing",
            description: "Playing handpan can help process emotions, release tension, and provide a therapeutic outlet for self-expression.",
            icon: "",
            image: "/3.PNG"
        },
        {
            title: "Creative Expression",
            description: "The intuitive nature of handpan encourages spontaneous creativity and musical exploration, regardless of musical background.",
            icon: "",
            image: "/4.PNG"
        },
        {
            title: "Community & Connection",
            description: "Join a global community of handpan enthusiasts who share the passion for mindful music and conscious living.",
            icon: "",
            image: "/5.PNG"
        },
        {
            title: "Sleep & Recovery",
            description: "The gentle frequencies can improve sleep quality and aid in physical and mental recovery processes.",
            icon: "",
            image: "/6.PNG"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black"
        >
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-4 sm:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        style={{ fontFamily: "'Waterfall', cursive" }}
                    >
                        Transform Your Life
                    </h2>
                    <p
                        className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        Discover the profound benefits of handpan music for your mental, emotional,
                        and spiritual well-being. Science meets ancient wisdom in every note.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 hover:border-yellow-400/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: `${300 + index * 100}ms` }}
                            onMouseEnter={() => setActiveCard(index)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                                <Image
                                    src={benefit.image}
                                    alt={benefit.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-3xl">{benefit.icon}</div>
                                    <h3 className="text-xl font-semibold text-yellow-200">
                                        {benefit.title}
                                    </h3>
                                </div>

                                <p className="text-gray-300 leading-relaxed">
                                    {benefit.description}
                                </p>

                                {/* Hover Effect */}
                                <div
                                    className={`mt-4 text-sm text-yellow-400 transition-all duration-300 ${activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                        }`}
                                >
                                    Learn more about this benefit →
                                </div>
                            </div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}