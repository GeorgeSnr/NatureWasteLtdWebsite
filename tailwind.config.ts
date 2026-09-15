import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          primary: "#0B6B1E",
          "primary-dark": "#074E15",
          "primary-light": "#158B29",
          secondary: "#9AD44D",
          "secondary-dark": "#84B83C",
          "secondary-light": "#B4E573",
          accent: "#D7C93A",
          "accent-dark": "#BAA92A",
          "accent-light": "#E6DB5F",
          darkgray: "#4A4A4A",
          lightgray: "#E8E8E8",
          card: "#F8F9FA",
          text: "#333333",
        },
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "50%": { transform: "scale(1.25)", opacity: "0.2" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
