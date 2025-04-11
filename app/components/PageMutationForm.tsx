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
import { WatershedPageConfig } from '~/config/puck.config';

type Props = DeepPartial<PageValidator> & {
  id?: string;
};

type OnPublishFn = ComponentProps<
  typeof Puck<WatershedPageConfig>
>['onPublish'];

export default function PageMutationForm({ id = '', ...initialValues }: Props) {
  const { t } = useTranslation('PageMutationForm');
  const fetcher = useFetcher<ErrorResponse<PageErrors, PageValidator>>();

  const handleSubmit: OnPublishFn = (data) => {
    const formData = new FormData();
    formData.append('content.nl', JSON.stringify(data));
    formData.append('content.en', JSON.stringify(data));
    formData.append('content.pap', JSON.stringify(data));
    formData.append('slug', data.root.props?.slug ?? '');

    fetcher.submit(formData, {
      method: id ? 'PUT' : 'POST',
    });
  };

  let titleTranslationKey = 'Title.New';
  if (id) {
    titleTranslationKey = 'Title.Edit';
  }

  const isSubmitting = fetcher.state !== 'idle';
  const content = fetcher.data?.data?.content || initialValues?.content;
  const errors = fetcher.data?.errors;

  return (
    <>
      <FormErrors errors={errors} />

      <PageEditor
        onPublish={handleSubmit}
        isSaving={isSubmitting}
        title={t(titleTranslationKey)}
        data={content?.nl}
      />
    </>
  );
}

type FieldError = { field: string; message: string };

function FormErrors({ errors }: { errors?: PageErrors }) {
  const { SlAlert } = useContext(ShoelaceContext);
  let messages: FieldError[] = [];

  if (errors) {
    messages = Object.keys(errors).reduce<FieldError[]>((acc, field) => {
      let errorMessage = '';
      const error = errors[field as keyof PageErrors];

      if (!error) {
        return acc;
      }

      if ('_errors' in error) {
        errorMessage = error._errors.join(', ');
      } else if (Array.isArray(error)) {
        errorMessage = error.join(', ');
      } else {
        errorMessage = error;
      }

      if (!errorMessage) {
        return acc;
      }

      return [...acc, { field, message: errorMessage }];
    }, []);
  }

  return (
    <SlAlert variant="danger" open={!!messages.length}>
      <ul>
        {messages.map(({ field, message }, index) => (
          <li key={`error-${index}`}>
            Fout bij veld {field}: {message}
          </li>
        ))}
      </ul>
    </SlAlert>
  );
}
