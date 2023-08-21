/** @type {import('tailwindcss').Config} */
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
  plugins: [],
};
