/** @type {import('tailwindcss').Config} */
const defailtTheme = require("tailwindcss/defaultTheme")

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      serif: ["playfair Display", ...defaultTheme.fontFamily.roboto,],
      sans: ["Popins", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}

