'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import VirtualPantam from '@/components/VirtualPantam';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.images.front, product.images.side, product.images.back, product.images.sideView];
  const imageLabels = ['front view', '80%', '60%', 'side view'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;

    if (percentage < 0.33) {
      setCurrentImageIndex(0); // front
    } else if (percentage < 0.66) {
      setCurrentImageIndex(1); // side
    } else {
      setCurrentImageIndex(2); // back
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black-900 via-gray-900 to-black-950"
        style={{ filter: 'blur(20px)' }}
      ></div>

      {/* Content layer */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8 px-2 sm:px-0">
            <Link
              href="/order"
              className="inline-block py-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-200 touch-target"
            >
              ← Back to Products
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-2 sm:px-0">
            {/* Product Images */}
            <div className="space-y-4 sm:space-y-6">
              {/* Main Image */}
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${product.name} - ${imageLabels[currentImageIndex]}`}
                  fill
                  className="object-contain transition-all duration-500 ease-in-out"
                />

                {/* Image Navigation Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === index
                        ? 'bg-yellow-400 w-8'
                        : 'bg-white/50 hover:bg-white/70 w-1.5'
                        }`}
                      title={`${imageLabels[index]}`}
                    />
                  ))}
                </div>

                {/* Image Label */}
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/30 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium">
                  {imageLabels[currentImageIndex]}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-16 sm:h-20 md:h-24 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 backdrop-blur-sm touch-target ${currentImageIndex === index
                      ? 'border-yellow-500/80 shadow-lg shadow-yellow-500/30'
                      : 'border-white/20 hover:border-white/40'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <span className="text-lg sm:text-xl font-bold text-yellow-400">
                    ${product.price}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-2">Description</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-white mb-2">Features</h2>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300 text-sm">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 space-y-3">
                <a
                  href={`https://wa.me/989196075854?text=Hi, I'm interested in ordering ${encodeURIComponent(product.name)} - $${product.price}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg touch-target text-center ${product.inStock
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 hover:shadow-xl'
                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed backdrop-blur-sm pointer-events-none'
                    }`}
                >
                  {product.inStock ? 'Order on WhatsApp' : 'Out of Stock'}
                </a>

                <a
                  href={`https://wa.me/989196075854?text=Hi, I'd like to discuss a custom order for ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-400 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm text-sm touch-target text-center"
                >
                  Contact for Custom Order
                </a>
              </div>
            </div>
          </div>

          {/* Virtual Pantam - Available for supported products - Full Width Below */}
          {(productId === 1 || productId === 2 || productId === 3 || productId === 4 || productId === 6) && (
            <div className="mt-8 sm:mt-12 px-2 sm:px-0">
              <VirtualPantam productId={productId} />

              {/* Audio player outside the VirtualPantam container */}
              <div className="mt-6 sm:mt-8 flex flex-col items-center">
                <h3 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">A Song with This Handpan</h3>
                <div className="w-full max-w-2xl bg-transparent">
                  <audio
                    controls
                    controlsList="nodownload noplaybackrate nofullscreen"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    className="w-full"
                    style={{
                      height: '48px',
                      backgroundColor: 'transparent',
                      borderRadius: '8px',
                      filter: 'invert(1)',
                    }}
                  >
                    <source
                      src={productId === 1 ? "/sounds/D kurd 9 note song.mp3" :
                        productId === 2 ? "/sounds/D kurd 14 note song.mp3" :
                          productId === 3 ? "/sounds/D kurd 9 note song.mp3" :
                            productId === 4 ? "/sounds/D kurd 12 note song.mp3" :
                              "/sounds/D kurd 12 note song.mp3"}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          )}

          {/* Virtual Pantam Link for other products */}
          {productId !== 1 && productId !== 2 && productId !== 3 && productId !== 4 && productId !== 6 && (
            <div className="mt-8 sm:mt-12 max-w-md mx-auto px-2 sm:px-0">
              <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 rounded-xl p-4">
                <h3 className="text-base font-semibold text-white mb-2">
                  Try Virtual Pantam
                </h3>
                <p className="text-gray-300 text-xs mb-2">
                  Experience this handpan scale in our virtual instrument (coming soon)
                </p>
                <Link
                  href="/virtual-pantam"
                  className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors duration-200"
                >
                  Launch Virtual Pantam →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
