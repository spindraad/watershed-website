import { Event } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { EventValidator } from '~/validations/models/event';

export type { Event };
export type SerializedEvent = Omit<
  Event,
  'eventDate' | 'createdAt' | 'updatedAt'
> & {
  eventDate: string;
  createdAt: string;
  updatedAt: string;
};

export async function getEvents(max?: number): Promise<Event[]> {
  return prisma.event.findMany({ take: max, orderBy: { eventDate: 'asc' } });
}

export async function getEvent(eventID: string): Promise<Event> {
  return prisma.event.findUniqueOrThrow({ where: { id: eventID } });
}

export async function deleteEvent(eventID: string): Promise<void> {
  await prisma.event.delete({ where: { id: eventID } });
}

export async function saveEvent(event: EventValidator): Promise<Event> {
  return prisma.event.create({ data: event });
}

export async function updateEvent(
  eventID: string,
  event: EventValidator,
): Promise<Event> {
  return prisma.event.update({ where: { id: eventID }, data: event });
}

export function convertEventsToTableData(events: Event[]): ContentTableItem[] {
  return events.map((event) => ({
    id: event.id,
    title: { value: event.title, isName: true },
    location: event.address,
    date: event.eventDate,
  }));
}
