import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { createPasswordResetSession, createUsers } from './_users';
import { createContent } from './_content';

const prisma = new PrismaClient();

async function seed() {
  const users = await createUsers(prisma);

  const randomlyPickedUser = faker.helpers.arrayElement(users);
  console.log(
    'Creating password reset session for user:',
    randomlyPickedUser.email,
  );
  await createPasswordResetSession(randomlyPickedUser, prisma);

  await createContent(prisma);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
