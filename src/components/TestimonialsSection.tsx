"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function TestimonialsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Yoga Instructor",
            image: "/7.PNG",
            text: "My Vanda handpan has become an essential part of my meditation practice. The resonance and clarity are absolutely incredible.",
            rating: 5
        },
        {
            name: "Marcus Thompson",
            role: "Music Therapist",
            image: "/8.PNG",
            text: "I use Vanda handpans in my therapy sessions. The quality and healing properties of these instruments are unmatched.",
            rating: 5
        },
        {
            name: "Elena Rodriguez",
            role: "Sound Healer",
            image: "/9.PNG",
            text: "The craftsmanship is extraordinary. Each note resonates with pure emotion and creates the perfect atmosphere for healing.",
            rating: 5
        },
        {
            name: "David Kim",
            role: "Professional Musician",
            image: "/10.PNG",
            text: "As a touring musician, I need instruments I can rely on. Vanda handpans deliver consistent quality and beautiful tone every time.",
            rating: 5
        }
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
                setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isVisible, testimonials.length]);

    return (
        <section
            ref={sectionRef}
            className="py-20 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900"
        >
            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        className={`text-5xl lg:text-6xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        style={{ fontFamily: "'Waterfall', cursive" }}
                    >
                        What Our Artists Say
                    </h2>
                    <p
                        className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        Join thousands of musicians, therapists, and spiritual practitioners who trust Vanda handpans for their musical journey.
                    </p>
                </div>

                {/* Main Testimonial */}
                <div
                    className={`relative bg-gradient-to-r from-yellow-400/5 via-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-8 mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="grid lg:grid-cols-3 gap-8 items-center">

                        {/* Profile Image */}
                        <div className="lg:col-span-1 flex justify-center">
                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400/30">
                                <Image
                                    src={testimonials[currentTestimonial].image}
                                    alt={testimonials[currentTestimonial].name}
                                    fill
                                    className="object-cover transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                        </div>

                        {/* Testimonial Content */}
                        <div className="lg:col-span-2 text-center lg:text-left">
                            {/* Stars */}
                            <div className="flex justify-center lg:justify-start gap-1 mb-4">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-xl lg:text-2xl text-gray-200 mb-6 italic leading-relaxed">
                                "{testimonials[currentTestimonial].text}"
                            </blockquote>

                            {/* Author */}
                            <div>
                                <div className="text-xl font-semibold text-yellow-200">
                                    {testimonials[currentTestimonial].name}
                                </div>
                                <div className="text-gray-400">
                                    {testimonials[currentTestimonial].role}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index
                                        ? 'bg-yellow-400 scale-125'
                                        : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats Row */}
                <div
                    className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">2000+</div>
                        <div className="text-gray-300">Happy Customers</div>
                    </div>
                    <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                        <div className="text-gray-300">Countries Shipped</div>
                    </div>
                    <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">15+</div>
                        <div className="text-gray-300">Scale Options</div>
                    </div>
                    <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
                        <div className="text-gray-300">Handcrafted</div>
                    </div>
                </div>

            </div>
        </section>
    );
}