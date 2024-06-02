/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    boxShadow: {
      DEFAULT: '0 3px 0 #57a300',
      teal: '0 3px 0 #0F766E',
      yellow: '0 3px 0 #E49E00',
      blueGray: '0 3px 0 #475569',
      none: 'none',
    },
    extend: {},
  },
  plugins: [],
}
