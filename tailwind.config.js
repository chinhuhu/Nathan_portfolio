/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'mobile-s': { max: '320px' },
        'mobile-m': { min: '321px', max: '375px' },
        'mobile-l': { min: '376px', max: '425px' },
        tablet: { min: '426px', max: '768px' },
        'laptop-m': { min: '769px', max: '1024px' },
        'laptop-l': { min: '1025px', max: '1440px' },
        largescreen: { min: '1441px' },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [],
};
