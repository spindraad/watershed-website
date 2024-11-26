import { type Meta, type StoryObj } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    id: 'input',
    label: 'This is a simple text input',
  },
};

export const TextInputWithError: Story = {
  args: {
    id: 'input',
    label: 'This is a simple text input',
    error: 'This is an error message',
  },
};
