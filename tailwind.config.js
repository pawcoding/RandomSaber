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
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateColumns: {
        sm: 'repeat(auto-fit, minmax(8rem, 1fr))',
        DEFAULT: 'repeat(auto-fit, minmax(15rem, 1fr))'
      },
      saturate: {
        125: '1.25'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
