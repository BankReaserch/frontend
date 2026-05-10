/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C9A24A",
        darkBlue: "#071A2F",
      },
      backgroundImage: {
        "radial-dark":
          "radial-gradient(circle at 20% 20%, #0b2a4a, #071a2f 60%)",
      },
    },
  },
  plugins: [],
};