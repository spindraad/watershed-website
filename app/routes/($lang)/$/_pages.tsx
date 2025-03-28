import type { Route } from './+types/_pages';
import { parseParamsToSlug } from '~/utils/slug';
import { getPageBySlug } from '~/models/pages.server';
import { data, useLoaderData } from 'react-router';
import PageRenderer from '~/components/PageRenderer';
import { Prisma } from '@prisma/client';

export const meta: Route.MetaFunction = () => [];
export async function loader({ params }: Route.LoaderArgs) {
  const slug = parseParamsToSlug(params);
  console.log(params);

  try {
    const pageData = await getPageBySlug(slug);

    return {
      title: pageData.title,
      data: pageData.content,
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

export default function PageRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="content">
      <PageRenderer data={data} />
    </div>
  );
}
