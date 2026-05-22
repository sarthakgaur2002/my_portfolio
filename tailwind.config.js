/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#020208',
          card: 'rgba(10, 10, 25, 0.4)',
          primary: '#00f0ff', // neon blue
          secondary: '#a855f7', // purple
          accent: '#06b6d4', // cyan
          text: '#f3f4f6',
          muted: '#9ca3af',
          lightBg: '#f8fafc',
          lightCard: 'rgba(255, 255, 255, 0.6)',
          lightPrimary: '#2563eb',
          lightSecondary: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Outfit', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 240, 255, 0.3)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.3)',
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
