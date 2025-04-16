import type { Route } from './+types/_index';
import { LoaderFunctionArgs, redirect } from 'react-router';
import { getUser } from '~/.server/session';
import Heading from '~/components/Heading';
import i18nServer from '~/modules/i18n.server';

export const handle = {
  i18n: ['AdminRoute', 'AdminMenu'],
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  const t = await i18nServer.getFixedT(request, 'AdminRoute');

  // TODO: improve authentication
  if (!user) {
    return redirect('/inloggen');
  }

  return {
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

export default function AdminPage() {
  return (
    <>
      <Heading level={1}>Hallo admin!</Heading>
    </>
  );
}
