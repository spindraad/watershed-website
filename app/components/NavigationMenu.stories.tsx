import type { Meta, StoryObj } from '@storybook/react';
import NavigationMenu from './NavigationMenu';

export default {
  title: 'Molecules/Navigation Menu',
  component: NavigationMenu,
  tags: ['navigation'],
} satisfies Meta<typeof NavigationMenu>;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 'projecten',
        title: {
          en: 'projecten',
          nl: 'projecten',
          pap: 'projecten',
        },
        slug: 'projecten',
        order: 1,
      },
      {
        id: 'evenementen',
        title: {
          en: 'evenementen',
          nl: 'evenementen',
          pap: 'evenementen',
        },
        slug: 'evenementen',
        order: 0,
      },
      {
        id: 'contact',
        title: {
          en: 'contact',
          nl: 'contact',
          pap: 'contact',
        },
        slug: 'contact',
        order: 3,
      },
      {
        id: 'about',
        title: {
          en: 'over ons',
          nl: 'over ons',
          pap: 'over ons',
        },
        slug: 'about',
        order: 2,
      },
    ],
  },
};

export const WithSubmenu: Story = {
  args: {
    items: [
      {
        id: 'projecten',
        title: {
          en: 'projecten',
          nl: 'projecten',
          pap: 'projecten',
        },
        slug: 'projecten',
        order: 1,
      },
      {
        id: 'new-project',
        title: {
          en: 'Nieuw project',
          nl: 'Nieuw project',
          pap: 'Nieuw project',
        },
        slug: 'projecten/nieuw',
        order: 0,
        parentID: 'projecten',
      },
      {
        id: 'evenementen',
        title: {
          en: 'evenementen',
          nl: 'evenementen',
          pap: 'evenementen',
        },
        slug: 'evenementen',
        order: 0,
      },
      {
        id: 'contact',
        title: {
          en: 'contact',
          nl: 'contact',
          pap: 'contact',
        },
        slug: 'contact',
        order: 3,
      },
      {
        id: 'about',
        title: {
          en: 'over ons',
          nl: 'over ons',
          pap: 'over ons',
        },
        slug: 'about',
        order: 2,
      },
    ],
  },
};
