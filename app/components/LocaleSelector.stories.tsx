import type { Meta, StoryObj } from '@storybook/react';
import LocaleSelector from './LocaleSelector';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

export default {
  title: 'Molecules/Locale Selector',
  component: LocaleSelector,
  decorators: [
    (Story) => (
      <div className="h-56">
        <Story />
      </div>
    ),
  ],
  tags: ['components', 'shoelace', 'localisation'],
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
    captionType: 'selected',
    onLocaleSelect: fn(),
  },

  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByRole('menu')).toBeInTheDocument();
    });

    // const items = canvasElement.querySelectorAll('sl-menu-item');
    const items = canvas.getAllByRole('menuitemcheckbox');
    const dropdownTrigger = canvasElement.querySelector('sl-button');

    await waitFor(() => {
      expect(items[0]).toHaveTextContent('Dutch');
      expect(items[1]).toHaveTextContent('English');
      expect(items[2]).toHaveTextContent('Papiamentu');
    });

    if (dropdownTrigger) {
      await step('Selecting "Dutch" locale', async () => {
        await userEvent.click(dropdownTrigger);
        await userEvent.click(items[0]);
      });
    }

    await waitFor(() => {
      expect(args.onLocaleSelect).toHaveBeenCalledWith('nl');
    });

    if (dropdownTrigger) {
      await step('Selecting "Papiamentu" locale', async () => {
        await userEvent.click(dropdownTrigger);
        await userEvent.click(items[2]);
      });
    }

    await waitFor(() => {
      expect(args.onLocaleSelect).toHaveBeenCalledWith('pap');
    });
  },
};

export const Badges: Story = {
  args: {
    captionBadge: 5,
    localeBadges: {
      nl: '2',
      en: '3',
    },
  },
};

export const InlineButtons: Story = {
  args: {
    inline: true,
  },
};

export const HoistButtons: Story = {
  args: {
    hoist: true,
  },
};
