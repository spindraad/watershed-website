import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const createUsers = async () => {
  return Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@wonderworld.net',
        password: {
          create: {
            // eslint-disable-next-line import/no-named-as-default-member
            hash: await bcrypt.hash('password', 10),
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob',
        email: 'bob@wonderworld.net',
        password: {
          create: {
            // eslint-disable-next-line import/no-named-as-default-member
            hash: await bcrypt.hash('password', 10),
          },
        },
      },
    }),
  ]);
};

const createPasswordResetSession = async () => {
  return prisma.passwordResets.create({
    data: {
      token: faker.string.uuid(),
      expiresAt: faker.date.future(),
      email: 'alice@wonderworld.net',
    },
  });
};

async function seed() {
  await createUsers();
  await createPasswordResetSession();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
