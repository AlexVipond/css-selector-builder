const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        ...colors,
        gray: {
          "50": "#EAF2FB",
          "100": "#DDEBF9",
          "200": "#CADAEF",
          "300": "#7C95B8",
          "400": "#7E96B8",
          "500": "#4E608B",
          "600": "#364366",
          "700": "#232E4C",
          "800": "#1B2540",
          "900": "#151F36",
          "1000": "#0F1729",
          "1100": "#0C1221",
          "1200": "#080D17",
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
        display: ['Shadows Into Light Two', ...defaultTheme.fontFamily.sans]
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addComponents }) => addComponents({
      // Buttons
      '.btn': {
        ...apply('flex items-center gap-2 px-2 py-1 rounded text-sm disabled:opacity-40'),
        '.icon': apply('h-[1em] w-[1em]'),
      },
      '.btn--lg': apply('px-3 py-2 text-base'),
      '.btn--xl': apply('px-4 py-3 text-lg'),
      '.btn--raised': apply('shadow hover:shadow-lg focus:shadow-lg transition'),
      '.btn--grows': apply('scale-100 hover:scale-110 focus:scale-110 transform origin-center transition'),

      '.input-label': apply('text-sm font-semibold tracking-wide'),
    })),
    plugin(({ addUtilities }) => addUtilities({
      '.appearance-textfield': {
        appearance: 'textfield',
      }
    }))
  ],
}

function apply (classes) {
  return {
    [`@apply ${classes}`]: {}
  }
}
