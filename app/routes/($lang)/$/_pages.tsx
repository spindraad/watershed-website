import type { Route } from './+types/_pages';
import { parseParamsToSlug } from '~/utils/slug';
import { getPageBySlug } from '~/models/pages.server';
import { data, useLoaderData } from 'react-router';
import PageRenderer from '~/components/PageRenderer';
import { Prisma } from '@prisma/client';
import { SupportedLanguages } from '~/config/i18n';
import { WatershedPageData } from '~/config/puck.config';

export async function loader({ params }: Route.LoaderArgs) {
  const { locale, slug } = parseParamsToSlug(params);

  try {
    const pageData = await getPageBySlug(slug || 'home');

    const data = pageData.content[
      locale as SupportedLanguages
    ] as WatershedPageData;

    return {
      title: data.root.title,
      data: data,
      meta: {
        title: data.root.meta?.title,
        description: data.root.meta?.description,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw data('Page not found', { status: 404 });
      }
    }
    console.error(error);

    throw new Error('An error occurred while fetching the page');
  }
}

export const meta: Route.MetaFunction = ({
  data: { meta },
}: Route.MetaArgs) => [
  {
    title: meta.title,
    description: meta.description,
  },
];

export default function PageRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="content">
      <PageRenderer data={data} />
    </div>
  );
}
