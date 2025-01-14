import {
  PrismaClient,
  Creator,
  NewsArticle,
  Project,
  User,
  Event,
  Tag,
} from '@prisma/client';
import { fakerEN, fakerNL, fakerEO } from '@faker-js/faker';

const createNewsArticles = (alice: User, bob: User, client: PrismaClient) => {
  const newsArticles = Array.from({ length: 10 }).map<
    Omit<NewsArticle, 'id'> & { id?: string }
  >(() => ({
    title: {
      en: fakerEN.lorem.sentence(),
      nl: fakerNL.lorem.sentence(),
      pap: fakerEO.lorem.sentence(),
    },
    content: {
      en: fakerEN.lorem.paragraphs(3),
      nl: fakerNL.lorem.paragraphs(3),
      pap: fakerEO.lorem.paragraphs(3),
    },

    summary: {
      en: fakerEN.lorem.paragraph({ min: 1, max: 2 }),
      nl: fakerNL.lorem.paragraph({ min: 1, max: 2 }),
      pap: fakerEO.lorem.paragraph({ min: 1, max: 2 }),
    },

    imageUrl: fakerEN.image.urlPicsumPhotos({
      width: 700,
      height: 900,
      blur: 0,
    }),
    imageAlt: {
      en: fakerEN.lorem.sentence(),
      nl: fakerNL.lorem.sentence(),
      pap: fakerEO.lorem.sentence(),
    },

    slug: fakerEN.lorem.slug(),

    authorId: fakerEN.helpers.arrayElement([alice.id, bob.id]),
    externalLink: fakerEN.helpers.arrayElement([fakerEN.internet.url(), null]),
    contentRelationId: null,

    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  }));

  return client.newsArticle.createManyAndReturn({
    data: newsArticles,
  });
};

const createProjects = (client: PrismaClient) => {
  const projects = Array.from({ length: 10 }).map<
    Omit<Project, 'id'> & { id?: string }
  >(() => ({
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
    contentRelationId: null,
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  }));

  return client.project.createManyAndReturn({
    data: projects,
  });
};

const createCreators = (client: PrismaClient) => {
  const creators = Array.from({ length: 10 }).map<
    Omit<Creator, 'id'> & { id?: string }
  >(() => ({
    name: fakerEN.person.fullName(),
    contentRelationId: null,
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  }));

  return client.creator.createManyAndReturn({
    data: creators,
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
    contentRelationId: null,
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  }));

  return client.event.createManyAndReturn({
    data: events,
  });
};

const createTags = (client: PrismaClient) => {
  const tags = Array.from({ length: 10 }).map<
    Omit<Tag, 'id'> & { id?: string }
  >(() => ({
    name: {
      en: fakerEN.lorem.word(),
      nl: fakerNL.lorem.word(),
      pap: fakerEO.lorem.word(),
    },
    description: {
      en: fakerEN.lorem.sentence(),
      nl: fakerNL.lorem.sentence(),
      pap: fakerEO.lorem.sentence(),
    },
    slug: fakerEN.lorem.slug(),
    contentRelationId: null,
    createdAt: fakerEN.date.past(),
    updatedAt: fakerEN.date.recent(),
  }));

  return client.tag.createManyAndReturn({
    data: tags,
  });
};

const createRelations = async (
  newsArticles: NewsArticle[],
  projects: Project[],
  creators: Creator[],
  events: Event[],
  tags: Tag[],
  client: PrismaClient,
) => {
  for (const newsArticle of newsArticles) {
    const contentRelation = await client.contentRelation.create({
      data: {
        news: { connect: { id: newsArticle.id } },
        projects: {
          connect: { id: fakerEN.helpers.arrayElement(projects).id },
        },
        creators: {
          connect: { id: fakerEN.helpers.arrayElement(creators).id },
        },
        events: { connect: { id: fakerEN.helpers.arrayElement(events).id } },
        tags: { connect: { id: fakerEN.helpers.arrayElement(tags).id } },
      },
    });

    await client.newsArticle.update({
      where: { id: newsArticle.id },
      data: { contentRelationId: contentRelation.id },
    });
  }

  for (const project of projects) {
    const contentRelation = await client.contentRelation.create({
      data: {
        projects: { connect: { id: project.id } },
        news: {
          connect: { id: fakerEN.helpers.arrayElement(newsArticles).id },
        },
        creators: {
          connect: { id: fakerEN.helpers.arrayElement(creators).id },
        },
        events: { connect: { id: fakerEN.helpers.arrayElement(events).id } },
        tags: { connect: { id: fakerEN.helpers.arrayElement(tags).id } },
      },
    });

    await client.project.update({
      where: { id: project.id },
      data: { contentRelationId: contentRelation.id },
    });
  }

  for (const creator of creators) {
    const contentRelation = await client.contentRelation.create({
      data: {
        creators: { connect: { id: creator.id } },
        news: {
          connect: { id: fakerEN.helpers.arrayElement(newsArticles).id },
        },
        projects: {
          connect: { id: fakerEN.helpers.arrayElement(projects).id },
        },
        events: { connect: { id: fakerEN.helpers.arrayElement(events).id } },
        tags: { connect: { id: fakerEN.helpers.arrayElement(tags).id } },
      },
    });

    await client.creator.update({
      where: { id: creator.id },
      data: { contentRelationId: contentRelation.id },
    });
  }

  for (const event of events) {
    const contentRelation = await client.contentRelation.create({
      data: {
        events: { connect: { id: event.id } },
        news: {
          connect: { id: fakerEN.helpers.arrayElement(newsArticles).id },
        },
        projects: {
          connect: { id: fakerEN.helpers.arrayElement(projects).id },
        },
        creators: {
          connect: { id: fakerEN.helpers.arrayElement(creators).id },
        },
        tags: { connect: { id: fakerEN.helpers.arrayElement(tags).id } },
      },
    });

    await client.event.update({
      where: { id: event.id },
      data: { contentRelationId: contentRelation.id },
    });
  }

  for (const tag of tags) {
    const contentRelation = await client.contentRelation.create({
      data: {
        tags: { connect: { id: tag.id } },
        news: {
          connect: { id: fakerEN.helpers.arrayElement(newsArticles).id },
        },
        projects: {
          connect: { id: fakerEN.helpers.arrayElement(projects).id },
        },
        creators: {
          connect: { id: fakerEN.helpers.arrayElement(creators).id },
        },
        events: { connect: { id: fakerEN.helpers.arrayElement(events).id } },
      },
    });

    await client.tag.update({
      where: { id: tag.id },
      data: { contentRelationId: contentRelation.id },
    });
  }
};

export async function createContent(
  alice: User,
  bob: User,
  client: PrismaClient,
) {
  const newsArticles = await createNewsArticles(alice, bob, client);
  const projects = await createProjects(client);
  const creators = await createCreators(client);
  const events = await createEvents(client);
  const tags = await createTags(client);

  await createRelations(newsArticles, projects, creators, events, tags, client);
}
