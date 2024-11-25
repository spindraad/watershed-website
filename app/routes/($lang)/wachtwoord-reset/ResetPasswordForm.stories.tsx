import { Meta, StoryObj } from '@storybook/react';
import ResetPasswordForm from './ResetPasswordForm';

export default {
  title: 'Forms/Reset password',
  component: ResetPasswordForm,
  decorators: [
    (Story) => <div className="w-full max-w-[35rem]">{Story()}</div>,
  ],
} satisfies Meta<typeof ResetPasswordForm>;

type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  args: {
    action: '/wachtwoord-reset',
  },
};

export const WithErrors: Story = {
  args: {
    action: '/wachtwoord-reset',
    errors: {
      password: [{ errorCode: 'invalid_type' }],
      confirmPassword: [
        { errorCode: 'invalid_type' },
        { errorCode: 'custom', message: 'passwords_do_not_match' },
      ],
    },
  },
};
