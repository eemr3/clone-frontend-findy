/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    colors: {
      'blue-dark': '#252C43',
      'blue-dark-#1': '#21283C',

      'green-light': '#EFFBFB',
      'green-medium': '#01A195',
      'green-dark': '#015659',

      'grey-#1': '#1F1F1F',
      'grey-#2': '#828282',
      'grey-#3': '#E0E0E0',
      'grey-#4': '#F9F9F9',
      'grey-#5': '#FFFFFF',

      'tag-blue': '#5EC5FF',
      'tag-green': '#6EFF6B',
      'tag-pink': '#FF4DC2',
      'tag-purple': '#BC67FF',
      'tag-red': '#FF6868',
      'tag-yellow': '#FFEF5F',

      'black': '#000000',
      'blue': '#326BFF',
      'red': '#C32323',
      'white': '#FFFFFF'
    },
    boxShadow: {
      'shadow-#1': '0rem 0.2rem 0.5rem 0rem #01A1953D',
      'shadow-#2': '0rem 0.5rem 2rem 0.5rem #01A1953D',
      'shadow-#2-card': '0rem 0.25rem 1rem 0.25rem #01A1953D',
      'shadow-#3': '0rem 1rem 3rem 0.5rem #01A1953D',
      'shadow-button': '0rem 0.14526855945587158rem 0.36317138671875rem 0rem #0000001A',
      'shadow-tag': ' 0rem 0.17773873805999756rem 0.44434685707092285rem 0rem #0000001A'
    },

    fontFamily: {
      sans: ['roboto flex', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'frame-one': 'url(/assets/bg-frame1.png)'
      }
    },
    screens: {
      '4xl': { 'max': '2170px' },
      // => @media (max-width: 2170px) { ... }
      // => @media (max-width: 2170px) { ... }
      '3xl': { 'max': '1770px' },
      // => @media (max-width: 1870px) { ... }
      '2xl': { 'max': '1600px' },
      // => @media (max-width: 1670px) { ... }

      'xl': { 'max': '1350px' },
      // => @media (max-width: 1279px) and (max-height: 1350px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px)  { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
      'md-h': { 'raw': '(max-height: 1110px)' },
      // => @media (min-height: 800px) { ... }
    },
  },

  plugins: [],
}