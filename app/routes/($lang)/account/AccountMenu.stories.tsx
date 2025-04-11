import type { Meta, StoryObj } from '@storybook/react';
import AccountMenu from './AccountMenu';
import { User } from '~/models/user.server';

export default {
  title: 'Molecules/Account Menu',
  component: AccountMenu,
  decorators: [
    (Story) => (
      <div className="w-[20rem]">
        <Story />
      </div>
    ),
  ],
  tags: ['route-components', 'navigation'],
} satisfies Meta<typeof AccountMenu>;

type Story = StoryObj<typeof AccountMenu>;

const user: User = {
  id: 'abc',
  name: 'Bob Smith',
  email: 'bob@wonderworld.net',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Default: Story = {
  args: {
    user,
  },
};
