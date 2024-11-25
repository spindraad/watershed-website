import { useTranslation } from 'react-i18next';
import { Form } from '@remix-run/react';
import Input from '~/components/Input';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import { ValidationErrors } from '~/validations/flows/reset-password';

type Props = {
  /**
   * The form's action
   */
  action: string;

  /**
   * The reset token
   */
  token: string;

  /**
   * Errors that occurred during the form submission
   */
  errors?: ValidationErrors;
};

export default function ResetPasswordForm({ action, token, errors }: Props) {
  const { SlButton } = useContext(ShoelaceContext);
  const { t } = useTranslation('ResetPasswordFormComponent');

  const parseConfirmPasswordErrors = (errors?: ValidationErrors) => {
    return errors?.confirmPassword
      ?.map((error) => {
        if (error.errorCode === 'custom') {
          return t(`Errors.confirmPassword.${error.message}`);
        }

        return t(`Errors.confirmPassword.${error.errorCode}`);
      })
      .join(', ');
  };

  return (
    <Form
      className="flex flex-col gap-4"
      action={`${action}?token=${token}`}
      method="post"
      noValidate
    >
      <input type="hidden" name="token" value={token} />

      <Input
        type="password"
        name="new-password"
        autocomplete="new-password"
        label={t('PasswordInputLabel')}
        error={errors?.password
          ?.map((error) => t(`Errors.password.${error.errorCode}`))
          .join(', ')}
      />

      <Input
        type="password"
        name="new-password-confirm"
        autocomplete="new-password"
        label={t('RepeatPasswordInputLabel')}
        error={parseConfirmPasswordErrors(errors)}
      />

      <SlButton className="self-end" variant="primary" type="submit">
        {t('SubmitButton')}
      </SlButton>
    </Form>
  );
}
