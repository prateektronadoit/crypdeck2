/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-left': 'slideLeft 1s forwards ease-in-out',
        'slide-right': 'slideRight 1s forwards ease-in-out',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        slideLeft: {
          '0%': { transform: 'translate(-50%, -50%)' },
          '100%': { transform: 'translate(-150%, -50%)' },
        },
        slideRight: {
          '0%': { transform: 'translate(-50%, -50%)' },
          '100%': { transform: 'translate(50%, -50%)' },
        },
      },
    },
  },
  plugins: [],
}
