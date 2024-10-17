import type { Config } from 'tailwindcss';
import { StatePlugin, PartPlugin } from 'tailwindcss-plugin-custom-elements';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary))',
        secondary: 'rgb(var(--secondary))',
      },
      fontFamily: {
        arial: ['var(--font-family-sans)'],
      },
    },
  },
  plugins: [StatePlugin(), PartPlugin()],
} satisfies Config;
