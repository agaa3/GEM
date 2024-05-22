/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        text: 'text 5s ease infinite'
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      backgroundImage: {
        'wojtek': "url('/wojtek.gif')",
        'marcin': "url('/marcin.gif')",
        'karol': "url('/karol.gif')",
        'andrzej': "url('/andrzej.gif')",
        'kropki': "url('/kropki.png')"
      },
      dropShadow: {
        'takibezrozmazania': '10px 5px 0 rgba(0, 0, 0, 0.5)',
        'takibezrozmazaniaalemniejszy': '4px 3px 0 rgba(0, 0, 0, 0.5)',
        'tentego': '4px 8px 12px rgba(255, 255, 255, 0.25)',
      }
    },
  },
  plugins: [
    require('tailwindcss-hero-patterns')
  ],
}

