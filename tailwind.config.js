/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b365d', // Dark Pink
        secondary: 'white', // Dark Blue
        dustyRose: '#BE8A7C' //  dusky rose 
      },
    },
  },
  plugins: [],
}

