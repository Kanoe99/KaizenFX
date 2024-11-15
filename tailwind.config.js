import colors from 'tailwindcss/colors';
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,ejs}"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
      width: {
        pic: 'aspect-[1/1.41]',
      },
      boxShadow: {
        'inner-sm': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        'inner-md': 'inset 2px -2px 6px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 4px -3px 8px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities(
        {
          '.draggable-region': {
            '-webkit-app-region': 'drag',
            '-webkit-user-select': 'none',
          },
          '.non-draggable': {
            '-webkit-app-region': 'no-drag',
          },
          '.user-select-none': {
            'user-select': 'none',
          },
          '.user-select-text': {
            'user-select': 'text',
          },
          '.user-select-all': {
            'user-select': 'all',
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};