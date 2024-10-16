import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary))',
        secondary: 'rgb(var(--secondary))',
      },
      fontFamily: {
        arial: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
