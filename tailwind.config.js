/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
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
    },
  },
  plugins: [],
}