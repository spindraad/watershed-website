import {
  useLoaderData,
  type LoaderFunctionArgs,
  redirect,
  Outlet,
} from 'react-router';
import { getUser } from '~/.server/session';
import AccountMenu from '~/routes/($lang)/account/AccountMenu';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  if (!user) {
    return redirect('/inloggen');
  }

  return { user };
}

export default function AccountRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-[20rem_1fr] gap-4 px-4">
      <div>
        <AccountMenu user={user} />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
