const path = require("path");
const { fontFamily, fontWeight } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./themes/basic/layouts/**/*.html"],
    options: {
      whitelist: [],
    },
  },

  theme: {
    extend: {

      fontFamily: {
        ...fontFamily,
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        '96': '24rem',
      },
      maxHeight: {
        '96': '24rem',
      },
      animation: {
        blob: "blob 7s infinite",
        cursor: 'cursor .6s linear infinite alternate',
        type: 'type 1.8s ease-out .8s 1 normal both',
        'type-reverse': 'type 1.8s ease-out 0s infinite alternate-reverse both',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.1)"
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)"
          }
        },
        type: {
          '0%': { width: '0ch' },
          '5%, 10%': { width: '1ch' },
          '15%, 20%': { width: '2ch' },
          '25%, 30%': { width: '3ch' },
          '35%, 40%': { width: '4ch' },
          '45%, 50%': { width: '5ch' },
          '55%, 60%': { width: '6ch' },
          '65%, 70%': { width: '7ch' },
          '75%, 80%': { width: '8ch' },
          '85%, 90%': { width: '9ch' },
          '95%': { width: '10ch' },
        }
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

