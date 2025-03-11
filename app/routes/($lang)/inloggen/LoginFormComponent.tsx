import { useContext } from 'react';
import { Form, useNavigation, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import Input from '~/components/Input';
import Anchor from '~/components/Anchor';
import { ValidationResult, ValidationErrors } from '~/validations/flows/login';

type Props = {
  /**
   * The action attribute of the form.
   */
  action: string;

  /**
   * The errors to display in the form.
   */
  errors?: ValidationErrors & {
    userNotFound?: string;
  };

  /**
   * The possible values of the form.
   */
  values?: ValidationResult;
};

export default function LoginFormComponent({ action, errors, values }: Props) {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/account';
  const navigation = useNavigation();

  const { SlButton, SlCheckbox, SlAlert } = useContext(ShoelaceContext);

  const { t } = useTranslation('LoginFormComponent');

  const isPending = navigation.state !== 'idle';

  return (
    <Form
      noValidate
      className="flex flex-col gap-4"
      action={action}
      method="POST"
    >
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <Input
        autocomplete="email"
        name="emailaddress"
        type="email"
        label={t('Email')}
        value={values?.emailaddress ?? ''}
        error={errors?.emailaddress
          ?.map((error) => t(`Errors.emailaddress.${error.errorCode}`))
          .join(', ')}
      />

      <Input
        autocomplete="current-password"
        name="password"
        type="password"
        label={t('Password')}
        passwordToggle
        value={values?.password ?? ''}
        error={errors?.password
          ?.map((error) => t(`Errors.password.${error.errorCode}`))
          .join(', ')}
      />

      <SlAlert variant="danger" open={!!errors?.userNotFound}>
        {t(`Errors.userNotFound.${errors?.userNotFound}`)}
      </SlAlert>

      <div className="flex justify-between">
        <SlCheckbox name="remember">{t('Remember me')}</SlCheckbox>

        <div className="flex flex-col items-center gap-2">
          <SlButton
            className="w-full"
            loading={isPending}
            variant="primary"
            type="submit"
          >
            {t('Login')}
          </SlButton>

          <Anchor to="/wachtwoord-vergeten" className="text-sm">
            {t('forgotPassword')}
          </Anchor>
        </div>
      </div>
    </Form>
  );
}
