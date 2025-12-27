'use client';

import { useState } from 'react';
import Link from 'next/link';
import VirtualPantam from '@/components/VirtualPantam';
import { products } from '@/data/products';

export default function VirtualPantamPage() {
  // Currently available virtual pantams: 1 (9-note), 3 (12-note), 4 (14-note)
  // Product 2 (Echo) and 5 (18-note) temporarily disabled
  const virtualPantamProducts = [1, 3, 4];
  const [selectedProductId, setSelectedProductId] = useState(4); // Default to product 4

  const availableProducts = products.filter(p => virtualPantamProducts.includes(p.id));

  return (
    <div className="min-h-screen relative">
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black-900 via-gray-900 to-black-950"
        style={{ filter: 'blur(20px)' }}
      ></div>

      {/* Content layer */}
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
            <Link
              href="/order"
              className="inline-flex items-center px-4 py-2 sm:px-4 sm:py-2 bg-black/40 hover:bg-yellow-500/20 backdrop-blur-md rounded-lg border border-yellow-300/20 hover:border-yellow-300/40 text-yellow-300 hover:text-white transition-all duration-300 text-sm sm:text-base touch-target"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              بازگشت به محصولات
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-6xl text-yellow-200 text-center" style={{ fontFamily: "var(--font-lalezar), cursive" }}>
              پنتام مجازی
            </h1>

            <div className="hidden sm:block sm:w-32"></div> {/* Spacer for centering on desktop */}
          </div>

          {/* Product Selector */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">یک هندپن انتخاب کنید</h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {availableProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 backdrop-blur-md touch-target ${selectedProductId === product.id
                    ? 'bg-yellow-500 text-black border-2 border-yellow-400 shadow-lg shadow-yellow-500/30'
                    : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/40'
                    }`}
                >
                  <span className="hidden sm:inline">{product.name}</span>
                  <span className="sm:hidden">{product.name.replace('Handpan ', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Pantam Display */}
          <div className="mb-8">
            <VirtualPantam productId={selectedProductId} />
          </div>

          {/* Instructions */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 mb-3 sm:mb-4">نحوه نواختن</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300" dir="rtl">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full ml-3 mt-2 flex-shrink-0"></span>
                  <span>برای نواختن نت‌های فردی روی دایره‌های نت کلیک یا ضربه بزنید</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full ml-3 mt-2 flex-shrink-0"></span>
                  <span>هر هندپن گام و صدای منحصر به فرد خود را دارد</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full ml-3 mt-2 flex-shrink-0"></span>
                  <span>ترکیب‌های مختلف را آزمایش کنید تا ملودی‌های زیبا خلق کنید</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full ml-3 mt-2 flex-shrink-0"></span>
                  <span>سعی کنید بین هندپن‌های مختلف جابجا شوید تا گام‌های مختلف را کاوش کنید</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
