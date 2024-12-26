/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "orange": "#ff9d00",
        "yellow": "#fcc766",
        "light-yellow": "#ffe5b4",
        "off-white": "#fff9ef",
        "violet": "#aa82da",
        "dark-gray": "#686868",
      },
      fontFamily: {
        sans: ["Quicksand_Regular"],
        bold: ["Quicksand_Bold"],
      },
    },
  },
  plugins: [],
}