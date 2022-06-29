module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primaryColor: "#2563eb",
        primaryColorHover: "#1d4ed8",
        accentColor: "#e11d48",
        accentColorHover: "#be123c",
        successColor: "#16a34a",
        successColorHover: "#15803d",
        warningColor: "#d97706",
        warningColorHover: "#b45309",
        errorColor: "#dc2626",
        errorColorHover: "#b91c1c",
        textColorBlack: "#000000",
        textColorWhite: "#ffffff",
        backgroundColorWhite: "#ffffff",
        backgroundColorBlack: "#0f172a",
        backgroundColorGray: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
