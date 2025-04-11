import type { Meta, StoryObj } from '@storybook/react';
import PageMutationForm from './PageMutationForm';

export default {
  title: 'Forms/Page Mutation Form',
  component: PageMutationForm,
  tags: ['components', 'content'],
} satisfies Meta<typeof PageMutationForm>;

type Story = StoryObj<typeof PageMutationForm>;

export const Default: Story = {
  args: {},
};
