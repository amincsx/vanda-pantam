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
                            style={{ fontFamily: "var(--font-lalezar), cursive" }}
                        >
                            هنر هندپن
                        </h2>

                        <div className="space-y-3 sm:space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                            <p>
                                هندپن چیزی فراتر از یک ساز موسیقی است - دروازه‌ای به سوی مدیتیشن،
                                شفا و بیان عمیق موسیقی است.
                            </p>

                            <p>
                                متولد شده از مفهوم انقلابی هنگ درام در سال ۲۰۰۰، هندپن‌ها با طنین‌های اثیری و درمانی خود
                                قلب‌های جهانیان را تسخیر کرده‌اند.
                            </p>

                            <p>
                                هر هندپن از دو نیم‌پوسته فلزی که با دقت ساخته شده‌اند تشکیل شده است که یک
                                محفظه طنین‌انداز با میدان‌های صوتی دقیق کوک شده را ایجاد می‌کند. نت مرکزی، که توسط
                                دایره‌ای از نت‌های هماهنگ احاطه شده است، گام‌هایی را ایجاد می‌کند که به طور طبیعی
                                نوازنده را به حالت‌های مدیتیشن هدایت می‌کند.
                            </p>

                            <p>
                                در واندا، ما به این هنر احترام می‌گذاریم و در عین حال مرزهای آنچه ممکن است را
                                جابجا می‌کنیم. سازهای ما فقط ابزاری برای موسیقی نیستند - آنها همراهانی
                                برای سفر خودشناسی شما هستند.
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
                                    alt="فرآیند ساخت هندپن در کارگاه ما"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
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