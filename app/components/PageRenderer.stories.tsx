import type { Meta, StoryObj } from '@storybook/react';
import PageRenderer from 'app/components/PageRenderer';

export default {
  title: 'Components/Page Renderer',
  component: PageRenderer,
} satisfies Meta<typeof PageRenderer>;

type Story = StoryObj<typeof PageRenderer>;

export const Default: Story = {
  args: {
    data: {
      root: { props: { title: '' } },
      zones: {},
      content: [
        {
          type: 'HeadingBlock',
          props: {
            id: 'Heading-1694032984497',
            text: 'Welkom bij Watershed',
            align: 'center',
            level: 1,
          },
        },
        {
          type: 'RichTextBlock',
          props: {
            id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa3',
            content:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
          },
        },
        {
          type: 'RichTextBlock',
          props: {
            id: 'RichText-aa123bb456cc67788',
            content:
              '<p>Curabitur sit amet nunc nec nunc tincidunt fermentum.</p>',
          },
        },
        {
          type: 'ButtonBlock',
          props: {
            id: 'Button-1234567890',
            primary: 'primary',
          },
        },
      ],
    },
  },
};
