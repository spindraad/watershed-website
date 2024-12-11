import { Meta, StoryObj } from '@storybook/react';
import Breadcrumbs from './Breadcrumbs';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

export const Home: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
      },
    }),
  },
};

export const SingleLayer: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/over-ons',
      },
    }),
  },
};

export const TwoLayers: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/nieuws/artikel-over-poezie',
      },
    }),
  },
};

export const ThreeLayers: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/talentenhub/nieuw-talent/donald-duck',
      },
    }),
  },
};
