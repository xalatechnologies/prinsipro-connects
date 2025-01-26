/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.12)',
        'section': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.08)',
        'section-hover': '0 2px 4px rgba(0, 0, 0, 0.08), 0 2px 3px -2px rgba(0, 0, 0, 0.12)',
        'header': '0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 1px -1px rgba(0, 0, 0, 0.05)',
        'modal': '0 4px 16px -4px rgba(0, 0, 0, 0.12), 0 8px 32px -8px rgba(0, 0, 0, 0.16)',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Based on digdir.no typography scale
        'xs': ['0.75rem', { lineHeight: '1.125rem' }],    // 12px
        'sm': ['0.875rem', { lineHeight: '1.375rem' }],   // 14px
        'base': ['1rem', { lineHeight: '1.625rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '3.5rem' }],        // 48px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
      },
      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.625',
        relaxed: '1.75',
        loose: '2',
      },
      colors: {
        // digdir.no color palette
        primary: {
          DEFAULT: '#1E2B3C',
          50: '#F5F6F7',
          100: '#E1E3E7',
          200: '#C2C7CF',
          300: '#A3ABB7',
          400: '#848F9F',
          500: '#667387',
          600: '#4D5A6F',
          700: '#344157',
          800: '#1E2B3C',
          900: '#0B1524',
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
};