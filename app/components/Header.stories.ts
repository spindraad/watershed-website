import { type Meta, type StoryObj } from '@storybook/react';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
