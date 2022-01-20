const path = require("path");
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: [path.resolve(__dirname) + "/layouts/**/*.html"],
    options: {
      whitelist: [],
    },
  },

  theme: {
    extend: {

      fontFamily: {
        ...fontFamily,
        'sans': 'Helvetica, sans-serif'
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            p: {
              color: '#e76f51'
            },
            h2: {
              color: '#e76f51'
            },
            h3: {
              color: '#e766f51'
            }
          },
        },
      })
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ]
}

