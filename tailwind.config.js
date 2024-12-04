/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Arial', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'menu': '1.125rem',     // 18px
        'header': '2.25rem',    // 36px
        'title': '1.75rem',     // 28px
      },
      animation: {
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      colors: {
        background: {
          dark: '#111827',
          darker: '#0F172A',
        },
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
      },
      spacing: {
        'header': '4rem',
        'sidebar': '280px',
      },
    },
  },
  plugins: [],
};