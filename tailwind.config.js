/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-1': '#0c1014',
        'dark-2': '#18191C',
        'gray-1': '#F5F5F5',
        'gray-2': '#858789',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        sarabun: ['Sarabun', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const customUtilities = {
        '.inset-center': {
          left: '50%',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.bg-gradient-pink-to-blue': {
          background:
            'linear-gradient(270deg,rgba(63, 94, 251, 1) 13%, rgba(135, 85, 196, 1) 61%,rgba(icons8-javascript (1).svg, 1) 100%)',
        },
        '.bg-gradient-blue-to-green': {
          background:
            'linear-gradient(90deg, rgba(80, 68, 251, 1) 13%,rgba(116, 156, 230, 1) 62%,rgba(155, 250, 208, 1) 100%)',
        },
        '.text-gradient-pink-to-blue': {
          background:
            'linear-gradient(270deg,rgba(63, 94, 251, 1) 13%, rgba(135, 85, 196, 1) 61%,rgba(252, 70, 107, 1) 100%)',
          color: 'transparent',
          backgroundClip: 'text',
        },
        '.text-gradient-blue-to-green': {
          background:
            'linear-gradient(90deg, rgb(68, 135, 251) 13%, rgb(68, 224, 251) 62%,rgba(155, 250, 208, 1) 100%)',
          color: 'transparent',
          backgroundClip: 'text',
        },
      };
      addUtilities(customUtilities, ['responsive', 'hover']);
    }),
  ],
};
