import type { Meta, StoryObj } from '@storybook/react';
import HandDrawnLine from './HandDrawnLine';

export default {
  title: 'Atoms/Hand Drawn Line',
  component: HandDrawnLine,
  tags: ['components', 'ui-styling'],
  argTypes: {
    drawStyle: {
      control: {
        type: 'radio',
      },
      options: [
        'dotted-1',
        'dotted-2',
        'solid-regular-1',
        'solid-regular-2',
        'solid-regular-3',
        'solid-thick-1',
        'solid-thick-2',
        'solid-thick-3',
        'solid-thin-1',
        'solid-thin-2',
        'twirly-small',
        'twirly-large',
        'wonky',
        'zigzag-thin',
        'zigzag-thick',
      ],
    },
  },
} satisfies Meta<typeof HandDrawnLine>;

type Story = StoryObj<typeof HandDrawnLine>;

export const Default: Story = {
  args: {
    drawStyle: 'solid-thick-1',
  },
};
