"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Metadata is exported from metadata.ts file in this directory

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen relative bg-black">
      {/* Simple Home Link */}
      <div className="absolute top-4 right-4 sm:right-8 md:right-25 z-50">
        <Link
          href="/"
          className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-black/40 hover:bg-yellow-500/20 backdrop-blur-md rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 text-yellow-300 hover:text-white transition-all duration-300 text-sm sm:text-base touch-target"
        >
          <svg className="w-4 h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">خانه</span>
          <span className="sm:hidden">بازگشت</span>
        </Link>
      </div>

      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-4 sm:mb-6"
              style={{
                fontFamily: "var(--font-lalezar), cursive",
                backgroundSize: '200% auto',
                animation: 'shine 8s linear infinite'
              }}
            >
              تماس با ما
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              آماده شروع سفر هندپن خود هستید؟ ما اینجا هستیم تا به شما کمک کنیم ساز مناسب خود را پیدا کنید
              و به هر سوالی در مورد هنر ما پاسخ دهیم.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">

            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl text-yellow-200 font-semibold mb-4 sm:mb-6">
                ارسال پیام به ما
              </h2>

              {submitted && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-medium">
                    ✓ متشکریم! پیام شما با موفقیت ارسال شد. ما ظرف ۲۴ ساعت با شما تماس خواهیم گرفت.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      نام *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="نام کامل شما"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      ایمیل *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      تلفن
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="+98 (912) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      موضوع *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    >
                      <option value="">انتخاب موضوع</option>
                      <option value="purchase">استعلام خرید</option>
                      <option value="custom">سفارش سفارشی</option>
                      <option value="repair">خدمات تعمیر</option>
                      <option value="workshop">کارگاه/کلاس‌ها</option>
                      <option value="general">سوال عمومی</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    پیام *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    placeholder="درباره علایق هندپن خود، گام‌های مورد نظر یا هر سوالی که دارید به ما بگویید..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 touch-target ${isSubmitting
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105'
                    }`}
                >
                  {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                </button>
              </form>
            </div>

            {/* WhatsApp Contact */}
            <div className="space-y-6 sm:space-y-8">
              {/* Workshop Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/workshop pics/photo_2025-09-28_14-02-17.jpg"
                  alt="کارگاه ما - جایی که هندپن‌ها متولد می‌شوند"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-lg font-semibold">
                    بازدید از کارگاه ما
                  </p>
                  <p className="text-gray-200 text-sm">
                    تجربه مستقیم هنر ساخت
                  </p>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl text-yellow-200 font-semibold mb-6 text-center">تماس با ما در واتس‌اپ</h3>
                <div className="flex flex-col items-center gap-6">
                  <a
                    href="https://wa.me/989196075854"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <span className="text-lg text-green-400 font-medium">چت در واتس‌اپ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl text-yellow-200 font-semibold text-center mb-12"
              style={{ fontFamily: "var(--font-lalezar), cursive" }}>
              سوالات متداول
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">زمان ارسال چقدر طول می‌کشد؟</h3>
                <p className="text-gray-300">سفارشات داخلی معمولاً طی ۲-۳ روز کاری ارسال می‌شوند. ارسال بین‌المللی بسته به مکان متفاوت است، معمولاً ۷-۱۴ روز کاری.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">آیا گام‌های سفارشی ارائه می‌دهید؟</h3>
                <p className="text-gray-300">بله! ما در کوک‌ها و گام‌های سفارشی تخصص داریم. با ما تماس بگیرید و نیازهای خاص خود را بگویید تا چیزی منحصر به فرد برای شما بسازیم.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">سیاست گارانتی شما چیست؟</h3>
                <p className="text-gray-300">همه هندپن‌های واندا با گارانتی مادام‌العمر ساخت عرضه می‌شوند. ما پشت کیفیت سازهای خود ایستاده‌ایم.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">آیا می‌توانم قبل از خرید امتحان کنم؟</h3>
                <p className="text-gray-300">قطعاً! ما با تعیین وقت قبلی از بازدیدهای کارگاه استقبال می‌کنیم. می‌توانید گام‌های مختلف را امتحان کنید و ساز مناسب خود را پیدا کنید.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}