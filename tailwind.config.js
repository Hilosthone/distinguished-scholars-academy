// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}", // adjust paths if needed
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'linear-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [],
// }


// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Use 'class' strategy for manual toggle
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Include all src files
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFFFFF',       // White for light mode backgrounds
          dark: '#000000',        // Black for dark mode backgrounds
        },
        accent: {
          light: '#FF7F50',       // Orange for light mode accents
          dark: '#FF7F50',        // Same orange for dark mode accents
        },
        text: {
          light: '#000000',       // Black text for light mode
          dark: '#FFFFFF',        // White text for dark mode
        },
      },
      backgroundImage: {
        'hero-gradient-light': 'linear-gradient(to right top, #ffffff, #ffe5d1, #ffd2b3)',
        'hero-gradient-dark': 'linear-gradient(to right top, #000000, #1a1a1a, #333333)',
      },
      fontFamily: {
        geistSans: ['var(--font-geist-sans)'],
        geistMono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
