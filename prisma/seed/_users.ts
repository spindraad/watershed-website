import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

export const createUsers = async (
  client: PrismaClient,
): Promise<[User, User]> => {
  return Promise.all([
    client.user.create({
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
    client.user.create({
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
export const createPasswordResetSession = async (
  aliceUser: User,
  client: PrismaClient,
) => {
  await client.password.update({
    where: {
      userId: aliceUser.id,
    },
    data: {
      type: 'RESET',
    },
  });

  return client.passwordReset.create({
    data: {
      token: faker.string.uuid(),
      expiresAt: faker.date.future(),
      email: aliceUser.email,
    },
  });
};
