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
        wc: {
          green: "#006F51",
          "green-dark": "#004D38",
          "green-light": "#E9F4F0",
          yellow: "#FFCE00",
          "yellow-hover": "#E5B800",
          dark: "#212529",
          text: "#363636",
          muted: "#6C757D",
          border: "#E5E7EB",
          bg: "#FFFFFF",
          "bg-subtle": "#F8F9FA",
        },
        nature: {
          primary: "#006F51",
          "primary-dark": "#004D38",
          "primary-light": "#E9F4F0",
          secondary: "#FFCE00",
          "secondary-dark": "#E5B800",
          "secondary-light": "#FFF3B3",
          accent: "#006F51",
          "accent-dark": "#004D38",
          "accent-light": "#E9F4F0",
          darkgray: "#363636",
          lightgray: "#F8F9FA",
          card: "#FFFFFF",
          text: "#363636",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Roboto", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
