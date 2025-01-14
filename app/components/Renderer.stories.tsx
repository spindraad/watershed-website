import type { Meta, StoryObj } from '@storybook/react';
import Renderer from './Renderer';

export default {
  title: 'Components/Renderer',
  component: Renderer,
} satisfies Meta<typeof Renderer>;

type Story = StoryObj<typeof Renderer>;

export const Default: Story = {
  args: {
    data: {
      root: { props: { title: '' } },
      zones: {},
      content: [
        {
          type: 'Heading',
          props: {
            id: 'Heading-1694032984497',
            size: 'xxxl',
            text: 'Home page',
            align: 'center',
            level: '1',
          },
        },
        {
          type: 'Text',
          props: {
            id: 'Text-c8a0073a-9d67-4b30-8f31-281a76dedaa3',
            size: 'm',
            text: 'Bewerk deze pagina door naar "/edit" te gaan.',
            align: 'left',
            color: 'default',
            padding: '24px',
          },
        },
      ],
    },
  },
};
