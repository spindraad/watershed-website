import { Meta, StoryObj } from '@storybook/react';
import ForgetPasswordConfirmation from './ForgetPasswordConfirmation';

export default {
  title: 'Templates/Forget password confirmation',
  component: ForgetPasswordConfirmation,
  tags: ['route-components', 'authentication'],
} satisfies Meta<typeof ForgetPasswordConfirmation>;

type Story = StoryObj<typeof ForgetPasswordConfirmation>;

export const Default: Story = {};
