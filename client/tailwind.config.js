/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4945ff",
        secondary: "#181826",
        highlight: "#212134",
        highlightsecondary: "#4a4a6a",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [],
}
