import type { Meta, StoryObj } from '@storybook/react';
import AdminMenu from './AdminMenu';

export default {
  title: 'Components/Admin Menu',
  component: AdminMenu,
} satisfies Meta<typeof AdminMenu>;

type Story = StoryObj<typeof AdminMenu>;

export const Default: Story = {
  args: {},
};
