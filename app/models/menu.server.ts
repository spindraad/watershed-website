import { prisma } from '~/.server/db';

export function getMenuItems() {
  return prisma.menuItem.findMany({
    orderBy: {
      order: 'asc',
    },
    select: {
      id: true,
      title: true,
      slug: true,
      order: true,
    },
  });
}
