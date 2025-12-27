import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Link from 'next/link';

export default function Order() {
  return (
    <div className="min-h-screen relative">
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

      {/* Background layer */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black-900 via-gray-900 to-black-950"
        style={{ filter: 'blur(20px)' }}
      ></div>

      {/* Content layer */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-8 sm:pb-12">


          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Virtual Pantam Section */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-yellow-500/20 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                پنتام <span className="text-yellow-400">مجازی</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                هندپن مجازی تعاملی ما را تجربه کنید که در آن می‌توانید گام‌ها و صداهای مختلف را آنلاین بنوازید و کاوش کنید.
              </p>
              <a
                href="/virtual-pantam"
                className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl touch-target"
              >
                امتحان پنتام مجازی
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
