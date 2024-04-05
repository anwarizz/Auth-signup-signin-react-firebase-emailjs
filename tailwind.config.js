/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'className',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1A202C',
        'dark-text': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
