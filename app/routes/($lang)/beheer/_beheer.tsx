import { type LoaderFunctionArgs, redirect, Outlet } from 'react-router';
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

export default function AdminRoute() {
  return (
    <div className="flex gap-4 px-4">
      <div className="w-80">
        <AdminMenu />
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
