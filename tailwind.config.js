module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./pages/**/*.{html,js, jsx}", "./components/**/*.{html,js, jsx}"],
  theme: {
    extend: {
      fontFamily: { oswald: ["Oswald", "sans-serif"] },
      spacing: {
        "minus-full": "-100%",
      },
    },
  },
  plugins: [],
};
