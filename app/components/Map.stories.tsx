import type { Meta, StoryObj } from '@storybook/react';
import Map from './Map';

export default {
  title: 'Organisms/Map',
  component: Map,
  tags: ['components', 'misc'],
} satisfies Meta<typeof Map>;

type Story = StoryObj<typeof Map>;

export const Default: Story = {
  args: {
    coordinates: [51.4269171, 5.4864656],
  },
};
