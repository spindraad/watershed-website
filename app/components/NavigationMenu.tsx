import Anchor from '~/components/Anchor';

export type NavigationMenuItem = {
  id: string;
  title: PrismaJson.Localised;
  slug: string;
  order: number;
  parentID?: string; // TODO: Implement submenus
};

type Props = {
  items: NavigationMenuItem[];
};

export default function NavigationMenu({ items }: Props) {
  // Get top level menu items, sorted by order
  const topLevelItems = items
    .filter((item) => !item.parentID)
    .sort((a, b) => a.order - b.order);

  return (
    <nav className="flex flex-row gap-2 items-center">
      {topLevelItems.map((item) => (
        <Anchor key={item.id} to={`/${item.slug}`}>
          {item.title.nl}
        </Anchor>
      ))}
    </nav>
  );
}
