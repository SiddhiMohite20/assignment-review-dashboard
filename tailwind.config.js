export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#2a2358',
        brand: { DEFAULT: '#6d5dfc', dark: '#5645e0', soft: '#efecff' },
      },
      boxShadow: { soft: '0 8px 24px -10px rgba(109,93,252,.35)' },
    },
  },
  plugins: [],
}