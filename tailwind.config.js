/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f5ecdd',
          300: '#ede0c8',
        },
        blush: {
          50: '#fdf5f4',
          100: '#faeae7',
          200: '#f3d6d1',
          300: '#e8bab2',
          400: '#d99a8f',
        },
        rose: {
          50: '#faf1ee',
          100: '#f2ddd6',
          200: '#e3bcb1',
          300: '#cf9587',
          400: '#b8756a',
          500: '#9c5c52',
        },
        sage: {
          50: '#f4f6f2',
          100: '#e6ebe1',
          200: '#cdd8c3',
          300: '#aec19f',
          400: '#8ba57c',
          500: '#6f8a5f',
        },
        lavender: {
          50: '#f6f4f8',
          100: '#eae4f0',
          200: '#d5c9e3',
          300: '#bcaad2',
        },
        charcoal: {
          50: '#f7f6f5',
          100: '#e9e6e2',
          300: '#a89f96',
          500: '#6b6259',
          700: '#453f39',
          800: '#332e29',
          900: '#241f1c',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(69, 63, 57, 0.08)',
        card: '0 4px 28px -6px rgba(69, 63, 57, 0.10)',
        lift: '0 12px 40px -10px rgba(69, 63, 57, 0.16)',
      },
      borderRadius: {
        xl2: '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
