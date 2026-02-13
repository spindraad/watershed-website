import type { Meta, StoryObj } from '@storybook/react';
import ContentTabs from './ContentTabs';

export default {
  title: 'Molecules/Content Tabs',
  component: ContentTabs,
  tags: ['components', 'content'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '60vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContentTabs>;

type Story = StoryObj<typeof ContentTabs>;

export const Default: Story = {
  args: {
    content: [
      {
        tab: {
          title: 'A roof for writers',
          slug: 'roof-for-writers',
        },
        content: {
          title: 'Talent- en productiehuis',
          body: `
            <p>
              Watershed is een talentorganisatie, met onze producties als logische
              afgeleide daarvan. Talentvolle schrijvers profiteren ervan als ze
              zich ontwikkelen in relatie met het publiek. En talent brengt
              vernieuwing. Bij ons staan de maker en haar belangen centraal. De
              leden van ons team zijn allemaal zelf makers, die programma’s en
              producten produceren met andere makers.
            </p>
            <p>
              Watershed biedt schrijvers een plek waar ze zich kunnen ontwikkelen
              - we ondersteunen hen ambachtelijk, facilitair en als coaches - wij
              zijn professionele cheerleaders. Zo bieden we bijvoorbeeld
              residentie-plekken, faciliteiten en begeleiding. We bieden plekken
              waar je in rust kunt schrijven, waar opname-faciliteiten zijn voor
              je podcast, waar we je helpen met subsidieaanvragen of samen met jou
              een nieuw programma ontwikkelen en produceren.
            </p>        
          `,
        },
      },
      {
        tab: {
          title: 'Radicaal vertragen',
          slug: 'radicaal-vertragen',
        },
        content: {
          title: 'Radicaal vertragen',
          body: `
            <p>
              We willen de tijd nemen om te experimenteren, te leren en te
              ontwikkelen. We willen niet alleen maar produceren, maar ook
              reflecteren op wat we doen en hoe we het doen. We willen niet alleen
              maar snel groeien, maar ook duurzaam groeien. We willen niet alleen
              maar succesvol zijn, maar ook betekenisvol zijn.
            </p>        
          `,
        },
      },
      {
        tab: {
          title: 'De schrijver voorop',
          slug: 'de-schrijver-voorop',
        },
        content: {
          title: 'De schrijver voorop',
          body: `
            <p>
              We geloven dat de schrijver centraal staat in ons werk. We willen
              de schrijver ondersteunen in haar creatieve proces, haar visie en
              haar stem. We willen de schrijver helpen om haar talent te ontwikkelen
              en haar ambities waar te maken. We willen de schrijver een plek geven
              waar ze zich thuis voelt, waar ze zich kan uiten en waar ze zich kan
              verbinden met andere schrijvers en makers.
            </p>        
          `,
        },
      },
    ],
  },
};
