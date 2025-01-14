import { PrismaClient, User } from '@prisma/client';
import { createPasswordResetSession, createUsers } from './_users';
import { createContent } from './_content';

const prisma = new PrismaClient();

let alice: User;
let bob: User;

async function seed() {
  const users = await createUsers(prisma);
  alice = users[0];
  bob = users[1];

  await createPasswordResetSession(alice, prisma);

  await createContent(alice, bob, prisma);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
