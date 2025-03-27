import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

type UserSeed = {
  name: string;
  email: string;
  password: string;
};

const users: UserSeed[] = [
  {
    name: 'Stan',
    email: 'stan@stichtingwatershed.nl',
    password: 'password',
  },
  {
    name: 'Juliet',
    email: 'juliet@stichtingwatershed.nl',
    password: 'password',
  },
  {
    name: 'Arantja',
    email: 'arantja@stichtingwatershed.nl',
    password: 'password',
  },
  {
    name: 'Lody',
    email: 'lody@stichtingwatershed.nl',
    password: 'password',
  },
];

export const createUsers = async (client: PrismaClient): Promise<User[]> => {
  return Promise.all(
    users.map(async ({ name, email, password }) => {
      // eslint-disable-next-line import/no-named-as-default-member
      const hashedPassword = await bcrypt.hash(password, 10);

      return client.user.create({
        data: {
          name,
          email,
          password: {
            create: {
              hash: hashedPassword,
            },
          },
        },
      });
    }),
  );
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
