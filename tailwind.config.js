/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kainet-black': '#000000',
        'kainet-white': '#EAEAEA',
        'kainet-cyan': '#00E5FF',
        'kainet-blue': '#0D1B3E',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out'
      }
    },
  },
  plugins: [],
}