import {
  PrismaClient,
  Creator,
  NewsArticle,
  Project,
  User,
  Event,
  Tag,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const createNewsArticles = (alice: User, bob: User, client: PrismaClient) => {
  const newsArticles = Array.from({ length: 10 }).map<
    Omit<NewsArticle, 'id'> & { id?: string }
  >(() => ({
    title: {
      en: faker.lorem.sentence(),
      nl: faker.lorem.sentence(),
      pap: faker.lorem.sentence(),
    },
    content: {
      en: faker.lorem.paragraphs(3),
      nl: faker.lorem.paragraphs(3),
      pap: faker.lorem.paragraphs(3),
    },

    image: faker.image.url(),
    authorId: faker.helpers.arrayElement([alice.id, bob.id]),
    externalLink: faker.helpers.arrayElement([faker.internet.url(), '']),
    contentRelationId: '',

    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
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
      en: faker.lorem.paragraphs(3),
      nl: faker.lorem.paragraphs(3),
      pap: faker.lorem.paragraphs(3),
    },
    contentRelationId: '',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));

  return client.project.createManyAndReturn({
    data: projects,
  });
};

const createCreators = (client: PrismaClient) => {
  const creators = Array.from({ length: 10 }).map<
    Omit<Creator, 'id'> & { id?: string }
  >(() => ({
    name: faker.person.fullName(),
    contentRelationId: '',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
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
      en: faker.lorem.sentence(),
      nl: faker.lorem.sentence(),
      pap: faker.lorem.sentence(),
    },
    description: {
      en: faker.lorem.paragraphs(3),
      nl: faker.lorem.paragraphs(3),
      pap: faker.lorem.paragraphs(3),
    },
    eventDate: faker.date.future(),
    address: faker.location.streetAddress(),
    link: '',
    contentRelationId: '',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
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
      en: faker.lorem.word(),
      nl: faker.lorem.word(),
      pap: faker.lorem.word(),
    },
    description: {
      en: faker.lorem.sentence(),
      nl: faker.lorem.sentence(),
      pap: faker.lorem.sentence(),
    },
    slug: faker.lorem.slug(),
    contentRelationId: '',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
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
        projects: { connect: { id: faker.helpers.arrayElement(projects).id } },
        creators: { connect: { id: faker.helpers.arrayElement(creators).id } },
        events: { connect: { id: faker.helpers.arrayElement(events).id } },
        tags: { connect: { id: faker.helpers.arrayElement(tags).id } },
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
        news: { connect: { id: faker.helpers.arrayElement(newsArticles).id } },
        creators: { connect: { id: faker.helpers.arrayElement(creators).id } },
        events: { connect: { id: faker.helpers.arrayElement(events).id } },
        tags: { connect: { id: faker.helpers.arrayElement(tags).id } },
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
        news: { connect: { id: faker.helpers.arrayElement(newsArticles).id } },
        projects: { connect: { id: faker.helpers.arrayElement(projects).id } },
        events: { connect: { id: faker.helpers.arrayElement(events).id } },
        tags: { connect: { id: faker.helpers.arrayElement(tags).id } },
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
        news: { connect: { id: faker.helpers.arrayElement(newsArticles).id } },
        projects: { connect: { id: faker.helpers.arrayElement(projects).id } },
        creators: { connect: { id: faker.helpers.arrayElement(creators).id } },
        tags: { connect: { id: faker.helpers.arrayElement(tags).id } },
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
        news: { connect: { id: faker.helpers.arrayElement(newsArticles).id } },
        projects: { connect: { id: faker.helpers.arrayElement(projects).id } },
        creators: { connect: { id: faker.helpers.arrayElement(creators).id } },
        events: { connect: { id: faker.helpers.arrayElement(events).id } },
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
