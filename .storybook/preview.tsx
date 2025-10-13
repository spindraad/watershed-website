import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
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
        surface: {
          name: 'Surface',
          value: 'rgb(var(--surface__surface))',
        },
        surfacePrimary: {
          name: 'Surface (primary container)',
          value: 'rgb(var(--surface__primary-container))',
        },
        surfaceSecondary: {
          name: 'Surface (secondary container)',
          value: 'rgb(var(--surface__secondary-container))',
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
      options: INITIAL_VIEWPORTS,
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
    background: { value: 'surface' },
    locale: 'nl',
    locales: {
      en: 'English',
      nl: 'Nederlands',
    },
    viewport: { value: 'iphone12', isRotated: false },
  },
  decorators: [withRouter(), withShoelace()],
};

export default preview;
