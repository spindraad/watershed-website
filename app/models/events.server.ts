import { Event } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { EventValidator } from '~/validations/models/event';

export type { Event };

export async function getEvents(): Promise<Event[]> {
  return prisma.event.findMany();
}

export async function deleteEvent(eventID: string): Promise<void> {
  await prisma.event.delete({ where: { id: eventID } });
}

export async function saveEvent(event: EventValidator): Promise<Event> {
  return prisma.event.create({ data: event });
}

export function convertEventsToTableData(events: Event[]): ContentTableItem[] {
  return events.map((event) => ({
    id: event.id,
    title: { value: event.title, isName: true },
    location: event.address,
    date: event.eventDate,
  }));
}
