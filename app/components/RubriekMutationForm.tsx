import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import { ErrorResponse } from '~/types/Validations';
import { RubriekErrors, RubriekValidator } from '~/validations/models/rubriek';
import LocalisedInput from '~/components/LocalisedInput';
import LocalisedRichTextEditor from '~/components/LocalisedRichTextEditor';
import ImageSelectionField from '~/components/ImageSelectionField';
import ContentSelectionField from '~/components/ContentSelectionField';
import { DeepPartial } from '~/types/DeepPartial';
import { RubriekCategory } from '@prisma/client';

type Props = DeepPartial<Omit<RubriekValidator, 'categoryId'>> & {
  id?: string;
  categories?: RubriekCategory[];
  categoryId?: string;
};

export default function RubriekMutationForm({
  id = '',
  categories = [],
  categoryId = '',
  ...initialValues
}: Props) {
  const { t } = useTranslation('RubriekMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<RubriekErrors, RubriekValidator>>();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const content = fetcher.data?.data || initialValues;

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  return (
    <fetcher.Form name="rubriek-form" className="space-y-4" method="post">
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

      <ImageSelectionField
        id="image"
        name="image"
        label={t('Labels.Image')}
        value={{
          url: content?.image?.url || '',
          alt: content?.image?.alt || '',
        }}
        errors={{
          url: errors?.image?.url?._errors,
          alt: errors?.image?.alt?._errors,
        }}
      />

      <LocalisedRichTextEditor
        id="content"
        name="content"
        label={t('Labels.Content')}
        value={content?.content}
        errors={errors?.content}
      />

      <ContentSelectionField
        id="category"
        name="categoryId"
        label={t('Labels.Category')}
        contentLibrary={categories}
        selectedIds={categoryId ? [categoryId] : []}
        displayField="title"
        multiSelect={false}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
