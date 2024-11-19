import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
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

export const links: LinksFunction = () => [];

export const handle = { i18n: ['common'] };

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  const url = new URL(request.url);
  return json({
    BASE_URL: url.origin,
    locale,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData('root') as { locale?: string };

  return (
    <html lang={data?.locale ?? 'nl'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary text-black font-sans flex flex-col gap-4">
        <Header />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { BASE_URL } = useLoaderData<typeof loader>();
  const shoelace = useShoelace({ URL: BASE_URL });

  return (
    <ShoelaceContext.Provider value={shoelace}>
      <Outlet />
    </ShoelaceContext.Provider>
  );
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
    <>
      <h1>Error!</h1>
      <p>{message ?? 'Unknown error'}</p>
    </>
  );
}
