import { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

export default {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
  tags: ['components', 'text'],
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 1,
    children: 'Hello, World!',
  },
};

export const Level2: Story = {
  args: {
    level: 2,
    children: 'Hello, World!',
  },
};

export const Level3: Story = {
  args: {
    level: 3,
    children: 'Hello, World!',
  },
};

export const Level4: Story = {
  args: {
    level: 4,
    children: 'Hello, World!',
  },
};

export const Level5: Story = {
  args: {
    level: 5,
    children: 'Hello, World!',
  },
};

export const Level6: Story = {
  args: {
    level: 6,
    children: 'Hello, World!',
  },
};

export const CustomTextSize: Story = {
  args: {
    level: 5,
    children: 'Hello, World!',
    textSizeClass: 'text-4xl',
  },
};

export const CustomColor: Story = {
  args: {
    level: 5,
    children: 'Hello, World!',
    colorClass: 'text-green-500',
  },
};

export const WithIcons: Story = {
  args: {
    level: 3,
    children: 'Hello, World!',
    preIconName: 'cloud-outward-corner',
    postIconName: 'heart',
  },
};

export const WithUnderline: Story = {
  args: {
    level: 3,
    children: 'Hello, World!',
    underline: 'twirly-small',
  },
};
