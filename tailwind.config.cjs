/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    colors: {
      'green-light': '#EFFBFB',
      'green-medium': '#01A195',
      'green-dark': '#015659',

      'blue-dark': '#252C43',

      'grey-#1': '#1F1F1F',
      'grey-#2': '#828282',
      'grey-#3': '#E0E0E0',
      'grey-#4': '#F9F9F9',
      'grey-#5': '#FFFFFF',

      'blue': '#326BFF',
      'red': '#C32323',
    },
    boxShadow: {
      'shadow-#1': '0px 2px 5px 0px #01A1953D',
      'shadow-#2': '0px 5px 20px 5px #01A1953D',
      'shadow-#3': '0px 10px 30px 5px #01A1953D',
      'shadow-button': '0px 1.4526855945587158px 3.6317138671875px 0px #0000001A'
    },

    fontFamily: {
      sans: ['roboto flex', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'frame-one': 'url(/assets/bg-frame1.png)'
      }
    },
  },
  plugins: [],
}