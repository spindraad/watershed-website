import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import { Event } from '~/models/events.server';
import Input from '~/components/Input';
import { EventErrors } from '~/validations/models/event';

type Props = Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>> & {
  id?: string;
};

export default function EventMutationForm({
  id = '',
  title,
  description,
  link = '',
  address = '',
  eventDate,
}: Props) {
  const { t, i18n } = useTranslation('EventMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher();

  const localisedTitle = title ? title[i18n.language] : '';
  const localisedDescription = description ? description[i18n.language] : '';

  const errors = fetcher.data?.errors as EventErrors;
  const isSubmitting = fetcher.state !== 'idle';

  return (
    <fetcher.Form className="space-y-4" method="post">
      <Heading level={1}>{t('Title')}</Heading>

      {id ?
        <input type="hidden" name="id" value={id} />
      : null}

      <Input
        label={t('Labels.Title')}
        name="title"
        id="title"
        type="text"
        value={localisedTitle}
        error={errors?.title}
      />

      <Input
        label={t('Labels.Description')}
        name="description"
        id="description"
        type="text"
        value={localisedDescription}
        error={errors?.description}
      />

      <Input
        label={t('Labels.Address')}
        name="address"
        id="address"
        type="text"
        value={address}
        error={errors?.address}
      />

      <Input
        label={t('Labels.Link')}
        id="link"
        name="link"
        type="url"
        value={link}
        error={errors?.link}
      />

      <Input
        label={t('Labels.EventDate')}
        name="eventDate"
        id="eventDate"
        type="datetime-local"
        defaultValue={eventDate?.toISOString()}
        error={errors?.eventDate}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
