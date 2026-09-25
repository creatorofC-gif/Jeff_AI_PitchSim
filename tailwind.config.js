/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: '#121315',
        surface: '#121315',
        'surface-dim': '#121315',
        'surface-bright': '#38393a',
        'surface-container-lowest': '#0d0e0f',
        'surface-container-low': '#1b1c1d',
        'surface-container': '#1f2021',
        'surface-container-high': '#292a2b',
        'surface-container-highest': '#343536',
        primary: '#ffffff',
        'primary-fixed': '#e2e2e4',
        'on-primary': '#121315',
        'on-surface': '#e3e2e3',
        'on-surface-variant': '#c5c7c9',
        secondary: '#44e2cd',
        'secondary-fixed': '#62fae3',
        'secondary-container': '#03c6b2',
        'on-secondary': '#003731',
        outline: '#8f9194',
        'outline-variant': '#44474a',
        error: '#ffb4ab',
        'error-container': '#93000a',
        status: {
          success: '#10b981',
          error: '#ffb4ab',
          warning: '#fcba5d',
        }
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px',
      },
      boxShadow: {
        'terminal': '0 4px 16px -2px rgba(0, 0, 0, 0.55)',
        'modal': '0 16px 36px -4px rgba(0, 0, 0, 0.75)',
      }
    },
  },
  plugins: [],
}
