/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purdue: {
          gold: '#C9A961',
          'gold-dark': '#B89951',
          'gold-light': '#D4BA7A',
          black: '#000000',
          'dark-gray': '#2D2D2D',
          white: '#FFFFFF',
        }
      }
    },
  },
  plugins: [],
}
