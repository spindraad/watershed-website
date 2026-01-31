import { PrismaClient, Project } from '@prisma/client';
import { fakerEN, fakerNL, fakerEO } from '@faker-js/faker';
import { home, contact, about } from './_pageContent';
import { events, uploadImagesIfNeeded } from './_events';
import { createMakers, uploadMakerImagesIfNeeded } from './_makerContent';

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
  return Promise.all([
    client.event.createManyAndReturn({
      data: events,
    }),
    uploadImagesIfNeeded(),
  ]);
};

const createPages = (client: PrismaClient) => {
  const pages = [
    {
      content: home,
      slug: 'home',
      createdAt: fakerEN.date.past(),
      updatedAt: fakerEN.date.recent(),
    },
    {
      content: about,
      slug: 'about',
      createdAt: fakerEN.date.past(),
      updatedAt: fakerEN.date.recent(),
    },
    {
      content: contact,
      slug: 'contact',
      createdAt: fakerEN.date.past(),
      updatedAt: fakerEN.date.recent(),
    },
  ];

  return client.page.createManyAndReturn({
    data: pages,
  });
};

const createNavigationMenu = (client: PrismaClient) => {
  const menuItems = [
    {
      id: 'events',
      title: {
        en: 'Events',
        nl: 'Evenementen',
        pap: 'Eventos',
      },
      slug: 'evenementen',
      order: 0,
    },
    {
      id: 'projects',
      title: {
        en: 'Projects',
        nl: 'Projecten',
        pap: 'Proyekto',
      },
      slug: 'projecten',
      order: 1,
    },
    {
      id: 'about',
      title: {
        en: 'About Us',
        nl: 'Over Ons',
        pap: 'Sobre Nos',
      },
      slug: 'about',
      order: 2,
    },
    {
      id: 'contact',
      title: {
        en: 'Contact Us',
        nl: 'Neem Contact Op',
        pap: 'Kontakto Ku Nos',
      },
      slug: 'contact',
      order: 3,
    },
  ];

  return client.menuItem.createManyAndReturn({
    data: menuItems,
  });
};

export async function createContent(client: PrismaClient) {
  const projects = createProjects(client);
  const events = createEvents(client);
  const pages = createPages(client);
  const menuItems = createNavigationMenu(client);
  const makers = Promise.all([
    createMakers(client),
    uploadMakerImagesIfNeeded(),
  ]);

  return Promise.all([projects, events, pages, menuItems, makers]);
}
