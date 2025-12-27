import Link from "next/link";
import WorkshopGallery from "../../components/WorkshopGallery";

export default function Gallery() {
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

      {/* Main content area */}
      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-0">
        <div className="text-center p-4 sm:p-8 mb-8 sm:mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-yellow-200 mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent animate-shine"
            style={{
              fontFamily: "var(--font-lalezar), cursive",
              backgroundSize: '200% auto',
              animation: 'shine 8s linear infinite'
            }}
          >
            گالری
          </h1>
          <p className="text-yellow-200/80 text-base sm:text-lg md:text-xl" style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }}>
            پشت صحنه - لحظات کارگاه
          </p>
        </div>

        {/* Workshop Gallery */}
        <WorkshopGallery />
      </div>
    </div>
  );
}
