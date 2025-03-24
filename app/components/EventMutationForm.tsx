import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import { EventErrors, EventValidator } from '~/validations/models/event';
import LocalisedInput from '~/components/LocalisedInput';
import { DeepPartial } from '~/types/DeepPartial';

type Props = DeepPartial<EventValidator> & {
  id?: string;
};

export default function EventMutationForm({
  id = '',
  ...initialValues
}: Props) {
  const { t } = useTranslation('EventMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<EventErrors, EventValidator>>();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const content = fetcher.data?.data || initialValues;

  return (
    <fetcher.Form className="space-y-4" method="post">
      <div className="flex flex-row justify-between items-center">
        <Heading level={1}>{t('Title')}</Heading>
      </div>

      {id ?
        <input type="hidden" name="id" value={id} />
      : null}

      <LocalisedInput
        label={t('Labels.Title')}
        name="title"
        id="title"
        value={content?.title}
        errors={errors?.title}
      />

      <LocalisedInput
        label={t('Labels.Description')}
        name="description"
        id="description"
        value={content?.description}
        errors={errors?.description}
      />

      <Input
        label={t('Labels.Address')}
        name="address"
        id="address"
        type="text"
        value={content?.address || ''}
        error={errors?.address?._errors}
      />

      <Input
        label={t('Labels.Link')}
        id="link"
        name="link"
        type="url"
        value={content?.link || ''}
        error={errors?.link?._errors}
      />

      <Input
        label={t('Labels.EventDate')}
        name="eventDate"
        id="eventDate"
        type="datetime-local"
        value={content?.eventDate || ''}
        error={errors?.eventDate?._errors}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
