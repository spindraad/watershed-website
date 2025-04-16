import type { Route } from './+types/_beheer';
import {
  type LoaderFunctionArgs,
  redirect,
  Outlet,
  useMatches,
  UIMatch,
} from 'react-router';
import { getUser } from '~/.server/session';
import AdminMenu from './AdminMenu';

export const handle = {
  i18n: 'AdminMenu',
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  // TODO: improve authentication
  if (!user) {
    return redirect('/inloggen');
  }

  return { user };
}

export default function AdminRoute({ params }: Route.ComponentProps) {
  const matches = useMatches();
  const routeMatch = matches[matches.length - 1] as UIMatch<
    object,
    { crud?: { state: string } }
  >;

  let hideMenu = false;
  if (routeMatch?.handle) {
    const content = (params.content as string) || '';
    const crudState = routeMatch.handle.crud?.state;
    if (
      content === 'paginas' &&
      (crudState === 'create' || crudState === 'update')
    ) {
      hideMenu = true;
    }
  }

  return (
    <div className="flex gap-4 px-4 h-full">
      {!hideMenu ?
        <div className="w-80">
          <AdminMenu />
        </div>
      : null}

      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
