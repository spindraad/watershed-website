import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

let alice: User;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let bob: User;

const createUsers = async () => {
  [alice, bob] = await Promise.all([
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
  await prisma.password.update({
    where: {
      userId: alice.id,
    },
    data: {
      type: 'RESET',
    },
  });

  return prisma.passwordResets.create({
    data: {
      token: faker.string.uuid(),
      expiresAt: faker.date.future(),
      email: alice.email,
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
