/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./**/*.{html,js}"],
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
  plugins: [],
}

