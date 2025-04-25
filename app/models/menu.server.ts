import { prisma } from '~/.server/db';

export function getMenuItems() {
  return prisma.menuItem.findMany({
    orderBy: {
      order: 'asc',
    },
  });
}
