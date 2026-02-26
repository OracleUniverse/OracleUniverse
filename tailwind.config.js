/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        'oracle-red': '#E6192B',
        'oracle-accent': '#FF3344',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'tab-content': 'slideUp 0.3s ease-out forwards',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '0.4' },
          '100%': { transform: 'scale(0.95)', opacity: '0.8' },
        },
        slideUp: {
          'from': { transform: 'translateY(10px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        scaleIn: {
          'from': { transform: 'scale(0.95) translateY(10px)', opacity: '0' },
          'to': { transform: 'scale(1) translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}