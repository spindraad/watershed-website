import { Meta, StoryObj } from '@storybook/react';
import ChangePasswordForm from '~/components/ChangePasswordForm';

export default {
  title: 'Forms/Change password',
  component: ChangePasswordForm,
  decorators: [
    (Story) => <div className="w-full max-w-[35rem]">{Story()}</div>,
  ],
  tags: ['components', 'authentication'],
} satisfies Meta<typeof ChangePasswordForm>;

type Story = StoryObj<typeof ChangePasswordForm>;

export const Default: Story = {
  args: {
    action: '/wachtwoord-reset',
  },
};

export const WithSuppliedEmailAddress: Story = {
  args: {
    action: '/wachtwoord-reset',
    emailAddress: 'donald@duck.com',
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
