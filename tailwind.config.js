/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#be8a7d', // Dark Pink
        secondary: '#1b365d', // Dark Blue
      },
    },
  },
  plugins: [],
}

