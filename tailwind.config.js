const defaultColors = require("tailwindcss/colors");

const colors = {
  ...defaultColors,
  ...{
    primary: "#FF0000",
    secondary: "#1B998B",
    secondarylight: "#F3F7F0",
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors,
  },
  plugins: [],
  important: true,
};
