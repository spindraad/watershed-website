import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { useFetcher } from 'react-router';
import { ProjectErrors, ProjectValidator } from '~/validations/models/project';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import LocalisedInput from '~/components/LocalisedInput';
import LocalisedRichTextEditor from '~/components/LocalisedRichTextEditor';
import ImageSelectionField from '~/components/ImageSelectionField';
import ContentSelectionField from '~/components/ContentSelectionField';
import { DeepPartial } from '~/types/DeepPartial';
import type { Maker } from '~/models/makers.server';

type Props = DeepPartial<ProjectValidator> & {
  id?: string;
  makers?: Maker[];
  selectedMakerIds?: string[];
};

export default function ProjectMutationForm({
  id = '',
  makers = [],
  selectedMakerIds = [],
  ...initialValues
}: Props) {
  const { t } = useTranslation('ProjectMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<ProjectErrors, ProjectValidator>>();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const formContent = fetcher.data?.data || initialValues;

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  return (
    <fetcher.Form name="project-form" className="space-y-4" method="post">
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

      <LocalisedInput
        label={t('Labels.Summary')}
        name="summary"
        id="summary"
        value={formContent?.summary}
        errors={errors?.summary}
      />

      <Input
        label={t('Labels.Slug')}
        name="slug"
        id="slug"
        type="text"
        value={formContent?.slug || ''}
        error={errors?.slug?._errors}
      />

      <ImageSelectionField
        id="image"
        name="image"
        label={t('Labels.Image')}
        value={formContent?.image}
        errors={errors?.image}
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
