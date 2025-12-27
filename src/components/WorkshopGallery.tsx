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

    // Album images from public/
    const albumImages = [
        '1.webp',
        '2.webp',
        '3.webp',
        '4.webp',
        '5.webp',
        '6.webp',
        '7.webp',
        '8.webp',
        '9.webp',
        '10.webp',
        '11.webp',
        '12.webp',
        '13.webp'
    ];

    // Combine all images
    const allImages = [
        ...albumImages.map(img => ({ src: `/${img}`, type: 'album', name: img })),
        ...workshopImages.map(img => ({ src: `/workshop pics/${img}`, type: 'workshop', name: img }))
    ];

    return (
        <>
            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {allImages.map((imageObj, index) => (
                        <div
                            key={imageObj.name}
                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20"
                            onClick={() => setSelectedImage(imageObj.name)}
                        >
                            <Image
                                src={imageObj.src}
                                alt={imageObj.type === 'workshop' ? `لحظه کارگاه ${index + 1}` : `تصویر آلبوم ${index + 1}`}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Hover Text */}
                            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <p className="text-sm font-medium">{imageObj.type === 'workshop' ? 'لحظه‌ای در کارگاه' : 'مجموعه هندپن'}</p>
                                <p className="text-xs text-yellow-200">برای مشاهده کلیک کنید</p>
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
                                src={allImages.find(img => img.name === selectedImage)?.src || ''}
                                alt={allImages.find(img => img.name === selectedImage)?.type === 'workshop' ? 'لحظه کارگاه' : 'مجموعه هندپن'}
                                fill
                                className="object-contain rounded-lg"
                                sizes="90vw"
                            />
                        </div>

                        {/* Navigation arrows */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = allImages.findIndex(img => img.name === selectedImage);
                                const prevIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
                                setSelectedImage(allImages[prevIndex].name);
                            }}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-lg sm:text-xl transition-all duration-300 hover:scale-110 border border-white/20 touch-target"
                        >
                            ←
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = allImages.findIndex(img => img.name === selectedImage);
                                const nextIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
                                setSelectedImage(allImages[nextIndex].name);
                            }}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-lg sm:text-xl transition-all duration-300 hover:scale-110 border border-white/20 touch-target"
                        >
                            →
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/50 rounded-full text-white text-xs sm:text-sm border border-white/20">
                            {workshopImages.indexOf(selectedImage) + 1} از {workshopImages.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}