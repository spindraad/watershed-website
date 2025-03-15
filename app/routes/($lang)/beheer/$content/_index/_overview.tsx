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
import { useRef, useState } from 'react';
import DeletionNotification from '~/routes/($lang)/beheer/$content/_index/DeletionNotification';
import { SlAlert } from '@shoelace-style/shoelace';
import i18nServer from '~/modules/i18n.server';

export async function loader({ params, request }: Route.LoaderArgs) {
  const content = params.content as ContentURLParams;
  const t = await i18nServer.getFixedT(request, 'ContentOverviewRoute');

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

  return {
    data,
    metaTranslations: {
      title: t('Meta.Title', { content, count: data.length }),
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: data.metaTranslations.title,
    },
  ];
};

export default function ContentOverviewRoute({ params }: Route.ComponentProps) {
  const content = params.content as ContentURLParams;
  const { data } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { t } = useTranslation('ContentOverviewRoute');

  const [openDialog, setOpenDialog] = useState(false);
  const notifyRef = useRef<SlAlert>(null);
  const [itemName, setItemName] = useState('asd');
  const [itemID, setItemID] = useState('asd');

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
    setOpenDialog(true);
  }

  function handleDialogClose() {
    setOpenDialog(false);
  }

  function handleNotifyClose() {
    notifyRef.current?.hide();
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
        setOpenDialog(false);
        notifyRef.current?.toast();
      });
  }

  const isDeleting = fetcher.state !== 'idle';

  return (
    <div>
      <Heading level={1}>{t(translationKey)}</Heading>
      <ContentTable items={data} triggerDelete={triggerDelete} />

      <ConfirmDeleteDialog
        open={openDialog}
        onDelete={handleDelete}
        onCancel={handleDialogClose}
        itemName={itemName}
        isDeleting={isDeleting}
      />

      <DeletionNotification
        ref={notifyRef}
        itemName={itemName}
        onClose={handleNotifyClose}
      />
    </div>
  );
}
