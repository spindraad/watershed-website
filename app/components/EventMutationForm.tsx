import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import { EventErrors, EventValidator } from '~/validations/models/event';
import LocalisedInput from '~/components/LocalisedInput';
import LocalisedRichTextEditor from '~/components/LocalisedRichTextEditor';
import ImageSelectionField from '~/components/ImageSelectionField';
import ContentSelectionField from '~/components/ContentSelectionField';
import { DeepPartial } from '~/types/DeepPartial';
import DateInput from '~/components/DateInput';
import type { Maker } from '~/models/makers.server';

type Props = DeepPartial<Omit<EventValidator, 'eventDate' | 'organiser'>> & {
  id?: string;
  eventDate?: Date;
  organiser?: string | null;
  makers?: Maker[];
  selectedMakerIds?: string[];
};

export default function EventMutationForm({
  id = '',
  makers = [],
  selectedMakerIds = [],
  ...initialValues
}: Props) {
  const { t } = useTranslation('EventMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<EventErrors, EventValidator>>();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const formContent = fetcher.data?.data || initialValues;

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  return (
    <fetcher.Form name="event-form" className="space-y-4" method="post">
      <div className="flex flex-row justify-between items-center">
        <Heading level={1}>{t(titleTranslationKey)}</Heading>
      </div>

      {id ?
        <input type="hidden" name="id" value={id} />
      : null}

      <LocalisedInput
        label={t('Labels.Title')}
        name="title"
        id="title"
        value={formContent?.title}
        errors={errors?.title}
      />

      <LocalisedInput
        label={t('Labels.Description')}
        name="description"
        id="description"
        value={formContent?.description}
        errors={errors?.description}
      />

      <ImageSelectionField
        id="image"
        name="image"
        label={t('Labels.Image')}
        value={formContent?.image}
        errors={errors?.image}
      />

      <Input
        label={t('Labels.Address')}
        name="address"
        id="address"
        type="text"
        value={formContent?.address || ''}
        error={errors?.address?._errors}
      />

      <Input
        label={t('Labels.Link')}
        id="link"
        name="link"
        type="url"
        value={formContent?.link || ''}
        error={errors?.link?._errors}
      />

      <DateInput
        label={t('Labels.EventDate')}
        name="eventDate"
        id="eventDate"
        value={formContent?.eventDate || ''}
        error={errors?.eventDate?._errors}
      />

      <LocalisedRichTextEditor
        id="content"
        name="content"
        label={t('Labels.Content')}
        value={formContent?.content}
        errors={errors?.content}
      />

      <ContentSelectionField
        id="makerIds"
        name="makerIds"
        label={t('Labels.Makers')}
        contentLibrary={makers}
        selectedIds={selectedMakerIds}
        displayField="name"
        searchFields={['name']}
        multiSelect={true}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
