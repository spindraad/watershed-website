import { useContext } from 'react';
import { Form, Link, useSearchParams } from '@remix-run/react';
import { ShoelaceContext } from '~/components/shoelace';
import { useTranslation } from 'react-i18next';

export default function LoginFormComponent() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/admin';

  const { SlInput, SlButton, SlCheckbox } = useContext(ShoelaceContext);

  const { t } = useTranslation('LoginFormComponent');
  return (
    <Form className="flex flex-col gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <SlInput name="email" type="email" label={t('Email')} required />
      <SlInput
        name="password"
        type="password"
        label={t('Password')}
        required
        passwordToggle
      />

      <div className="flex justify-between">
        <SlCheckbox name="remember">{t('Remember me')}</SlCheckbox>

        <div className="flex flex-col items-center gap-2">
          <SlButton variant="primary" type="submit">
            {t('Login')}
          </SlButton>

          <Link to="/forgot-password" className="text-sm">
            {t('Forgot password?')}
          </Link>
        </div>
      </div>
    </Form>
  );
}
