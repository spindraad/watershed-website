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
      content: {
        root: { title: 'Home' },
        zones: {},
        content: [
          {
            type: 'HeadingBlock',
            props: {
              id: 'Heading-1694032984497',
              text: 'Welcome to our website',
              align: 'center',
              level: 1,
            },
          },
          {
            type: 'RichTextBlock',
            props: {
              id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa3',
              content:
                '<p>This is the home page with some example content. We are dedicated to providing the best service for our customers.</p>',
            },
          },
        ],
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
      content: {
        root: { title: 'About Us' },
        zones: {},
        content: [
          {
            type: 'HeadingBlock',
            props: {
              id: 'Heading-169403298449711',
              text: 'About Our Organization',
              align: 'center',
              level: 1,
            },
          },
          {
            type: 'RichTextBlock',
            props: {
              id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122',
              content:
                '<p>We are an organization committed to excellence. Founded in 2010, we have been serving our community for many years.</p><p>Our team consists of dedicated professionals who are passionate about their work.</p>',
            },
          },
        ],
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
      content: {
        root: { title: 'Contact Us' },
        zones: {},
        content: [
          {
            type: 'HeadingBlock',
            props: {
              id: 'Heading-1694032984497113344',
              text: 'Contact Us',
              align: 'center',
              level: 1,
            },
          },
          {
            type: 'RichTextBlock',
            props: {
              id: 'RichText-c8a0073a-9d67-4b30-8f31-281a76dedaa31122334477',
              content:
                '<p>Email: info@example.com</p><p>Phone: +1 234 567 890</p><p>Address: 123 Main Street, City, Country</p>',
            },
          },
        ],
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
