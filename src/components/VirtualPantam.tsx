'use client';

import { Suspense, lazy } from 'react';

interface VirtualPantamProps {
    productId: number;
}

const InteractiveHandpan = lazy(() => import('./VirtualPantamHeavy'));

// Lightweight component that loads full functionality immediately
export default function VirtualPantam({ productId }: VirtualPantamProps) {
    return (
        <Suspense fallback={
            <div className="w-full h-[600px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        }>
            <InteractiveHandpan productId={productId} />
        </Suspense>
    );
}