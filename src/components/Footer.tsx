export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              واندا
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              سازهای هندپن دست‌ساز با کیفیت عالی، ساخته شده با دقت و عشق.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              دسترسی سریع
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  خانه
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  تماس
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              منابع
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://nextjs.org/docs"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  مستندات Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/docs"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © ۲۰۲۴ واندا. طراحی شده با Next.js و Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
