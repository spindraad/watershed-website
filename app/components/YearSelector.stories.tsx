import type { Meta, StoryObj } from '@storybook/react';
import YearSelector from './YearSelector';

export default {
  title: 'Molecules/Year Selector',
  component: YearSelector,
  tags: ['components', 'shoelace'],
} satisfies Meta<typeof YearSelector>;

type Story = StoryObj<typeof YearSelector>;

const years = [2024, 2023, 2022, 2021, 2020];

export const Default: Story = {
  args: {
    years,
  },
};
