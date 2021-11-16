module.exports = {
  theme: {
    extend: {
      maxWidth: {
        '7xl': '80em'
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '8rem'
      },
      spacing: {
        256: '256px',
        72: '18rem',
        84: '21rem',
        96: '24rem',
        128: '32rem',
      },
      inset: {
        256: '256px'
      }
    }
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus']
  }
}
