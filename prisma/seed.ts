import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUsers = async () => {
  return prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@wonderworld.net',
      },
      {
        name: 'Bob',
        email: 'bob@wonderworld.net',
      },
    ],
  });
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
