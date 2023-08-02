/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          "dark-gray": "#141415",
        },
        primary: {
          red: "#df040a",
          orange: "#ff6b27",
        },
      },
      fontFamily: {
        outfit: ["outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
