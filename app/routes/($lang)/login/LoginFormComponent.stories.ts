import { type Meta, type StoryObj } from '@storybook/react';
import LoginFormComponent from './LoginFormComponent';

export default {
  title: 'Components/Login Form',
  component: LoginFormComponent,
} satisfies Meta<typeof LoginFormComponent>;

type Story = StoryObj<typeof LoginFormComponent>;

export const Default: Story = {};
