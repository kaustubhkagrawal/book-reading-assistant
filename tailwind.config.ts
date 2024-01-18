import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'llama-purple-light': '#EDDDFC',
        'llama-purple': '#D09FF6',
        'llama-magenta-light': '#FBD7F9',
        'llama-magenta': '#F48FEF',
        'llama-red-light': '#FBDBD9',
        'llama-red': '#F49B95',
        'llama-orange-light': '#FAE9D3',
        'llama-orange': '#F1BA72',
        'llama-yellow-light': '#FDF6DD',
        'llama-yellow': '#F8EC78',
        'llama-lime-light': '#E5FAD2',
        'llama-lime': '#A1E66D',
        'llama-teal-light': '#D9FBEC',
        'llama-teal': '#66D8A7',
        'llama-cyan-light': '#DAFAFB',
        'llama-cyan': '#70E4EC',
        'llama-blue-light': '#EDF5FD',
        'llama-blue': '#87B6F3',
        'llama-indigo-light': '#EDECFD',
        'llama-indigo': '#817AF2',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
