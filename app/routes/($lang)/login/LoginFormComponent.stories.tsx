import { type Meta, type StoryObj } from '@storybook/react';
import LoginFormComponent from './LoginFormComponent';

export default {
  title: 'Components/Login Form',
  component: LoginFormComponent,
  decorators: [
    (Story) => (
      <div className="w-[25vw]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof LoginFormComponent>;

type Story = StoryObj<typeof LoginFormComponent>;

export const Default: Story = {};
