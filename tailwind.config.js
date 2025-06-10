module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    transform: ['group-hover'],
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    animation: {
      'fade-in': 'fadeIn 1s ease-out forwards',
    },
  },
},
  plugins: [],
};