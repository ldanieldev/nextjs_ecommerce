/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [require('daisyui')],
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        light: {
          primary: '#0891b2',

          secondary: '#0284c7',

          accent: 'rgb(243 244 246)',

          neutral: 'rgb(229 231 235)',

          'base-100': '#fefefe',

          info: 'rgb(59, 130, 246)',

          success: '#25b57f',

          warning: '#ff9a24',

          error: '#E58B8B',
        },
        dark: {
          primary: '#0369a1',

          secondary: '#0891b2',

          accent: 'rgb(31, 41, 55)',

          neutral: '#191D24',

          'base-100': '#111827',

          info: 'rgb(59, 130, 246)',

          success: '#36D399',

          warning: '#FBBD23',

          error: '#F87272',
        },
      },
    ],
  },
}
