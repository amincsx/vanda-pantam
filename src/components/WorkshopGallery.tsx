"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function WorkshopGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Workshop images from public/workshop pics/
    const workshopImages = [
        'IMG_3783.PNG',
        'IMG_3785.PNG',
        'IMG_3786.PNG',
        'IMG_3787.PNG',
        'IMG_3788.PNG',
        'IMG_3789.PNG',
        'IMG_3790.PNG',
        'IMG_3791.PNG'
    ];

    return (
        <>
            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {workshopImages.map((image, index) => (
                        <div
                            key={image}
                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20"
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={`/workshop pics/${image}`}
                                alt={`Workshop moment ${index + 1}`}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Hover Text */}
                            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <p className="text-sm font-medium">Workshop Moment</p>
                                <p className="text-xs text-yellow-200">Click to view</p>
                            </div>

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl transition-all duration-300 hover:scale-110 border border-white/20 touch-target"
                        >
                            ×
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
                            <Image
                                src={`/workshop pics/${selectedImage}`}
                                alt="Workshop moment"
                                fill
                                className="object-contain rounded-lg"
                                sizes="90vw"
                                priority
                            />
                        </div>

                        {/* Navigation arrows */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = workshopImages.indexOf(selectedImage);
                                const prevIndex = currentIndex > 0 ? currentIndex - 1 : workshopImages.length - 1;
                                setSelectedImage(workshopImages[prevIndex]);
                            }}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-lg sm:text-xl transition-all duration-300 hover:scale-110 border border-white/20 touch-target"
                        >
                            ←
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = workshopImages.indexOf(selectedImage);
                                const nextIndex = currentIndex < workshopImages.length - 1 ? currentIndex + 1 : 0;
                                setSelectedImage(workshopImages[nextIndex]);
                            }}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-lg sm:text-xl transition-all duration-300 hover:scale-110 border border-white/20 touch-target"
                        >
                            →
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/50 rounded-full text-white text-xs sm:text-sm border border-white/20">
                            {workshopImages.indexOf(selectedImage) + 1} of {workshopImages.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}