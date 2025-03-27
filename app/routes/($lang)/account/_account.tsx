import {
  useLoaderData,
  type LoaderFunctionArgs,
  redirect,
  Outlet,
} from 'react-router';
import { getUser } from '~/.server/session';
import AccountMenu from './AccountMenu';

export const handle = {
  i18n: ['AccountMenu'],
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  // TODO: improve authentication
  if (!user) {
    return redirect('/inloggen');
  }

  return { user };
}

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
