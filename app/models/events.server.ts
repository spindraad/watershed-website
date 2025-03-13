import { Event } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';

export type { Event };

export async function getEvents(): Promise<Event[]> {
  return prisma.event.findMany();
}

export function convertEventsToTableData(events: Event[]): ContentTableItem[] {
  return events.map((event) => ({
    id: event.id,
    title: { value: event.title, isName: true },
    location: event.address,
    date: event.eventDate,
  }));
}
