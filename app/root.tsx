import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from '@remix-run/react';
import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useShoelace, ShoelaceContext } from '~/components/shoelace';
import i18nServer from '~/modules/i18n.server';
import { getErrorMessage } from '~/utils/errors';

import '@shoelace-style/shoelace/dist/themes/light.css';
import './tailwind.css';
import Header from '~/components/Header';
import { useOptionalUser } from '~/utils/user';
import { getUser } from '~/.server/session';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.png',
    type: 'image/png',
  },
  {
    rel: 'apple-touch-icon',
    href: '/favicon.png',
    type: 'image/png',
  },
];

export const handle = { i18n: ['common'] };

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  const locale = await i18nServer.getLocale(request);
  const url = new URL(request.url);
  return json({
    user,
    BASE_URL: url.origin,
    locale,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser();
  const data = useRouteLoaderData('root') as {
    locale?: string;
    BASE_URL: string;
  };
  const shoelace = useShoelace({ URL: data.BASE_URL });

  return (
    <html lang={data?.locale ?? 'nl'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary text-black font-sans flex flex-col gap-4">
        <ShoelaceContext.Provider value={shoelace}>
          <Header user={user} />
          {children}
        </ShoelaceContext.Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  const message = getErrorMessage(error);

  return (
    <div className="content">
      <h1>Error!</h1>
      <p>{message ?? 'Unknown error'}</p>
    </div>
  );
}
