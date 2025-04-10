import type { Meta, StoryObj } from '@storybook/react';
import PageMutationForm from './PageMutationForm';

export default {
  title: 'Components/Page Mutation Form',
  component: PageMutationForm,
} satisfies Meta<typeof PageMutationForm>;

type Story = StoryObj<typeof PageMutationForm>;

export const Default: Story = {
  args: {},
};
