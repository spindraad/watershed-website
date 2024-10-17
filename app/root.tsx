import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useShoelace, ShoelaceContext } from '~/components/shoelace';

import '@shoelace-style/shoelace/dist/themes/light.css';
import './tailwind.css';
import { getErrorMessage } from '~/utils/errors';

export const links: LinksFunction = () => [];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  return json({ BASE_URL: url.origin });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const shoelace = useShoelace({ URL: data.BASE_URL });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary text-black font-sans">
        <ShoelaceContext.Provider value={shoelace}>
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
    <>
      <h1>Error!</h1>
      <p>{message ?? 'Unknown error'}</p>
    </>
  );
}
