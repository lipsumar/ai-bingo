//const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    container: {
      padding: "2rem",
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
      //     fontFamily: {
      //       sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      //     },
      colors: {
        "bingo-black": "#1E1E1E",
        "bingo-orange": "#C75210",
        "bingo-white": "#F0EBEB",
      },
    },
  },
  plugins: [],
};
