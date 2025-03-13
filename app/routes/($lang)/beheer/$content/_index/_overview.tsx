import type { Route } from './+types/_overview';
import { useLoaderData } from 'react-router';
import ContentTable, { ContentTableItem } from '~/components/ContentTable';
import { convertEventsToTableData, getEvents } from '~/models/events.server';
import {
  convertProjectsToTableData,
  getProjects,
} from '~/models/projects.server';
import { ContentURLParams } from '~/types/Content';

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

export default function ContentOverviewRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <ContentTable items={data} />
    </div>
  );
}
