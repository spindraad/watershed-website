import type { Route } from './+types/_overview';
import { useLoaderData } from 'react-router';
import ContentTable, { ContentTableItem } from '~/components/ContentTable';
import { convertEventsToTableData, getEvents } from '~/models/events.server';
import {
  convertProjectsToTableData,
  getProjects,
} from '~/models/projects.server';
import { ContentURLParams } from '~/types/Content';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';

export async function loader({ params }: Route.LoaderArgs) {
  const content = params.content as ContentURLParams;

  let data: ContentTableItem[] = [];

  switch (content) {
    case 'evenementen': {
      const events = await getEvents();
      data = convertEventsToTableData(events);
      break;
    }

    case 'projecten': {
      const projects = await getProjects();
      data = convertProjectsToTableData(projects);
      break;
    }
  }

  return { data };
}

export default function ContentOverviewRoute({ params }: Route.ComponentProps) {
  const { data } = useLoaderData<typeof loader>();
  const { t } = useTranslation('ContentOverviewRoute');
  const content = params.content as ContentURLParams;

  let translationKey = '';
  switch (content) {
    case 'evenementen': {
      translationKey = 'Titles.events';
      break;
    }
    case 'projecten': {
      translationKey = 'Titles.projects';
      break;
    }
  }

  return (
    <div>
      <Heading level={1}>{t(translationKey)}</Heading>
      <ContentTable items={data} />
    </div>
  );
}
