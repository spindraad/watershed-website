import type { Meta, StoryObj } from '@storybook/react';
import TalentProgram from './TalentProgram';

export default {
  title: 'Molecules/Talent Program',
  component: TalentProgram,
  tags: ['components', 'artists', 'content'],
  decorators: [
    (Story) => (
      <div className="p-4 max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TalentProgram>;

type Story = StoryObj<typeof TalentProgram>;

export const Default: Story = {
  args: {
    programLogoUrl: '1Write loud - logo zw@2x.png',
    programLogoAltText: 'Write Loud Logo',
    description:
      'Minor creative writing van Watershed en St. Joost voor kunstacademie-studenten',
    moreInfoUrl: 'https://example.com/talent-program',
  },
};
