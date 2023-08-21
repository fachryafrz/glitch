/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#15181D",
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
