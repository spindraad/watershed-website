import type { Preview } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '../app/tailwind.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      options: {
        primary: {
          name: 'Primary color',
          value: 'rgb(var(--primary))',
        },
        secondary: {
          name: 'Secondary color',
          value: 'rgb(var(--secondary))',
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    storySort: {
      order: ['Introduction', 'Brand', 'Components'],
    },
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
    },
  },
  initialGlobals: {
    background: { value: 'primary' },
  },
};

export default preview;
