/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      rating_color: "hsl(48, 96%, 58%)",
      white: "hsl(0, 0%, 100%)",
      "light-gray": "hsl(216, 12%, 84%)",
      "medium-gray": "hsl(216, 12%, 54%)",
      "medium-gray-transparent": "hsl(216, 12%, 54%, 0.11)",
      "dark-blue": "hsl(213, 19%, 18%)",
      "very-dark-blue": "hsl(216, 12%, 8%)",
    },
    extend: {},
  },
  plugins: [],
};
