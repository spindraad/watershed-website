import { useContext } from 'react';
import { Form, useNavigation, useSearchParams } from '@remix-run/react';
import { ShoelaceContext } from '~/components/shoelace';
import { useTranslation } from 'react-i18next';
import Input from '~/components/Input';
import Anchor from '~/components/Anchor';

type Props = {
  /**
   * The action attribute of the form.
   */
  action: string;

  /**
   * The errors to display in the form.
   */
  errors?: LoginFormErrors;

  /**
   * The possible values of the form.
   */
  values?: LoginFormValues;
};

type LoginFormValues = {
  emailaddress?: string;
  password?: string;
  remember?: boolean;
};

type LoginFormErrors = {
  emailaddress?: string;
  password?: string;
};

export default function LoginFormComponent({ action, errors, values }: Props) {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';
  const navigation = useNavigation();

  const { SlButton, SlCheckbox } = useContext(ShoelaceContext);

  const { t } = useTranslation('LoginFormComponent');

  const isPending = navigation.state !== 'idle';

  return (
    <Form className="flex flex-col gap-4" action={action} method="POST">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <Input
        name="email"
        type="email"
        label={t('Email')}
        value={values?.emailaddress ?? ''}
        required
        error={errors?.emailaddress}
      />

      <Input
        name="password"
        type="password"
        label={t('Password')}
        required
        passwordToggle
        value={values?.password ?? ''}
        error={errors?.password}
      />

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

          <Anchor to="/forgot-password" className="text-sm">
            {t('Forgot password?')}
          </Anchor>
        </div>
      </div>
    </Form>
  );
}
