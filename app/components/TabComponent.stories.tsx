import type { Meta, StoryObj } from '@storybook/react';
import TabComponent from './TabComponent';

export default {
  title: 'Molecules/Tab Component',
  component: TabComponent,
  tags: ['components'],
  parameters: {
    backgrounds: {
      default: 'yellow',
      values: [
        { name: 'yellow', value: 'rgb(253, 252, 217)' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '60vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TabComponent>;

type Story = StoryObj<typeof TabComponent>;

export const Default: Story = {
  args: {
    tabs: [
      {
        tab: {
          title: 'A roof for writers',
          slug: 'roof-for-writers',
        },
        content: {
          title: 'Talent- en productiehuis',
          body: `
            <p>Watershed is een talentorganisatie, met onze producties als logische afgeleide daarvan. Talentvolle schrijvers profiteren ervan als ze zich ontwikkelen in relatie met het publiek. En talent brengt vernieuwing. Bij ons staan de maker en haar belangen centraal. De leden van ons team zijn allemaal zelf makers, die programma's en producten produceren met andere makers.</p>
            <p>Watershed biedt schrijvers een plek waar ze zich kunnen ontwikkelen – we ondersteunen hen ambachtelijk, facilitair en als coaches – wij zijn professionele cheerleaders. Zo bieden we bijvoorbeeld residentie-plekken, faciliteiten en begeleiding. We bieden plekken waar je in rust kunt schrijven, waar opname-faciliteiten zijn voor je podcast, waar we je helpen met subsidieaanvragen of samen met jou een nieuw programma ontwikkelen en produceren.</p>
          `,
        },
      },
      {
        tab: {
          title: 'Radicaal vertragen',
          slug: 'radicaal-vertragen',
        },
        content: {
          title: 'Tijd voor creativiteit',
          body: `
            <p>In een wereld die steeds sneller draait, bieden wij schrijvers de kans om te vertragen. We geloven dat de beste ideeën ontstaan wanneer je de tijd neemt om te reflecteren, te experimenteren en te groeien.</p>
            <p>Onze residenties bieden schrijvers een veilige haven waar ze kunnen focussen op hun werk zonder de druk van deadlines of commerciële overwegingen.</p>
          `,
        },
      },
      {
        tab: {
          title: 'De schrijver voorop',
          slug: 'de-schrijver-voorop',
        },
        content: {
          title: 'Jouw verhaal centraal',
          body: `
            <p>Bij Watershed staat de schrijver altijd centraal. We geloven in de kracht van authentieke verhalen en ondersteunen schrijvers bij het vinden van hun unieke stem.</p>
            <p>Of je nu werkt aan een roman, een podcast, een theaterstuk of een geheel nieuwe vorm – wij zijn er om je te helpen je visie tot leven te brengen.</p>
          `,
        },
      },
    ],
  },
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      {
        tab: {
          title: 'Over ons',
          slug: 'over-ons',
        },
        content: {
          title: 'Wie wij zijn',
          body: `<p>Watershed is een creatieve thuisbasis voor schrijvers. We bieden ruimte, tijd en ondersteuning voor makers die hun verhalen willen vertellen.</p>`,
        },
      },
      {
        tab: {
          title: 'Contact',
          slug: 'contact',
        },
        content: {
          title: 'Neem contact op',
          body: `<p>Heb je vragen of wil je meer weten over onze programma's? Neem gerust contact met ons op.</p>`,
        },
      },
    ],
  },
};

export const WithDefaultTab: Story = {
  args: {
    tabs: [
      {
        tab: {
          title: 'First Tab',
          slug: 'first',
        },
        content: {
          title: 'First Content',
          body: `<p>This is the first tab content.</p>`,
        },
      },
      {
        tab: {
          title: 'Second Tab',
          slug: 'second',
        },
        content: {
          title: 'Second Content',
          body: `<p>This tab is selected by default.</p>`,
        },
      },
      {
        tab: {
          title: 'Third Tab',
          slug: 'third',
        },
        content: {
          title: 'Third Content',
          body: `<p>This is the third tab content.</p>`,
        },
      },
    ],
    defaultActiveTab: 'second',
  },
};
