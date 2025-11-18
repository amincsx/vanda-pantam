'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.images.front, product.images.side, product.images.back, product.images.sideView];
  const imageLabels = ['front view', '80%', '60%', 'side view'];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:bg-white/10">
      {/* Image Container with Glass Circles */}
      <div className="relative h-64 sm:h-80 md:h-96 group">
        <Image
          src={images[currentImageIndex]}
          alt={`${product.name} - ${imageLabels[currentImageIndex]} view`}
          fill
          className="object-contain transition-all duration-500 ease-in-out"
        />

        {/* Image Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === index
                ? 'bg-yellow-400 w-6'
                : 'bg-white/50 hover:bg-white/70'
                }`}
              title={`${imageLabels[index]}`}
            />
          ))}
        </div>

        {/* Image Label */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
          {imageLabels[currentImageIndex]}
        </div>
      </div>

      {/* Content with Glass Effect */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-white/5 to-white/0">
        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">{product.name}</h3>
        <p className="text-gray-300 text-xs sm:text-sm mb-2.5 sm:mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

        {product.features && product.features.length > 0 && (
          <div className="mb-2.5 sm:mb-3">
            <h4 className="text-yellow-400 font-semibold mb-1 text-xs">Features:</h4>
            <ul className="text-gray-300 text-xs space-y-0.5">
              {product.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full mr-1.5 flex-shrink-0"></span>
                  <span className="text-xs">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center">
          {product.price && (
            <span className="text-yellow-400 font-bold text-base sm:text-lg">
              ${product.price}
            </span>
          )}
          <Link
            href={`/products/${product.id}`}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl touch-target"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
