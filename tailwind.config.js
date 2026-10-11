/** @type {import('tailwindcss').Config} */

// Colors that change between light and dark mode read their value from a CSS variable.
// The variables themselves live in style.css (":root" = dark, "html.light" = light).
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  // Tailwind scans these files for class names. If you add a new page, add it here.
  content: ['./*.html', './script.js'],
  theme: {
    extend: {
      colors: {
        slate: {
          50: v('slate-50'), 100: v('slate-100'), 200: v('slate-200'), 300: v('slate-300'),
          400: v('slate-400'), 500: v('slate-500'), 600: v('slate-600'), 700: v('slate-700'),
          800: v('slate-800'), 900: v('slate-900'), 950: v('slate-950'),
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          400: v('brand-400'),
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
          950: v('brand-950'),
        },
        emerald: { 400: v('emerald-400') },
        purple: { 400: v('purple-400') },
        sky: { 400: v('sky-400') },
        amber: { 400: v('amber-400') },
        blue: { 400: v('blue-400') },
        indigo: { 300: v('indigo-300') },
      },
    },
  },
  plugins: [],
};