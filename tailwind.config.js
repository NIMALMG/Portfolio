/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { 
            opacity: 0.3,
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: 0.6,
            transform: 'scale(1.1)'
          },
        },
      },
      colors: {
        dark: {
          DEFAULT: '#1e1e2f',
          lighter: '#2a2a3a'
        },
        accent: {
          from: '#7f5af0',
          to: '#2cb67d'
        },
        text: {
          primary: '#ffffff',
          secondary: '#94a1b2'
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px'
      }
    }
  },
  plugins: [],
}
