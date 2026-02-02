import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
  data,
  type LinksFunction,
  type LoaderFunctionArgs,
} from 'react-router';
import { useShoelace, ShoelaceContext } from '~/components/shoelace';
import i18nServer from '~/modules/i18n.server';
import { getErrorMessage } from '~/utils/errors';

import '@shoelace-style/shoelace/dist/themes/light.css';
import './tailwind.css';
import Header from '~/components/Header';
import { useOptionalUser } from '~/utils/user';
import { getUser } from '~/.server/session';
import Heading from '~/components/Heading';
import { getMenuItems } from '~/models/menu.server';
import { NavigationMenuItem } from '~/components/NavigationMenu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export const handle = { i18n: 'common' };

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  const locale = await i18nServer.getLocale(request);
  const url = new URL(request.url);

  const menuItems = await getMenuItems();

  return data({
    user,
    BASE_URL: url.origin ?? '',
    locale,
    menuItems,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const user = useOptionalUser();
  const data = useRouteLoaderData('root') as {
    locale?: string;
    BASE_URL?: string;
    menuItems: NavigationMenuItem[];
  };
  const shoelace = useShoelace({
    URL: data?.BASE_URL ?? '',
  });
  const queryClient = new QueryClient();

  return (
    <html className="h-full" lang={data?.locale ?? 'nl'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7655CE" />
        <Meta />
        <Links />
      </head>
      <body className="h-full text-black bg-accent-primary-100 font-gt-haptik flex flex-col gap-4">
        <QueryClientProvider client={queryClient}>
          <ShoelaceContext.Provider value={shoelace}>
            <Header user={user} menuItems={data?.menuItems} />
            {children}
          </ShoelaceContext.Provider>
        </QueryClientProvider>
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
      <div className="content">
        <Heading level={1}>
          {error.status.toString(10)} {error.statusText}
        </Heading>
        <p>{error.data}</p>
      </div>
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
