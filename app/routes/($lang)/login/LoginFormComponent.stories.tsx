import { type Meta, type StoryObj } from '@storybook/react';
import LoginFormComponent from './LoginFormComponent';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

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

export const Form: Story = {
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

export const FormWithErrors: Story = {
  args: {
    action: '/login',
    values: {
      emailaddress: 'donald@duck.com',
      password: 'DonaldDuck',
    },
    errors: {
      emailaddress: 'Invalid email',
      password: 'Invalid password',
    },
  },
};
