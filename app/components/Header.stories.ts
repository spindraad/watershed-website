import { type Meta, type StoryObj } from '@storybook/react';
import Header from './Header';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import { User } from '~/models/user.server';

export default {
  title: 'Components/Header',
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

const user: User = {
  id: '1',
  email: 'donald@duck.com',
  name: 'Donald Duck',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Default: Story = {
  args: {},
};

export const WithUser: Story = {
  args: {
    user,
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
      },
    }),
  },
};
