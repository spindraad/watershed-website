import { MetaFunction, useLoaderData } from 'react-router';
import { getPageBySlug } from '~/models/pages.server';
import PageRenderer from '~/components/PageRenderer';

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'Literair platform | Stichting Watershed | A roof for writers | Eindhoven',
    },
    {
      name: 'description',
      content:
        'Literair platform Watershed van Stichting Watershed helpt schrijvers met literatuur. Wij zijn een podium voor schrijvers en doen aan talentontwikkeling voor schrijvers.',
    },
  ];
};

export async function loader() {
  const page = await getPageBySlug('home');

  return {
    title: page.title,
    data: page.content,
  };
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="content">
        <PageRenderer data={data} />
      </div>
    </>
  );
}
