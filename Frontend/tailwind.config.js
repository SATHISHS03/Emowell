/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
      extend: { fontFamily: {
        'inter': ['Inter', 'sans-serif'], // Add this line
      }},
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")
  ,require('postcss-import'),
  require('tailwindcss'),
  require('autoprefixer'),]
  }