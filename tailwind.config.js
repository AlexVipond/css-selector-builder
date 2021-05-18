const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        ...colors,
        denim: {
          '50': '#EAF3FB',
          '100': '#DDECF9',
          '200': '#CADCF0',
          '300': '#AEC4E1',
          '400': '#7C94B8',
          '500': '#4E608B',
          '600': '#324066',
          '700': '#232E4C',
          '800': '#1B2540',
          '900': '#151F36',
          '1000': '#0F1729',
          '1100': '#0C1221',
          '1200': '#080D17',
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

      '.brand-gradient-to-r': apply('bg-gradient-to-r from-violet-800 to-violet-600'),

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
