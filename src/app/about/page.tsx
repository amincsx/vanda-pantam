import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      {/* Simple Home Link */}
      <div className="absolute top-4 left-4 sm:left-8 md:left-25 z-50">
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

      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent mb-4 sm:mb-6"
              style={{
                fontFamily: "var(--font-lalezar), cursive",
                backgroundSize: '200% auto',
                animation: 'shine 8s linear infinite'
              }}
            >
              درباره ما
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-8 sm:space-y-12">

            {/* Section 1 with Image */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-right" dir="rtl">
                  واندا پنتام سفر خود را در سال ۲۰۱۷ آغاز کرد — جایی که عشق به صدا شکل فلز را تغییر داد.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/workshop pics/IMG_3783.PNG"
                  alt="کارگاه واندا"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Section 2 with Image */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 md:order-1">
                <Image
                  src="/workshop pics/IMG_3787.PNG"
                  alt="کوک کردن هندپن"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 order-1 md:order-2">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-right" dir="rtl">
                  ما از اولین و با تجربه‌ترین سازندگان هندپن در ایران هستیم — مسیری پر از دقت، ظرافت و الهام.
                </p>
              </div>
            </div>

            {/* Section 3 with Image */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-right" dir="rtl">
                  تمرکز ما همیشه بر شفافیت صوتی و زیبایی ساخت بوده است.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/workshop pics/IMG_3790.PNG"
                  alt="جزئیات هندپن"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Section 4 with Image */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 md:order-1">
                <Image
                  src="/workshop pics/IMG_3789.PNG"
                  alt="ابزار کارگاه"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 order-1 md:order-2">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-right" dir="rtl">
                  هر ساز واندا نتیجه ساعت‌ها شنیدن، لمس کردن و دمیدن روح در فلز است.
                </p>
              </div>
            </div>

            {/* Section 5 with Image */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-right" dir="rtl">
                  امروز، واندا با افتخار در کنار بهترین نوازندگان ایران می‌نوازد — صدایی که از درون می‌آید و برای روح می‌نوازد.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/workshop pics/IMG_3791.PNG"
                  alt="هندپن‌های تکمیل شده"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}