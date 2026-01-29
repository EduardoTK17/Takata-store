/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shopee: '#ee4d2d', // Sua cor laranja personalizada
      },
    },
  },
  plugins: [],
}