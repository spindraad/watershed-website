import type { Meta, StoryObj } from '@storybook/react';
import TeamMember from './TeamMember';

export default {
  title: 'Organisms/Team Member',
  component: TeamMember,
  tags: ['components', 'content', 'misc'],
} satisfies Meta<typeof TeamMember>;

type Story = StoryObj<typeof TeamMember>;

export const Default: Story = {
  args: {
    name: 'Juliet Gagnon',
    role: 'Directeur en artistiek leider',
    email: 'juliet@stichtingwatershed.nl',
    instagramUrl: 'https://www.instagram.com/julietgagnon/',
    phoneNumber: '+31 6 12345678',
    caption: 'verrassen en verwonderen',
    quote:
      'Ik wil verrassen en verwonderen. Dat heeft me ooit in leven gehouden, en dat gun ik anderen ook',
  },
};
