import type { Route } from './+types/_overview';
import { useFetcher, useLoaderData } from 'react-router';
import ContentTable, { ContentTableItem } from '~/components/ContentTable';
import { convertEventsToTableData, getEvents } from '~/models/events.server';
import {
  convertProjectsToTableData,
  getProjects,
} from '~/models/projects.server';
import { ContentURLParams } from '~/types/Content';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';
import ConfirmDeleteDialog from '~/routes/($lang)/beheer/$content/_index/ConfirmDeleteDialog';
import { useState } from 'react';

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
  const content = params.content as ContentURLParams;
  const { data } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { t } = useTranslation('ContentOverviewRoute');

  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemID, setItemID] = useState('');

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

  function triggerDelete(itemID: string, itemName: string) {
    setItemName(itemName);
    setItemID(itemID);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {
    fetcher
      .submit(
        { id: itemID },
        {
          action: `/beheer/${content}/verwijderen/${itemID}`,
          method: 'DELETE',
          encType: 'application/json',
        },
      )
      .then(() => {
        setOpen(false);
      });
  }

  const isDeleting = fetcher.state !== 'idle';

  return (
    <div>
      <Heading level={1}>{t(translationKey)}</Heading>
      <ContentTable items={data} triggerDelete={triggerDelete} />

      <ConfirmDeleteDialog
        open={open}
        onDelete={handleDelete}
        onCancel={handleClose}
        itemName={itemName}
        isDeleting={isDeleting}
      />
    </div>
  );
}
