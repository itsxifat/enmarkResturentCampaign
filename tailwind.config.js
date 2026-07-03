/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#111111',
          cream: '#F6F5F0',
          green: '#9FE870',
          'green-dark': '#3F8F2E',
          'green-soft': '#EAF7DE',
          muted: '#737373',
          border: '#E6E3DB',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: [
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '18px',
        pill: '100px',
      },
    },
  },
  plugins: [],
}
