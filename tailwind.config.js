/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        cachet: ["Cachet", "sans-serif"],
        cachetpro: ["CachetPro", "sans-serif"],
        cachetproobl: ["CachetProObl", "sans-serif"],
        rog: ["ROGFonts", "sans-serif"],
        robotocon: ["RobotoCon", "sans-serif"],
        robotoconbold: ["RobotoConBold", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
