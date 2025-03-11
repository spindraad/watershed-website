import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import Heading from '~/components/Heading';
import { getUser } from '~/.server/session';

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
    <div className="content space-y-4">
      <Heading level={1}>Hallo {user.name}</Heading>
    </div>
  );
}
