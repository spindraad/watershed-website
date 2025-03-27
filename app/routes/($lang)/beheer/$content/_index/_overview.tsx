import type { Route } from './+types/_overview';
import { useContext, useRef, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import { SlAlert } from '@shoelace-style/shoelace';
import { useTranslation } from 'react-i18next';
import ContentTable, { ContentTableItem } from '~/components/ContentTable';
import { convertEventsToTableData, getEvents } from '~/models/events.server';
import {
  convertProjectsToTableData,
  getProjects,
} from '~/models/projects.server';
import { ContentURLParams } from '~/types/Content';
import Heading from '~/components/Heading';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import DeletionNotification from './DeletionNotification';
import i18nServer from '~/modules/i18n.server';
import { ShoelaceContext } from '~/components/shoelace';

export const handle = {
  i18n: [
    'ContentOverviewRoute',
    'ContentTable',
    'ConfirmDeleteDialog',
    'DeletionNotification',
  ],
};

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
  const { SlButton, SlIcon } = useContext(ShoelaceContext);
  const { data } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { t } = useTranslation('ContentOverviewRoute');

  const [openDialog, setOpenDialog] = useState(false);
  const notifyRef = useRef<SlAlert>(null);
  const [itemName, setItemName] = useState('asd');
  const [itemID, setItemID] = useState('asd');

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
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <Heading level={1}>{t('Title', { content })}</Heading>
        <SlButton href={`/beheer/${content}/nieuw`} variant="primary">
          <SlIcon slot="prefix" name="plus-circle-dotted"></SlIcon>
          {t('NewButtonCaption', { content, count: 1 })}
        </SlButton>
      </div>

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
