import { LoaderFunctionArgs, redirect } from 'react-router';
import { getUser } from '~/.server/session';
import Heading from '~/components/Heading';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  // TODO: improve authentication
  if (!user) {
    return redirect('/inloggen');
  }

  return null;
}

export default function AdminPage() {
  return (
    <>
      <Heading level={1}>Hallo admin!</Heading>
    </>
  );
}
