import { useFetcher } from 'react-router';
import { Puck } from '@measured/puck';
import { ComponentProps, useContext } from 'react';
// import { useTranslation } from 'react-i18next';
import { DeepPartial } from '~/types/DeepPartial';
import { PageErrors, PageValidator } from '~/validations/models/page';
import { ErrorResponse } from '~/types/Validations';
import PageEditor from '~/components/PageEditor';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';

type Props = DeepPartial<PageValidator> & {
  id?: string;
};

type OnPublishFn = ComponentProps<typeof Puck>['onPublish'];

export default function PageMutationForm({ id = '', ...initialValues }: Props) {
  const { t } = useTranslation('PageMutationForm');
  const { SlAlert } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<PageErrors, PageValidator>>();

  const isSubmitting = fetcher.state !== 'idle';
  const errors = fetcher.data?.errors;
  const content = fetcher.data?.data?.content || initialValues?.content;

  const handleSubmit: OnPublishFn = (data) => {
    const formData = new FormData();
    formData.append('content.nl', JSON.stringify(data));
    formData.append('content.en', JSON.stringify(data));
    formData.append('content.pap', JSON.stringify(data));
    formData.append('slug', 'test-slug');

    console.log('formData', formData);
    fetcher.submit(formData, {
      method: id ? 'PUT' : 'POST',
    });
  };

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  console.log('status', fetcher.state);

  return (
    <>
      <SlAlert variant="danger" open={!!errors}>
        {Object.values(errors || []).map((error, index) => (
          <div key={`error-${index}`}>{t(`Error.${error}`)}</div>
        ))}
      </SlAlert>

      <PageEditor
        onPublish={handleSubmit}
        isSaving={isSubmitting}
        title={t(titleTranslationKey)}
        data={content?.nl}
      />
    </>
  );
}
