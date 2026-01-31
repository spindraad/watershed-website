import type { Meta, StoryObj } from '@storybook/react';
import MakersOverview, { MakerDetails } from '~/components/MakersOverview';

export default {
  title: 'Organisms/Makers Overview',
  component: MakersOverview,
  tags: ['components', 'makers', 'ui-styling'],
} satisfies Meta<typeof MakersOverview>;

type Story = StoryObj<typeof MakersOverview>;

const makers: MakerDetails[] = [
  {
    id: '1',
    name: 'Monique Hendriks',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet Ploeg-E',
      nl: 'Stadsdichter Ploeg-E',
      pap: 'Poeta di Siudat Ploeg-E',
    },
    slug: 'monique-hendriks',
    imageUrl: '/monique-hendriks.png',
  },
  {
    id: '2',
    name: 'Terence van Lange',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet Ploeg-E',
      nl: 'Stadsdichter Ploeg-E',
      pap: 'Poeta di Siudat Ploeg-E',
    },
    slug: 'terence-van-lange',
    imageUrl: '/terence-van-lange.png',
  },
  {
    id: '3',
    name: 'Corinne Heyrman',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet Ploeg-E',
      nl: 'Stadsdichter Ploeg-E',
      pap: 'Poeta di Siudat Ploeg-E',
    },
    slug: 'corinne-heyrman',
    imageUrl: '/corinne-heyrman.png',
  },
  {
    id: '4',
    name: 'Jonathan Griffioen',
    profession: {
      en: 'Poet',
      nl: 'Dichter',
      pap: 'Poeta',
    },
    summary: {
      en: 'Stories for Saga',
      nl: 'Verhalen voor Saga',
      pap: 'Kuenta pa Saga',
    },
    slug: 'jonathan-griffioen',
    imageUrl: '/jonathan-griffioen.png',
  },
  {
    id: '5',
    name: 'Iris Penning',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet (2019-2024)',
      nl: 'Stadsdichter (2019-2024)',
      pap: 'Poeta di Siudat (2019-2024)',
    },
    slug: 'iris-penning',
    imageUrl: '/iris-penning.png',
  },
];

export const Default: Story = {
  args: {
    makers,
  },
};
