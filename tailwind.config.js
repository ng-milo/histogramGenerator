/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      visibility: ["group-hover"]
    },
    screens: {
      'Cus': {'raw': '(max-height: 959px)'},
      'smH': {'raw': '(max-height: 744px)'}
    },
    height: {
      "85vh": "85vh",
      "90vh": "90vh",
      "95vh": "95vh",
      "100vh": "100vh",
      "120vh": "120vh",
      "300": "300px",
      "240vmin": "240vmin",
      "140vmin": "140vmin",
      "120vmin": "120vmin",
      "100vmin": "100vmin",
    },
    width: {
      "9per": "9%",
      "16": "50px",
      "80": "80px",
    },
    paddingright: {
      "14px": "14px",
    },
    tracking: {
      "2.9vw": "2.9vw",
    },
    shadow: {
      "bar": "rgb(255, 255, 255) 0px 0px 5px;"
    },
  },
  plugins: [],
}
