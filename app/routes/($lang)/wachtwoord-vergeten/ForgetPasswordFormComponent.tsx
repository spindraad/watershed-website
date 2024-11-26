import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import Input from '~/components/Input';
import { ValidationErrors } from '~/validations/flows/forget-password';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  /**
   * The action of the form
   */
  action: string;

  /**
   * The errors to display in the form
   */
  errors?: ValidationErrors;
};

export default function ForgetPasswordFormComponent({ action, errors }: Props) {
  const { SlButton } = useContext(ShoelaceContext);
  const { t } = useTranslation('ForgotPasswordFormComponent');

  return (
    <Form
      noValidate
      className="flex flex-col gap-4"
      action={action}
      method="POST"
    >
      <p>{t('Explanation')}</p>

      <div className="w-full max-w-md flex flex-col gap-2 self-center">
        <Input
          name="emailaddress"
          type="email"
          label={t('EmailInputLabel')}
          autocomplete="email"
          error={errors?.emailaddress
            ?.map((error) => t(`Errors.emailaddress.${error.errorCode}`))
            .join(', ')}
        />

        <SlButton className="self-end" variant="primary" type="submit">
          {t('SubmitButton')}
        </SlButton>
      </div>
    </Form>
  );
}
