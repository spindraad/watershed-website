import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MenuEditor from './MenuEditor';

export default {
  title: 'Organisms/Menu Editor',
  component: MenuEditor,
  tags: ['components', 'navigation'],
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MenuEditor>;

type Story = StoryObj<typeof MenuEditor>;

export const Default: Story = {
  args: {
    onSave: action('onSave'),
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
