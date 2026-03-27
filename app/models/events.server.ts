import { Event, Prisma } from '@prisma/client';
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
  return prisma.event.findMany({
    take: max,
    orderBy: { eventDate: 'asc' },
    include: { makers: true },
  });
}

export async function getEvent(eventID: string): Promise<Event> {
  return prisma.event.findUniqueOrThrow({
    where: { id: eventID },
    include: { makers: true },
  });
}

export async function deleteEvent(eventID: string): Promise<void> {
  await prisma.event.delete({ where: { id: eventID } });
}

export async function saveEvent(event: EventValidator): Promise<Event> {
  const { image, content, makerIds, ...data } = event;
  const makers = makerIds ? makerIds.split(',').filter(Boolean) : [];

  const createData = {
    ...data,
    imageUrl: image.url,
    imageAlt: image.alt,
    makers: {
      connect: makers.map((id) => ({ id })),
    },
  } as Prisma.EventCreateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    createData.content = content;
  }

  return prisma.event.create({ data: createData });
}

export async function updateEvent(
  eventID: string,
  event: EventValidator,
): Promise<Event> {
  const { image, content, makerIds, ...data } = event;
  const makers = makerIds ? makerIds.split(',').filter(Boolean) : [];

  const updateData = {
    ...data,
    imageUrl: image.url,
    imageAlt: image.alt,
    makers: {
      set: makers.map((id) => ({ id })),
    },
  } as Prisma.EventUpdateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    updateData.content = content;
  }

  return prisma.event.update({ where: { id: eventID }, data: updateData });
}

export function convertEventsToTableData(events: Event[]): ContentTableItem[] {
  return events.map((event) => ({
    id: event.id,
    title: { value: event.title, isName: true },
    location: event.address,
    date: event.eventDate,
  }));
}
