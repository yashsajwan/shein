/** @type {import('tailwindcss').Config} */
import reac from "./im";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: "var(--font-outfit)",
      },
      colors: {
        primary: "#EB4897",
        secondary: "#000000",
        highlight: "#29AFEC",
      },
      boxShadow: {
        productShadow: "0 0 60px -15px rgba(0, 0, 0, 0.3)",
        productCarouselShadow: "0 0 40px -10px rgba(0, 0, 0, 0.3)",
      },
      padding: {
        body: "4%",
      },
      margin: {
        body: "4%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "login-bg": "url('../images/Rectangle 2 (4).svg')",
        "instagram-section-bg": "url('../images/Group 34290.png')",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
