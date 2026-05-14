/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2D5A27',
        secondary: '#FDFBF7',
        tertiary: '#7C3A55',
        neutral: '#757872',
        backgroundPrimary: '#F9FAF2',
        button: '#ebf5ff'
      }
    },
  },
  plugins: [],
}