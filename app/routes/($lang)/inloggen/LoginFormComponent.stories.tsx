import { type Meta, type StoryObj } from '@storybook/react';
import LoginFormComponent from './LoginFormComponent';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Forms/Login Form',
  component: LoginFormComponent,
  decorators: [
    (Story) => (
      <div className="w-full max-w-[35rem]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof LoginFormComponent>;

type Story = StoryObj<typeof LoginFormComponent>;

export const Default: Story = {
  args: {
    action: '/login',
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/login',
        action: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return { ok: true };
        },
      },
    }),
  },
};

export const WithErrors: Story = {
  args: {
    action: '/login',
    values: {
      emailaddress: 'donald@duck.com',
      password: 'DonaldDuck',
    },
    errors: {
      emailaddress: [
        {
          errorCode: 'invalid_type',
        },
      ],
      password: [
        {
          errorCode: 'invalid_type',
        },
      ],
    },
  },
};
