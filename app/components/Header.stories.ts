import { type Meta, type StoryObj } from '@storybook/react';
import Header from './Header';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import { User } from '~/models/user.server';
import { menuItems } from '~/components/MenuEditor.stories';

export default {
  title: 'Organisms/Header',
  component: Header,
  tags: ['components', 'navigation'],
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
  args: {
    menuItems,
  },
};

export const WithUser: Story = {
  args: {
    user,
    menuItems,
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
      },
    }),
  },
};
