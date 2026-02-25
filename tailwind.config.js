/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './lib/**/*.{js,ts,tsx}',
    './providers/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Umo brand palette
        brand: {
          bg: '#050505',
          pink: '#FF1A55',
          'pink-vivid': '#FF0055',
          platinum: '#E6E6E6',
          maroon: '#450010',
          border: '#333333',
          muted: '#888888',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
