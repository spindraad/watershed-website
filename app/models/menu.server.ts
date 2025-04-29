import { prisma } from '~/.server/db';
import { NavigationMenuItem } from '~/components/NavigationMenu';

export function getMenuItems(): Promise<NavigationMenuItem[]> {
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

export function saveMenuItems(items: NavigationMenuItem[]) {
  return prisma.$transaction(
    items.map((item) =>
      prisma.menuItem.upsert({
        where: { id: item.id },
        create: {
          id: item.id,
          title: item.title,
          slug: item.slug,
          order: item.order,
        },
        update: {
          title: item.title,
          slug: item.slug,
          order: item.order,
        },
      }),
    ),
  );
}
