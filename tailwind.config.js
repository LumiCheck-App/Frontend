/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        orange: "#ff9d00",
        yellow: "#fcc766",
        "light-yellow": "#ffe5b4",
        "off-white": "#fff9ef",
        violet: "#aa82da",
        "dark-gray": "#686868",
        "light-gray": "#d0d0d0",
        red: "#da6f6f",
      },
      fontFamily: {
        quickregular: ["Quicksand_400Regular"],
        quickbold: ["Quicksand_700Bold"],
      },
    },
  },
  plugins: [],
};
