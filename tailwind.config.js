/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prime: "#00f2ff", // Cyan
        sec: "#7000ff",   // Purple
        dark: "#050505",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px #00f2ff, 0 0 20px #00f2ff' },
          '100%': { textShadow: '0 0 20px #7000ff, 0 0 40px #7000ff' },
        }
      }
    },
  },
  plugins: [],
}
