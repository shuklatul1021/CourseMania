/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        black : {
          600 : "#0a0b10",
          100 : "#192030"
        },
        yellow :{
          300 : "#b99762"
        },
        blue : {
          200 : "#3771e5",
          400 : "#2559dc"
        },
        white : {
          300 : "#9ca8b2",
          100 : "#e5e8d2"
        },
        grey : {
          100 : "#2a354b"
        }
      }
    },
  },
  plugins: [],
}

