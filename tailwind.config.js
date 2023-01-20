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
    },
  },
  plugins: [],
};
