/** @type {import('tailwindcss').Config} */

// Palette colors are backed by CSS variables (see src/index.css) so light and
// dark themes can swap values at runtime without touching component classes.
const palette = (name, shades) =>
  Object.fromEntries(shades.map((shade) => [shade, `rgb(var(--${name}-${shade}) / <alpha-value>)`]))

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: palette('cream', [50, 100, 200, 300]),
        blush: palette('blush', [50, 100, 200, 300, 400]),
        rose: palette('rose', [50, 100, 200, 300, 400, 500]),
        sage: palette('sage', [50, 100, 200, 300, 400, 500]),
        lavender: palette('lavender', [50, 100, 200, 300]),
        charcoal: palette('charcoal', [50, 100, 300, 500, 700, 800, 900]),
      },
      borderColor: {
        DEFAULT: 'rgb(var(--charcoal-100) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
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
