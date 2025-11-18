"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="absolute top-4 left-4 sm:left-8 md:left-25 z-50">
        <Link
          href="/"
          className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-black/40 hover:bg-yellow-500/20 backdrop-blur-md rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 text-yellow-300 hover:text-white transition-all duration-300 text-sm sm:text-base touch-target"
        >
          <svg className="w-4 h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Home</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>

      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-4 sm:mb-6"
              style={{
                fontFamily: "'Waterfall', cursive",
                backgroundSize: '200% auto',
                animation: 'shine 8s linear infinite'
              }}
            >
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to begin your handpan journey? We're here to help you find the perfect instrument
              and answer any questions about our craft.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">

            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl text-yellow-200 font-semibold mb-4 sm:mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-400 font-medium">
                    ✓ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
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
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="purchase">Purchase Inquiry</option>
                      <option value="custom">Custom Order</option>
                      <option value="repair">Repair Services</option>
                      <option value="workshop">Workshop/Lessons</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 bg-black/30 backdrop-blur-sm border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    placeholder="Tell us about your handpan interests, preferred scales, or any questions you have..."
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info & Image */}
            <div className="space-y-6 sm:space-y-8">
              {/* Workshop Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/workshop pics/photo_2025-09-28_14-02-17.jpg"
                  alt="Our workshop - where handpans are born"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-lg font-semibold">
                    Visit Our Workshop
                  </p>
                  <p className="text-gray-200 text-sm">
                    Experience the craftsmanship firsthand
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl text-yellow-200 font-semibold mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 text-lg">📧</span>
                      </div>
                      <div>
                        <p className="text-gray-300">Email</p>
                        <p className="text-white font-medium">info@vanda-handpans.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 text-lg">📞</span>
                      </div>
                      <div>
                        <p className="text-gray-300">Phone</p>
                        <p className="text-white font-medium">+1 (555) 123-VANDA</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 text-lg">📍</span>
                      </div>
                      <div>
                        <p className="text-gray-300">Workshop Address</p>
                        <p className="text-white font-medium">123 Artisan Way, Harmony City, HC 12345</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours & Additional Info */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl text-yellow-200 font-semibold mb-4">Workshop Hours</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="text-white font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                    <p><span className="text-white font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
                    <p><span className="text-white font-medium">Sunday:</span> Closed</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <p className="text-sm text-gray-400">
                      Workshop visits are by appointment only.
                      Please contact us to schedule your visit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl text-yellow-200 font-semibold text-center mb-12"
              style={{ fontFamily: "'Waterfall', cursive" }}>
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">How long does shipping take?</h3>
                <p className="text-gray-300">Domestic orders typically ship within 2-3 business days. International shipping varies by location, usually 7-14 business days.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">Do you offer custom scales?</h3>
                <p className="text-gray-300">Yes! We specialize in custom tunings and scales. Contact us with your specific requirements and we'll craft something unique for you.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">What's your warranty policy?</h3>
                <p className="text-gray-300">All Vanda handpans come with a lifetime craftsmanship warranty. We stand behind the quality of our instruments.</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg text-yellow-200 font-semibold mb-3">Can I try before buying?</h3>
                <p className="text-gray-300">Absolutely! We welcome workshop visits by appointment. You can try different scales and find your perfect match.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}