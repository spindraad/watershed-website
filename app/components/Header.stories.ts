import { type Meta, type StoryObj } from '@storybook/react';
import Header from './Header';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Components/Header',
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const WithUser: Story = {
  args: {
    user: {
      id: '1',
      email: 'donald@duck.com',
      name: 'Donald Duck',
    },
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
      },
    }),
  },
};
