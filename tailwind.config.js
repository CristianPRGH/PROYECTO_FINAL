/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./**/*.{html,js}"],
  // purge: [],
  // purge: ['./**/*.{html,js}'],
  theme: {
    extend: {
      visibility:{
        'hidden':'hidden',
        'visible':'visible'
      }
    },
  },
  variants:{
    extend:{
      visibility: ['group-hover', 'group-focus', 'group-inactive', 'valid', 'notvalid']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwind/base'),
    require('@tailwind/components'),
    require('@tailwind/utilities')
  ],
}

