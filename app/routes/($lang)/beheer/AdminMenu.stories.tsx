import type { Meta, StoryObj } from '@storybook/react';
import AdminMenu from './AdminMenu';

export default {
  title: 'Molecules/Admin Menu',
  component: AdminMenu,
  tags: ['route-components', 'navigation'],
} satisfies Meta<typeof AdminMenu>;

type Story = StoryObj<typeof AdminMenu>;

export const Default: Story = {
  args: {},
};
