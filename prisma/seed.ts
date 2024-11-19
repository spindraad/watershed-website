import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const createUsers = async () => {
  return Promise.all([
    prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@wonderworld.net',
        password: {
          create: {
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
            hash: await bcrypt.hash('password', 10),
          },
        },
      },
    }),
  ]);
};

async function seed() {
  await createUsers();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
