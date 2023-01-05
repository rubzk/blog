const path = require("path");
const { fontFamily, fontWeight } = require('tailwindcss/defaultTheme')

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
              color: '#4B443C'
            },
            h1: {
              color: '#0A0A00',
              fontWeight: 600
            },
            h2: {
              color: '#0A0A00',
              fontWeight: 600
            },
            h3: {
              color: '#0A0A00'
            },
            h4: {
              color: '#0A0A00'
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

