import type { Meta, StoryObj } from '@storybook/react';
import SubMenu from './SubMenu';
import SubMenuItem from '~/components/SubMenuItem';

export default {
  title: 'Components/Sub Menu',
  component: SubMenu,
} satisfies Meta<typeof SubMenu>;

type Story = StoryObj<typeof SubMenu>;

export const Default: Story = {
  args: {
    title: 'Menu Title',
    children: [
      <SubMenuItem key="1" to="/" icon="person-circle">
        Item 1
      </SubMenuItem>,
      <SubMenuItem key="2" to="/" icon="calendar2-event">
        Item 2
      </SubMenuItem>,
      <SubMenuItem key="3" to="/" icon="kanban">
        Item 3
      </SubMenuItem>,
    ],
  },
};
