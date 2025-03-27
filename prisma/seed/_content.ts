import { PrismaClient, Project, Event } from '@prisma/client';
import { fakerEN, fakerNL, fakerEO } from '@faker-js/faker';

const createProjects = (client: PrismaClient) => {
  const projects = Array.from({ length: 10 }).map<
    Omit<Project, 'id'> & { id?: string }
  >(() => ({
    title: {
      en: fakerEN.lorem.sentence(),
      nl: fakerNL.lorem.sentence(),
      pap: fakerEO.lorem.sentence(),
    },
    description: {
      en: fakerEN.lorem.paragraphs(3),
      nl: fakerNL.lorem.paragraphs(3),
      pap: fakerEO.lorem.paragraphs(3),
    },
    summary: {
      en: fakerEN.lorem.paragraph({ min: 1, max: 3 }),
      nl: fakerNL.lorem.paragraph({ min: 1, max: 3 }),
      pap: fakerEO.lorem.paragraph({ min: 1, max: 3 }),
    },
    slug: fakerEN.lorem.slug(),
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  }));

  return client.project.createManyAndReturn({
    data: projects,
  });
};

const createEvents = (client: PrismaClient) => {
  const events = Array.from({ length: 10 }).map<
    Omit<Event, 'id'> & { id?: string }
  >(() => ({
    title: {
      en: fakerEN.lorem.sentence(),
      nl: fakerNL.lorem.sentence(),
      pap: fakerEO.lorem.sentence(),
    },
    description: {
      en: fakerEN.lorem.paragraphs(3),
      nl: fakerNL.lorem.paragraphs(3),
      pap: fakerEO.lorem.paragraphs(3),
    },
    eventDate: fakerEN.date.future(),
    address: fakerEN.location.streetAddress(),
    link: '',
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  }));

  return client.event.createManyAndReturn({
    data: events,
  });
};

export async function createContent(client: PrismaClient) {
  const projects = createProjects(client);
  const events = createEvents(client);

  return Promise.all([projects, events]);
}
