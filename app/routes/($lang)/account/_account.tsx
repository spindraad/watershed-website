import type { Route } from './+types/_account';
import { useLoaderData, redirect, Outlet } from 'react-router';
import { getUser } from '~/.server/session';
import AccountMenu from './AccountMenu';
import i18nServer from '~/modules/i18n.server';

export const handle = {
  i18n: ['AccountMenu', 'AccountRoute'],
};

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  const t = await i18nServer.getFixedT(request, 'AccountRoute');

  // TODO: improve authentication
  if (!user) {
    return redirect('/inloggen');
  }

  return {
    user,
    metaTranslations: {
      title: t('Meta.Title'),
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => [
  {
    title: data.metaTranslations.title,
  },
];

export default function AccountRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex gap-4 px-4">
      <div className="w-80">
        <AccountMenu user={user} />
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
