import type { Config } from 'tailwindcss';
import { StatePlugin, PartPlugin } from 'tailwindcss-plugin-custom-elements';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      '2xs': 'var(--sl-font-size-2x-small)',
      xs: 'var(--sl-font-size-x-small)',
      sm: 'var(--sl-font-size-small)',
      base: 'var(--sl-font-size-medium)',
      lg: 'var(--sl-font-size-large)',
      xl: 'var(--sl-font-size-x-large)',
      '2xl': 'var(--sl-font-size-2x-large)',
      '3xl': 'var(--sl-font-size-3x-large)',
      '4xl': 'var(--sl-font-size-4x-large)',
    },
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
