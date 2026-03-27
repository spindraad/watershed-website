import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import { ErrorResponse } from '~/types/Validations';
import {
  CandyShopCategoryErrors,
  CandyShopCategoryValidator,
} from '~/validations/models/candyShopCategory';
import LocalisedInput from '~/components/LocalisedInput';
import { DeepPartial } from '~/types/DeepPartial';

type Props = DeepPartial<CandyShopCategoryValidator> & {
  id?: string;
};

export default function CandyShopCategoryMutationForm({
  id = '',
  ...initialValues
}: Props) {
  const { t } = useTranslation('CandyShopCategoryMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher =
    useFetcher<
      ErrorResponse<CandyShopCategoryErrors, CandyShopCategoryValidator>
    >();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const content = fetcher.data?.data || initialValues;

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  return (
    <fetcher.Form
      name="candy-shop-category-form"
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

      <LocalisedInput
        label={t('Labels.Description')}
        name="description"
        id="description"
        value={content?.description}
        errors={errors?.description}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
