import type { Meta, StoryObj } from '@storybook/react';
import ContactDetails from './ContactDetails';

export default {
  title: 'Molecules/Contact Details',
  component: ContactDetails,
  tags: ['components', 'content', 'misc'],
} satisfies Meta<typeof ContactDetails>;

type Story = StoryObj<typeof ContactDetails>;

export const Default: Story = {
  args: {},
};
