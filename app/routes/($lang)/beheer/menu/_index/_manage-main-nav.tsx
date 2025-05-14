import type { Route } from './+types/_manage-main-nav';
import { getMenuItems, saveMenuItems } from '~/models/menu.server';
import { redirect, useFetcher, useLoaderData } from 'react-router';
import i18nServer from '~/modules/i18n.server';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';
import { NavigationMenuItem } from '~/components/NavigationMenu';
import MenuEditor from '~/components/MenuEditor';
import { useContext, useState } from 'react';
import Header from '~/components/Header';
import { getUser } from '~/.server/session';
import { ShoelaceContext } from '~/components/shoelace';

export const handle = {
  i18n: ['ManageMenuRoute', 'MenuEditor'],
};

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  if (!user) {
    throw new Response('Unauthorized', { status: 401 });
  }

  const t = await i18nServer.getFixedT(request, 'ManageMenuRoute');

  const menuItems = await getMenuItems();

  return {
    user,
    menuItems,
    metaTranslations: {
      title: t('Meta.Title'),
      description: t('Meta.Description'),
    },
  };
}

export async function action({ request }: Route.ActionArgs) {
  const items = await request.json();
  await saveMenuItems(items);

  return redirect('/beheer');
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: data.metaTranslations.title },
  {
    name: 'description',
    content: data.metaTranslations.description,
  },
];

export default function ManageMenuRoute() {
  const fetcher = useFetcher<NavigationMenuItem[]>();
  const { t } = useTranslation('ManageMenuRoute');
  const { user, menuItems: storedMenuItems } = useLoaderData<typeof loader>();
  const [menuItems, setMenuItems] = useState(() => storedMenuItems);
  const { SlButton } = useContext(ShoelaceContext);

  const handleOnMenuChange = (items: NavigationMenuItem[]) => {
    setMenuItems(items);
  };

  const saveMenu = () => {
    fetcher.submit(menuItems, {
      method: 'post',
      encType: 'application/json',
    });
  };

  const isSaving = fetcher.state !== 'idle';

  return (
    <div className="flex flex-col gap-4 h-full">
      <Heading level={1}>{t('Title')}</Heading>
      <div className="flex flex-col gap-6">
        <div className="w-full">
          <MenuEditor
            items={menuItems}
            onChange={handleOnMenuChange}
            isSaving={isSaving}
          />
        </div>

        <div className="space-y-4 w-full">
          <Heading level={2}>{t('ExampleDescription')}</Heading>
          <Header user={user} menuItems={menuItems} demoMode />
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4 mt-auto py-4">
        <SlButton href="/beheer">{t('CancelButtonCaption')}</SlButton>
        <SlButton variant="primary" onClick={saveMenu} loading={isSaving}>
          {t('SaveButtonCaption')}
        </SlButton>
      </div>
    </div>
  );
}
