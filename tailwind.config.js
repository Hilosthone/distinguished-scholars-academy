// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         mainBlue: "#002EFF",
//         accentYellow: "#FCB900",
//         neutralWhite: "#FFFFFF",
//         neutralBlack: "#000000",
//       },
//       fontFamily: {
//         sans: ["Inter", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dsaBlue: "#002EFF",
        dsaYellow: "#FCB900",
        dsaBlack: "#000000",
        dsaWhite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
