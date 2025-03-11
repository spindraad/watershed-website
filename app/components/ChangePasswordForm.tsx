import { useTranslation } from 'react-i18next';
import { Form } from 'react-router';
import Input from '~/components/Input';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import { ValidationErrors } from '~/validations/flows/change-password';

type Props = {
  /**
   * The form's action
   */
  action: string;

  /**
   * The reset token
   */
  token?: string;

  /**
   * The user's email address
   */
  emailAddress?: string;

  /**
   * Errors that occurred during the form submission
   */
  errors?: ValidationErrors;
};

export default function ChangePasswordForm({
  action,
  emailAddress,
  token,
  errors,
}: Props) {
  const { SlButton } = useContext(ShoelaceContext);
  const { t } = useTranslation('ChangePasswordFormComponent');

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
      {token ?
        <input type="hidden" name="token" value={token} />
      : null}

      {emailAddress ?
        <input type="hidden" name="emailaddress" value={emailAddress} />
      : <Input
          type="email"
          name="emailaddress"
          label={t('EmailInputLabel')}
          error={errors?.emailaddress
            ?.map((error) => t(`Errors.emailaddress.${error.errorCode}`))
            .join(', ')}
        />
      }

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
