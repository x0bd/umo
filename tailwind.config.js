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
        // Umo brand palette — light mode
        brand: {
          bg: '#F4F4F4',
          pink: '#FF0048',
          'pink-text': '#450010',
          'pink-tint': '#FFF0F3',
          platinum: '#E6E6E6',
          'platinum-text': '#111111',
          white: '#FFFFFF',
          border: '#CCCCCC',
          muted: '#555555',
          dock: '#111111',
          success: '#00C853',
          // dark accent (dark cards / dark bg elements)
          dark: '#050505',
          'dark-border': '#333333',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '28px',
        pill: '100px',
      },
    },
  },
  plugins: [],
};
