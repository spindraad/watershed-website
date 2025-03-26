import type { Meta, StoryObj } from '@storybook/react';
import DateInput from './DateInput';

export default {
  title: 'Components/Date Input',
  component: DateInput,
} satisfies Meta<typeof DateInput>;

type Story = StoryObj<typeof DateInput>;

export const DefaultDateInput: Story = {
  args: {
    id: 'input',
    label: 'This is a simple text input',
  },
};

export const DateInputWithError: Story = {
  args: {
    id: 'input',
    label: 'This is a simple text input',
    error: ['This is an error message'],
  },
};
