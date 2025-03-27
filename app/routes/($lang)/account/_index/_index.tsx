import { LoaderFunctionArgs, redirect } from 'react-router';
import Heading from '~/components/Heading';
import { getUser } from '~/.server/session';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  // TODO: improve authentication
  if (!user) {
    return redirect('/inloggen');
  }

  return null;
}

export default function AccountPage() {
  return (
    <>
      <Heading level={1}>Hallo</Heading>
    </>
  );
}
