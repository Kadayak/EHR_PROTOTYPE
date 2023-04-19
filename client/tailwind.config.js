/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily:{
        customfontname: ['Inter var', ...defaultTheme.fontFamily.sans,]
      },
      extend: {
        backgroundImage: {
          'hero': "url('../public/images/hospital_stock.jpg')"
        }
      },
  },
  variants: {},
  plugins: [],
}
