import type { Meta, StoryObj } from '@storybook/react';
import TeamMember from './TeamMember';
import PageEditor from '~/components/PageEditor';

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

export const Puck: Story = {
  name: 'As Puck block',
  render: () => (
    <PageEditor
      data={{
        root: { props: { title: 'Teamlid' } },
        content: [
          {
            type: 'TeamOverviewBlock',
            props: {
              id: 'TeamMember-1',
              members: [
                {
                  avatarUrl: '/illustraties/team-member-red.svg',
                  avatarAlt: 'Portret van Juliet Gagnon',
                  name: 'Juliet Gagnon',
                  role: 'Directeur en artistiek leider',
                  email: 'juliet@stichtingwatershed.nl',
                  instagramUrl: 'https://www.instagram.com/julietgagnon/',
                  phoneNumber: '+31 6 12345678',
                  caption: 'verrassen en verwonderen',
                  quote:
                    'Ik wil verrassen en verwonderen. Dat heeft me ooit in leven gehouden, en dat gun ik anderen ook',
                },
                {
                  avatarUrl: '/illustraties/team-member-blue.svg',
                  avatarAlt: 'Portret van Giséle Mambre',
                  name: 'Giséle Mambre',
                  role: 'Programmamaker',
                  email: 'juliet@stichtingwatershed.nl',
                  instagramUrl: 'https://www.instagram.com/julietgagnon/',
                  phoneNumber: '+31 6 12345678',
                  caption: 'verrassen en verwonderen',
                  quote:
                    'Ik wil verrassen en verwonderen. Dat heeft me ooit in leven gehouden, en dat gun ik anderen ook',
                },
                {
                  avatarUrl: '/illustraties/team-member-green.svg',
                  avatarAlt: 'Portret van Mirjam van Dijk',
                  name: 'Mirjam van Dijk',
                  role: 'Producer',
                  email: 'juliet@stichtingwatershed.nl',
                  instagramUrl: 'https://www.instagram.com/julietgagnon/',
                  phoneNumber: '+31 6 12345678',
                  caption: 'verrassen en verwonderen',
                  quote:
                    'Ik wil verrassen en verwonderen. Dat heeft me ooit in leven gehouden, en dat gun ik anderen ook',
                },
                {
                  avatarUrl: '/illustraties/team-member-red.svg',
                  avatarAlt: 'Portret van Juliet Gagnon',
                  name: 'Stan van Herpen',
                  role: 'Zakelijk leider',
                  email: 'juliet@stichtingwatershed.nl',
                  instagramUrl: 'https://www.instagram.com/julietgagnon/',
                  phoneNumber: '+31 6 12345678',
                  caption: 'verrassen en verwonderen',
                  quote:
                    'Ik wil verrassen en verwonderen. Dat heeft me ooit in leven gehouden, en dat gun ik anderen ook',
                },
              ],
            },
          },
        ],
      }}
      onPublish={() => {}}
      title=""
    />
  ),
};
