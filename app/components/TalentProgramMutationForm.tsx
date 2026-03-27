import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import {
  TalentProgramErrors,
  TalentProgramValidator,
} from '~/validations/models/talentProgram';
import LocalisedInput from '~/components/LocalisedInput';
import LocalisedRichTextEditor from '~/components/LocalisedRichTextEditor';
import ImageSelectionField from '~/components/ImageSelectionField';
import ContentSelectionField from '~/components/ContentSelectionField';
import { DeepPartial } from '~/types/DeepPartial';
import { Maker } from '@prisma/client';

type Props = DeepPartial<Omit<TalentProgramValidator, 'makerIds'>> & {
  id?: string;
  makers?: Maker[];
  selectedMakerIds?: string[];
};

export default function TalentProgramMutationForm({
  id = '',
  makers = [],
  selectedMakerIds = [],
  ...initialValues
}: Props) {
  const { t } = useTranslation('TalentProgramMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher =
    useFetcher<ErrorResponse<TalentProgramErrors, TalentProgramValidator>>();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const content = fetcher.data?.data || initialValues;

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  return (
    <fetcher.Form
      name="talent-program-form"
      className="space-y-4"
      method="post"
    >
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

      <Input
        label={t('Labels.Duration')}
        name="duration"
        id="duration"
        type="text"
        value={content?.duration || ''}
        error={errors?.duration?._errors}
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

      {makers.length > 0 && (
        <ContentSelectionField
          id="makers"
          name="makerIds"
          label={t('Labels.Makers')}
          contentLibrary={makers}
          selectedIds={selectedMakerIds}
          displayField="name"
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
