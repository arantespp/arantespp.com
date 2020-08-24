module.exports = {
  purge: {
    mode: 'all',
    content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  },
  theme: {
    extend: {},
    typography: {
      default: {
        css: {
          h1: {
            textAlign: 'center',
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
