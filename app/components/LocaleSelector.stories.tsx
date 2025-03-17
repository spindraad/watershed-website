import type { Meta, StoryObj } from '@storybook/react';
import LocaleSelector from './LocaleSelector';

export default {
  title: 'Components/Locale Selector',
  component: LocaleSelector,
  decorators: [
    (Story) => (
      <div className="h-56">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LocaleSelector>;

type Story = StoryObj<typeof LocaleSelector>;

export const Default: Story = {
  args: {},
};

export const EmitChangeLocale: Story = {
  args: {
    emitChangeLanguage: true,
  },
};

export const HandleChangeEvent: Story = {
  args: {
    onLocaleSelect: () => 'onLocaleSelect',
  },
};

export const ShowSelectedLocale: Story = {
  args: {
    selectedLocale: 'en',
    showSelectedLocale: true,
  },
};
