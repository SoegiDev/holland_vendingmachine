/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        hollandtints: {
          100: "#f9d9d3",
          200: "#f6c6bd",
          300: "#f3b3a7",
          400: "#f0a092",
          500: "#ed8d7c",
          600: "#ea7a66",
          700: "#e76650",
          800: "#e4543a",
          900: "#E24125",
        },
        hollandshades: {
          100: "#e24125",
          200: "#cb3a21",
          300: "#b4341d",
          400: "#9e2d19",
          500: "#872716",
          600: "#712012",
          700: "#5a1a0e",
          800: "#43130b",
          900: "#2d0d07",
        },
        // ...
      },
    },
  },
  plugins: [],
};
