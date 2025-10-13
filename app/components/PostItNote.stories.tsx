import type { Meta, StoryObj } from '@storybook/react';
import PostItNote from './PostItNote';

export default {
  title: 'Atoms/Post It Note',
  component: PostItNote,
  tags: ['components', 'ui-styling'],
} satisfies Meta<typeof PostItNote>;

type Story = StoryObj<typeof PostItNote>;

export const Default: Story = {
  args: {
    children: 'This is a post-it note!',
  },
};
