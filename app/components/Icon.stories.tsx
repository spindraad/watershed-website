import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['components', 'ui-styling'],
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'heading-arrow',
  },
};
