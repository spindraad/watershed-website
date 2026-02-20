import type { Meta, StoryObj } from '@storybook/react';
import ContentBlock from './ContentBlock';

export default {
  title: 'Molecules/Content Block',
  component: ContentBlock,
  tags: ['components', 'content'],
} satisfies Meta<typeof ContentBlock>;

type Story = StoryObj<typeof ContentBlock>;

export const Default: Story = {
  args: {
    title: 'Bestuur',
    underline: 'wonky',
    preIconName: 'cloud-outward-corner',
    postIconName: 'light-bulb',
    body: `
      <p>
        Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc. Donec dui leo, ultrices quis turpis nec, sollicitudin sodales tortor. Aenean dapibus magna quam, id tincidunt quam placerat consequat.
      </p>
      <p>
        Nulla eu laoreet ex. Vestibulum nec vulputate turpis, id euismod orci. Phasellus consectetur tortor est. Donec lectus ex, rhoncus ac consequat at, viverra sit amet sem. Aliquam sed vestibulum nibh. Phasellus ut lorem pharetra, placerat urna id, tincidunt quam. Praesent non ex congue, tristique risus quis, blandit purus. Sed tristique sapien ut vehicula pretium. Donec purus metus, vulputate sit amet ullamcorper vel, aliquet ac lectus.
      </p>
    `,
  },
};
