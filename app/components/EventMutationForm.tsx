import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import { Event } from '~/models/events.server';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import { EventErrors, EventValidator } from '~/validations/models/event';

type Props = Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>> & {
  id?: string;
};

export default function EventMutationForm({
  id = '',
  ...initialValues
}: Props) {
  const { t, i18n } = useTranslation('EventMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<EventErrors, EventValidator>>();

  const [title, setTitle] = useState(
    initialValues.title ? initialValues.title[i18n.language] : '',
  );
  const [description, setDescription] = useState(
    initialValues.description ? initialValues.description[i18n.language] : '',
  );
  const [address, setAddress] = useState(initialValues.address ?? '');
  const [link, setLink] = useState(initialValues.link ?? '');
  const [eventDate, setEventDate] = useState(
    initialValues.eventDate ? initialValues.eventDate.toISOString() : '',
  );

  useEffect(() => {
    if (fetcher.data) {
      const { title, description, address, link, eventDate } =
        fetcher.data.data;
      setTitle(title);
      setDescription(description);
      setAddress(address);
      setLink(link);
      setEventDate(eventDate);
    }
  }, [fetcher.data, i18n.language]);

  const errors = fetcher.data?.errors;
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
        value={title}
        error={errors?.title}
      />

      <Input
        label={t('Labels.Description')}
        name="description"
        id="description"
        type="text"
        value={description}
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
        defaultValue={eventDate}
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
