/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        fontSize: {
            'xxs': '0.3rem', // or '10px'
          }
      },
    },
    plugins: [],
  }
  