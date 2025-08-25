/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        parchment: "#F5F0DC",
        deepPurple: "#2E1A47",
        gryffindor: "#7F0909",
        slytherin: "#1A472A",
        ravenclaw: "#0E1A40",
        hufflepuff: "#EEE117",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
