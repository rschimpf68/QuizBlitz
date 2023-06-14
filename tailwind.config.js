/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minHeight: {
        '3/4': '75%',
        '5/6': '83%',
      },
      fontFamily: {
        pixel: ['upheavtt', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customBlue: '#c8ecfc',
        BlueBG: '#0c4c8c',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
