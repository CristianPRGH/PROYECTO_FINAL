/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./**/*.{html,js,php}"],
  // purge: [],
  // purge: ['./**/*.{html,js,css}'],
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
    require('@tailwindcss/typography')
  ],
}