import { prisma } from '~/.server/db';
import { User as DbUser } from '@prisma/client';

import { SerializeFrom } from '@remix-run/node';

type User = SerializeFrom<DbUser> | DbUser;

export { type User };

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } });
}
