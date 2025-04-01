import type { Route } from './+types/_pages';
import { parseParamsToSlug } from '~/utils/slug';
import { getPageBySlug } from '~/models/pages.server';
import { data, useLoaderData } from 'react-router';
import PageRenderer from '~/components/PageRenderer';
import { Prisma } from '@prisma/client';
import { SupportedLanguages } from '~/config/i18n';

export async function loader({ params }: Route.LoaderArgs) {
  const { locale, slug } = parseParamsToSlug(params);

  try {
    const pageData = await getPageBySlug(slug || 'home');

    return {
      title: pageData.title[locale as SupportedLanguages],
      data: pageData.content[locale as SupportedLanguages],
      meta: {
        title: pageData.meta.title[locale as SupportedLanguages],
        description: pageData.meta.description[locale as SupportedLanguages],
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
