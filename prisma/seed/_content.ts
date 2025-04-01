import { PrismaClient, Project, Event } from '@prisma/client';
import { fakerEN, fakerNL, fakerEO } from '@faker-js/faker';
import { home, contact, about } from './_pageContent';

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

const createPages = (client: PrismaClient) => {
  const pages = [
    {
      title: {
        en: 'Home',
        nl: 'Home',
        pap: 'Kas',
      },
      summary: {
        en: 'Welcome to our website',
        nl: 'Welkom op onze website',
        pap: 'Bon biní na nos wèpsait',
      },
      content: home,
      meta: {
        title: {
          en: 'Literary platform | Watershed Foundation | A roof for writers | Eindhoven',
          nl: 'Literair platform | Stichting Watershed | A roof for writers | Eindhoven',
          pap: 'Literario platform | Fundashon Watershed | Un kas pa skirbi | Eindhoven',
        },
        description: {
          en: 'Literary platform Watershed of the Watershed Foundation helps writers with literature. We are a stage for writers and do talent development for writers.',
          nl: 'Literair platform Watershed van Stichting Watershed helpt schrijvers met literatuur. Wij zijn een podium voor schrijvers en doen aan talentontwikkeling voor schrijvers.',
          pap: 'Literario platform Watershed di Fundashon Watershed yuda skirbi ku literatùra. Nos ta un podio pa skirbi i hasi desaroyo di talento pa skirbi.',
        },
      },
      slug: 'home',
      createdAt: fakerEN.date.past(),
      updatedAt: fakerEN.date.recent(),
    },
    {
      title: {
        en: 'About Us',
        nl: 'Over Ons',
        pap: 'Tokante Nos',
      },
      summary: {
        en: 'Learn more about our organization',
        nl: 'Lees meer over onze organisatie',
        pap: 'Siña mas tokante nos organisashon',
      },
      content: about,
      meta: {
        title: {
          en: 'About Us',
          nl: 'Over Ons',
          pap: 'Tokante Nos',
        },
        description: {
          en: 'Learn more about our organization and our mission.',
          nl: 'Lees meer over onze organisatie en onze missie.',
          pap: 'Siña mas tokante nos organisashon i nos mision',
        },
      },
      slug: 'about',
      createdAt: fakerEN.date.past(),
      updatedAt: fakerEN.date.recent(),
    },
    {
      title: {
        en: 'Contact',
        nl: 'Contact',
        pap: 'Kontakto',
      },
      summary: {
        en: 'Get in touch with us',
        nl: 'Neem contact met ons op',
        pap: 'Tuma kontakto ku nos',
      },
      content: contact,
      meta: {
        title: {
          en: 'Contact Us',
          nl: 'Neem Contact Met Ons Op',
          pap: 'Kontakto Ku Nos',
        },
        description: {
          en: 'Get in touch with us for any inquiries or support.',
          nl: 'Neem contact met ons voor vragen of ondersteuning.',
          pap: 'Tuma kontakto ku nos pa kualke pregunta of suport',
        },
      },
      slug: 'contact',
      createdAt: fakerEN.date.past(),
      updatedAt: fakerEN.date.recent(),
    },
  ];

  return client.page.createManyAndReturn({
    data: pages,
  });
};

export async function createContent(client: PrismaClient) {
  const projects = createProjects(client);
  const events = createEvents(client);
  const pages = createPages(client);

  return Promise.all([projects, events, pages]);
}
