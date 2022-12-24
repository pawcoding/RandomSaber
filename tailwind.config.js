const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    colors: require('./tailwind.colors'),
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        transparent: '#00000000'
      },
      fontFamily: {
        mono: ['Gugi', 'Teko', ...defaultTheme.fontFamily.sans],
        sans: ['Teko', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
