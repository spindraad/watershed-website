import { prisma } from '~/.server/db';
import { User as DbUser } from '@prisma/client';

import { SerializeFrom } from '@remix-run/node';
import bcrypt from 'bcryptjs';
import { addHours } from 'date-fns';

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

export async function getPasswordResetSession(token: string) {
  return prisma.passwordResets.findUniqueOrThrow({
    where: {
      token,
    },
  });
}

export async function createPasswordResetSession(email: User['email']) {
  // Create an expiry date for the token, set it to 36 hours from now
  const expiresAt = addHours(new Date(), 36);

  return prisma.passwordResets.create({
    data: {
      email,
      expiresAt,
    },
  });
}

export async function updatePassword(
  email: User['email'],
  password: string,
  token: string,
) {
  // eslint-disable-next-line import/no-named-as-default-member
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: {
        update: {
          hash: hashedPassword,
        },
      },
    },
  });

  return prisma.passwordResets.delete({
    where: {
      token,
    },
  });
}
