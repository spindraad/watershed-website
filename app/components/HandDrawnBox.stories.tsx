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
    padding: {
      control: {
        type: 'text',
      },
      description: 'Tailwind CSS padding classes (e.g., p-4, p-6)',
    },
    background: {
      control: {
        type: 'text',
      },
      description:
        'Tailwind CSS background classes (e.g., bg-white, bg-gray-100)',
    },
    classes: {
      control: {
        type: 'text',
      },
      description: 'Additional Tailwind CSS classes to apply to the box',
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
