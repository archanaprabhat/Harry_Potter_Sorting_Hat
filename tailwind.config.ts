import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Harry Potter Main Colors
        gold: "#EFE8CA",
        bronze: "#CD7F32", 
        deepPurple: "#191124",
        magicalBlue: "#2F1C39",
        parchment: "#F4E4BC",
        darkWood: "#3C2A17",
        
        // House Colors (for future pages)
        gryffindor: "#7C0A02",
        gryffindorGold: "#D4AF37",
        slytherin: "#1A472A", 
        slytherinSilver: "#C0C0C0",
        hufflepuff: "#ECB939",
        hufflepuffBlack: "#2D2926",
        ravenclaw: "#0E1A40",
        ravenclawBronze: "#946B2D",
      },
      fontFamily: {
        cinzel: ["Cinzel", ...defaultTheme.fontFamily.serif],
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      textShadow: {
        lg: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        md: "1px 1px 2px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;