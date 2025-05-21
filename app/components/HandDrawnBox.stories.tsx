import type { Meta, StoryObj } from '@storybook/react';
import HandDrawnBox from './HandDrawnBox';

export default {
  title: 'Atoms/Hand Drawn Box',
  component: HandDrawnBox,
  tags: ['components', 'ui'],
  argTypes: {
    drawStyle: {
      control: {
        type: 'radio',
      },
      options: ['dotted', 'solid'],
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof HandDrawnBox>;

type Story = StoryObj<typeof HandDrawnBox>;

export const Dotted: Story = {
  args: {
    drawStyle: 'dotted',
    children: 'Dotted box',
  },
};

export const Solid: Story = {
  args: {
    drawStyle: 'solid',
    children: 'Solid Regular box',
  },
};

export const OverriddenPadding: Story = {
  args: {
    drawStyle: 'solid',
    children: 'Solid Regular box with overridden padding',
    padding: 'p-14',
  },
};
