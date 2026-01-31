import Anchor from '~/components/Anchor';
import { useContext, useEffect, useState } from 'react';
import { ShoelaceContext } from '~/components/shoelace';

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
  const smallMenuMediaQuery = '(max-width: 500px)';
  const { SlDrawer, SlIconButton } = useContext(ShoelaceContext);

  const [menuOisOpen, setMenuOisOpen] = useState(false);
  const [showSmallNav, setShowSmallNav] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(smallMenuMediaQuery).matches;
    }
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(smallMenuMediaQuery);
    const handleResize = (e: MediaQueryListEvent) => {
      setShowSmallNav(e.matches);
    };
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // Get top level menu items, sorted by order
  const topLevelItems = items
    .filter((item) => !item.parentID)
    .sort((a, b) => a.order - b.order);

  if (showSmallNav) {
    return (
      <nav className="flex flex-row gap-2 justify-end">
        <SlIconButton
          name="list"
          label="Menu"
          onClick={() => setMenuOisOpen(true)}
        ></SlIconButton>
        <SlDrawer
          label="Menu"
          placement="end"
          open={menuOisOpen}
          onSlAfterHide={() => setMenuOisOpen(false)}
        >
          <div className="flex flex-col gap-4 p-4">
            {topLevelItems.map((item) => (
              <Anchor
                key={item.id}
                to={`/${item.slug}`}
                onClick={() => setMenuOisOpen(false)}
              >
                {item.title.nl}
              </Anchor>
            ))}
          </div>
        </SlDrawer>
      </nav>
    );
  }

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
