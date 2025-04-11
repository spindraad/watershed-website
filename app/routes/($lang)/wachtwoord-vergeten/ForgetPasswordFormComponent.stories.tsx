import { Meta, StoryObj } from '@storybook/react';
import ForgetPasswordFormComponent from './ForgetPasswordFormComponent';

export default {
  title: 'Forms/Forget password form',
  component: ForgetPasswordFormComponent,
  decorators: [
    (Story) => (
      <div className="w-full max-w-[35rem]">
        <Story />
      </div>
    ),
  ],
  tags: ['route-components', 'authentication'],
} as Meta<typeof ForgetPasswordFormComponent>;

type Story = StoryObj<typeof ForgetPasswordFormComponent>;

export const Default: Story = {
  args: {
    action: '/api/forgot-password',
  },
};

export const WithError: Story = {
  args: {
    action: '/api/forgot-password',
    errors: {
      emailaddress: [
        {
          errorCode: 'invalid_type',
        },
      ],
    },
  },
};
