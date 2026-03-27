import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import { MakerErrors, MakerValidator } from '~/validations/models/maker';
import LocalisedInput from '~/components/LocalisedInput';
import LocalisedRichTextEditor from '~/components/LocalisedRichTextEditor';
import ImageSelectionField from '~/components/ImageSelectionField';
import ContentSelectionField from '~/components/ContentSelectionField';
import { DeepPartial } from '~/types/DeepPartial';
import { TalentProgram } from '@prisma/client';

type Props = DeepPartial<Omit<MakerValidator, 'talentProgramIds'>> & {
  id?: string;
  talentPrograms?: TalentProgram[];
  selectedTalentProgramIds?: string[];
};

export default function MakerMutationForm({
  id = '',
  talentPrograms = [],
  selectedTalentProgramIds = [],
  ...initialValues
}: Props) {
  const { t } = useTranslation('MakerMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<MakerErrors, MakerValidator>>();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const content = fetcher.data?.data || initialValues;

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  return (
    <fetcher.Form name="maker-form" className="space-y-4" method="post">
      <div className="flex flex-row justify-between items-center">
        <Heading level={1}>{t(titleTranslationKey)}</Heading>
      </div>

      {id ?
        <input type="hidden" name="id" value={id} />
      : null}

      <Input
        label={t('Labels.Name')}
        name="name"
        id="name"
        type="text"
        value={content?.name || ''}
        error={errors?.name?._errors}
      />

      <Input
        label={t('Labels.Slug')}
        name="slug"
        id="slug"
        type="text"
        value={content?.slug || ''}
        error={errors?.slug?._errors}
      />

      <LocalisedInput
        label={t('Labels.Profession')}
        name="profession"
        id="profession"
        value={content?.profession}
        errors={errors?.profession}
      />

      <LocalisedInput
        label={t('Labels.Summary')}
        name="summary"
        id="summary"
        value={content?.summary}
        errors={errors?.summary}
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

      {talentPrograms.length > 0 && (
        <ContentSelectionField
          id="talentPrograms"
          name="talentProgramIds"
          label={t('Labels.TalentPrograms')}
          contentLibrary={talentPrograms}
          selectedIds={selectedTalentProgramIds}
          displayField="title"
          multiSelect
        />
      )}

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
