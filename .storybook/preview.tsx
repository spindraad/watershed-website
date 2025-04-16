import type { Preview } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import {
  withRouter,
  reactRouterParameters,
} from 'storybook-addon-remix-react-router';
import { withShoelace } from './withShoelace';
import i18n from './i18n-storybook';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '../app/tailwind.css';
import './viewer.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    i18n,
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
    reactRouter: reactRouterParameters({
      routing: {
        path: '/:lang?',
      },
    }),
    storySort: {
      order: ['Introduction', 'Brand', 'Components'],
    },
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Brand',
          'Atoms',
          'Molecules',
          'Organisms',
          'Forms',
          'Templates',
        ],
      },
    },
  },
  initialGlobals: {
    background: { value: 'primary' },
    locale: 'en',
    locales: {
      en: 'English',
      nl: 'Nederlands',
    },
  },
  decorators: [withRouter(), withShoelace()],
};

export default preview;
