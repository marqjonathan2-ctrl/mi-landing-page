module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blackish: "#0B0C10",
        graphite: "#1F2833",
        platinum: "#00E5FF",
        silver: "#E5E4E2"
      },
      backdropBlur: {
        md: '8px'
      }
    }
  },
  plugins: []
}