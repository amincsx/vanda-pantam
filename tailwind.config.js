/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1800px', // For very large monitors and 4K screens (1800px+)
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'sans-serif'],
        lalezar: ['var(--font-vazirmatn)', 'sans-serif'], // Replace Lalezar with Vazirmatn for a thinner look
      },
    },
  },
  plugins: [],
}
