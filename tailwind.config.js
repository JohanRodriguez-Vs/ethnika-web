/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF9F7',
          100: '#F5F3EF',
          200: '#EDE9E0',
          300: '#E0D9CE',
          400: '#C6A75E',
          500: '#B8975F',
          600: '#A58456',
          700: '#92724D',
          800: '#3D3D3D',
          900: '#1A1A1A',
        },
        accent: {
          gold: '#C6A75E',
          dark: '#1A1A1A',
          light: '#F5F3EF',
          cream: '#EDE9E0',
        },
        earth: {
          50: '#FAF8F6',
          100: '#F5F1ED',
          200: '#E8DFD5',
          300: '#DBC8B5',
          400: '#C4A878',
          500: '#B89968',
          600: '#A58456',
          700: '#92724D',
          800: '#7A5E42',
          900: '#634D39',
        },
        coffee: {
          50: '#FAF7F3',
          100: '#F5EFEA',
          200: '#E8D7C5',
          300: '#DBC08A',
          400: '#B8945F',
          500: '#9D7E4F',
          600: '#826840',
          700: '#6A5337',
          800: '#533F2F',
          900: '#3E2C24',
        },
      },

      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },

      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
      },

      boxShadow: {
        elegant: '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
        'elegant-lg': '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
        gold: '0 10px 30px -5px rgba(198, 167, 94, 0.3)',
      },

      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      transitionDuration: {
        400: '400ms',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },

      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      backgroundImage: {
        'hero-dark': 'linear-gradient(135deg, #1A1A1A 0%, #3D3D3D 100%)',
        'hero-gold': 'linear-gradient(135deg, #C6A75E 0%, #B8975F 100%)',
      },

      zIndex: {
        navbar: '40',
        dropdown: '50',
        modal: '100',
        notification: '120',
      },
    },
  },

  plugins: [],
};
