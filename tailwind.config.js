/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'primary-purple': {
          150: '#c4b1f9',
          200: '#7B6BA8',
          500: '#432C81',
        },
        'primary-green': {
          200: '#a4cfc3',
          400: '#93c19e',
          600: '#4d9b91',
          800: '#014737'
        }
      },
    },
  },
  plugins: [],
}