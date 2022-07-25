/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-1': '#0c1014',
        'dark-2': '#18191C',
        'gray-1': '#F5F5F5',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        sarabun: ['Sarabun', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
