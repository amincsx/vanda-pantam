export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/60 text-sm" dir="rtl">در حال بارگذاری واندا...</p>
            </div>
        </div>
    );
}