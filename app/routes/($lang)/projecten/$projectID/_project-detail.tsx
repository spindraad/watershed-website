import type { Route } from './+types/_project-detail';
import { useLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';
import { getProject } from '~/models/projects.server';
import { convertDateToLocaleString } from '~/utils/date';

export async function loader({ params }: Route.LoaderArgs) {
  const { projectID } = params;

  const project = await getProject(projectID);

  return {
    project,
  };
}

export default function ProjectDetailRoute() {
  const { project } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  const content = { __html: project.description[i18n.language] };

  return (
    <>
      <div className="content space-y-4">
        <Heading level={1}>{project.title[i18n.language]}</Heading>
        <p className="flex flex-row gap-4">
          {convertDateToLocaleString(project.createdAt)}
        </p>

        <p
          className="text-2xl"
          style={{
            fontWeight: 200,
          }}
        >
          {project.summary[i18n.language]}
        </p>

        <div className="prose prose-2xl" dangerouslySetInnerHTML={content} />
      </div>
    </>
  );
}
