import { Event } from '@prisma/client';

type SeedEvent = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

export const events: SeedEvent[] = [
  {
    title: {
      nl: 'Buskeda in de bieb',
      en: 'Buskeda in the library',
      pap: 'Buskeda den bibi',
    },
    description: {
      nl: 'Een gezellige middag met muziek en poëzie.',
      en: 'A cozy afternoon with music and poetry.',
      pap: 'Un atardi di biba ku musik i poesia.',
    },
    eventDate: 
  }
];
