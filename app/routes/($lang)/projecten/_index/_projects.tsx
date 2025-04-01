import type { Route } from './+types/_projects';
import { Link, useLoaderData } from 'react-router';
import Heading from '~/components/Heading';
import { getProjects } from '~/models/projects.server';
import i18nServer from '~/modules/i18n.server';
import { useTranslation } from 'react-i18next';

export const handle = {
  i18n: ['ProjectIndexRoute'],
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'ProjectIndexRoute');
  const projects = await getProjects();
  return {
    projects,
    metaTranslations: {
      title: t('Meta.Title'),
      description: t('Meta.Description'),
    },
  };
}

export const meta = ({ data }: Route.MetaArgs) => [
  {
    title: data.metaTranslations.title,
  },
  {
    name: 'description',
    content: data.metaTranslations.description,
  },
];

export default function ProjectsRoute() {
  const { t } = useTranslation('ProjectIndexRoute');

  const { projects } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="content">
        <Heading level={1}>{t('Title')}</Heading>

        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projecten/${project.id}`}>
                <Heading level={4}>{project.title.nl}</Heading>
                <p>{project.summary.nl}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
