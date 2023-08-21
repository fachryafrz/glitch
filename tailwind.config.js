/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        cover: "3 / 4",
      },
      screens: {
        xs: "375px",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: {
          bg: "#15181D",
          secondary: "#1E2127",
          yellow: "#FEDE24",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
    }),
  ],
};
