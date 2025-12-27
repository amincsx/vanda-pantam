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
            title: "کاهش استرس و آرامش",
            description: "طنین‌های آرام‌بخش موسیقی هندپن به طور طبیعی سطح کورتیزول را کاهش می‌دهد و آرامش عمیق را ترویج می‌کند و آن را به ابزاری ایده‌آل برای مدیریت استرس تبدیل می‌کند.",
            icon: "",
            image: "/1.webp"
        },
        {
            title: "افزایش تمرکز و مدیتیشن",
            description: "طنین هارمونیک به آرام کردن ذهن کمک می‌کند و دستیابی به حالت‌های مدیتیشن و بهبود تمرکز را آسان‌تر می‌کند.",
            icon: "",
            image: "/2.webp"
        },
        {
            title: "شفای عاطفی",
            description: "نواختن هندپن می‌تواند به پردازش احساسات، رهاسازی تنش و ارائه یک خروجی درمانی برای ابراز وجود کمک کند.",
            icon: "",
            image: "/3.webp"
        },
        {
            title: "بیان خلاق",
            description: "ماهیت بصری هندپن خلاقیت خودجوش و کاوش موسیقی را تشویق می‌کند، صرف نظر از پیشینه موسیقی.",
            icon: "",
            image: "/4.webp"
        },
        {
            title: "جامعه و ارتباط",
            description: "به جامعه جهانی علاقه‌مندان به هندپن بپیوندید که اشتیاق به موسیقی آگاهانه و زندگی آگاهانه را به اشتراک می‌گذارند.",
            icon: "",
            image: "/5.webp"
        },
        {
            title: "خواب و بازیابی",
            description: "فرکانس‌های ملایم می‌توانند کیفیت خواب را بهبود بخشند و به فرآیندهای بازیابی جسمی و ذهنی کمک کنند.",
            icon: "",
            image: "/6.webp"
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
                        style={{ fontFamily: "var(--font-lalezar), cursive" }}
                    >
                        زندگی خود را متحول کنید
                    </h2>
                    <p
                        className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        مزایای عمیق موسیقی هندپن را برای سلامت ذهنی، عاطفی و معنوی خود کشف کنید.
                        علم و خرد باستانی در هر نت به هم می‌رسند.
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
                                    بیشتر بدانید →
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