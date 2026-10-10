/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // Tailwind scans these files for class names. If you add a new page, add it here.
  content: ['./*.html', './script.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
    },
  },
  plugins: [],
};