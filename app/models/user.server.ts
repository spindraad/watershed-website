import { prisma } from '~/.server/db';
import { User as DbUser } from '@prisma/client';

import { SerializeFrom } from '@remix-run/node';
import bcrypt from 'bcryptjs';

type User = SerializeFrom<DbUser> | DbUser;

export { type User };

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } });
}

export async function verifyLogin(email: User['email'], password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  // eslint-disable-next-line import/no-named-as-default-member
  const passwordMatches = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!passwordMatches) {
    return null;
  }

  return userWithPassword;
}
