/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1520px',
      xxl: '1700px'
    },
    extend: {
      colors: {
        primaryColor: '#2563eb',
        primaryColorHover: '#1d4ed8',
        accentColor: '#e11d48',
        accentColorHover: '#be123c',
        successColor: '#16a34a',
        successColorHover: '#15803d',
        warningColor: '#d97706',
        warningColorHover: '#b45309',
        errorColor: '#dc2626',
        errorColorHover: '#b91c1c',
        textColorBlack: '#000000',
        textColorWhite: '#ffffff',
        textColorWhiteHover: '#d1d5db',
        backgroundColorWhite: '#ffffff',
        backgroundColorGray: '#f5f5f5',
        backgroundColorBlack: '#0f172a'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    }
  },
  plugins: []
};
