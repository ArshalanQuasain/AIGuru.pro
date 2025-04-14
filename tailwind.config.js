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
      fontSize: {
        'xs': '0.875rem',      // Increased from default 0.75rem
        'sm': '1rem',         // Increased from default 0.875rem
        'base': '1.125rem',   // Increased from default 1rem
        'lg': '1.25rem',      // Increased from default 1.125rem
        'xl': '1.375rem',     // Increased from default 1.25rem
        '2xl': '1.625rem',    // Increased from default 1.5rem
        '3xl': '2rem',        // Increased from default 1.875rem
        '4xl': '2.5rem',      // Increased from default 2.25rem
        '5xl': '3.25rem',     // Increased from default 3rem
        '6xl': '4rem',        // Increased from default 3.75rem
      },
    },
  },
  plugins: [],
}
