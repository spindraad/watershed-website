import { useTranslation } from 'react-i18next';
import { useLoaderData } from '@remix-run/react';
import Breadcrumbs from '~/components/Breadcrumbs';
import { getNewsArticlesForOverview } from '~/models/news.server';
import ArticleCard from '~/components/ArticleCard';
import { SupportedLanguages } from '~/config/i18n';

export async function loader() {
  const articles = await getNewsArticlesForOverview();

  return { articles };
}

export default function NewsOverviewRoute() {
  const { t, i18n } = useTranslation('NewsOverviewRoute');
  const { articles } = useLoaderData<typeof loader>();

  const locale = i18n.language as SupportedLanguages;

  return (
    <div className="container mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl">{t('Title')}</h1>
        <Breadcrumbs />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(
          ({ imageUrl, imageAlt, title, summary, slug, date }, index) => (
            <ArticleCard
              key={index}
              imageUrl={imageUrl}
              imageAlt={imageAlt[locale]}
              title={title[locale]}
              summary={summary[locale]}
              date={date}
              tags={[]}
              slug={slug}
            />
          ),
        )}
      </div>
    </div>
  );
}
