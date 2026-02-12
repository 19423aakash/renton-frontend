/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Syne', 'sans-serif'], // Connecting to a more premium display font if available, or just use Outfit
      },
      colors: {
        // Luxury Dark Theme
        dark: {
          950: '#050505', // Deepest Black
          900: '#0a0a0a', // Rich Black
          800: '#121212', // Surface
          700: '#1a1a1a', // Card bg
        },
        // Gold Accents
        gold: {
          400: '#FCD34D',
          500: '#D4AF37', // Classic Gold
          600: '#B4941F',
        },
        // Vibrant Orange
        brand: {
          orange: '#FF5722', // Deep Orange
          accent: '#FF8A65',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
        float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
