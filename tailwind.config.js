const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xxs: "320px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    fontSize: {
      ...defaultTheme.fontSize
    },
    fontFamily: {
      sans: ["Thunder, sans-serif"],
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      "display": ['Montserrat, sans-serif'],
    },
    extend: {
      rotate: {
        270: "270deg",
      },
      colors: {
        'gradient-blue': '#1C41E8',
        'gradient-dark': '#141517',
        'gradient-pink': '#E22194',
        'gradient-orange': '#FF4F18',
        'gradient-white': '#F2F4F7',
        'gradient-france-start': '#002654',
        'gradient-france-end': '#ED2939',
        'custom-dark': '#050505',
      },
      height: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      zIndex: {
        "-1": "-1",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        15: "15",
        200: "200",
        100: "100",
        999: "999",
      },
    },
  },
  plugins: [],
};
