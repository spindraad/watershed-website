import type { Route } from './+types/_manage-main-nav';
import { getMenuItems } from '~/models/menu.server';
import { useLoaderData } from 'react-router';
import i18nServer from '~/modules/i18n.server';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';
import NavigationMenu, {
  NavigationMenuItem,
} from '~/components/NavigationMenu';
import MenuEditor from '~/components/MenuEditor';
import { useState } from 'react';

export const handle = {
  i18n: ['ManageMenuRoute', 'MenuEditor'],
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'ManageMenuRoute');

  const menuItems = await getMenuItems();

  return {
    menuItems,
    metaTranslations: {
      title: t('Meta.Title'),
      description: t('Meta.Description'),
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: data.metaTranslations.title },
  {
    name: 'description',
    content: data.metaTranslations.description,
  },
];

export default function ManageMenuRoute() {
  const { t } = useTranslation('ManageMenuRoute');
  const { menuItems: storedMenuItems } = useLoaderData<typeof loader>();
  const [menuItems, setMenuItems] = useState(() => storedMenuItems);

  const handleSave = (items: NavigationMenuItem[]) => {
    setMenuItems(items);
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading level={1}>{t('Title')}</Heading>
      <div className="flex flex-row gap-2">
        <div className="space-y-4 w-full">
          <MenuEditor items={menuItems} onSave={handleSave} />
        </div>

        <div className="space-y-4 w-full">
          <Heading level={2}>{t('ExampleDescription')}</Heading>
          <NavigationMenu items={menuItems} />
        </div>
      </div>
    </div>
  );
}
