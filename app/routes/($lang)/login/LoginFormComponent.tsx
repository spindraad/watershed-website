import { useContext } from 'react';
import { Form, Link, useNavigation, useSearchParams } from '@remix-run/react';
import { ShoelaceContext } from '~/components/shoelace';
import { useTranslation } from 'react-i18next';

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

  const { SlInput, SlButton, SlCheckbox, SlAlert } =
    useContext(ShoelaceContext);

  const { t } = useTranslation('LoginFormComponent');

  const isPending = navigation.state !== 'idle';

  return (
    <Form className="flex flex-col gap-4" action={action} method="POST">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <SlInput
        className={`${errors?.emailaddress ? 'part-[base]:border-red-300' : ''}`}
        name="email"
        type="email"
        label={t('Email')}
        value={values?.emailaddress ?? ''}
        required
        aria-invalid={!!errors?.emailaddress}
        aria-describedby="emailaddress-error"
      />
      <SlAlert
        id="emailaddress-error"
        open={!!errors?.emailaddress}
        variant="danger"
      >
        {errors?.emailaddress}
      </SlAlert>

      <SlInput
        className={`${errors?.emailaddress ? 'part-[base]:border-red-300' : ''}`}
        name="password"
        type="password"
        value={values?.password ?? ''}
        label={t('Password')}
        required
        passwordToggle
        aria-invalid={!!errors?.password}
        aria-describedby="password-error"
      />
      <SlAlert id="password-error" open={!!errors?.password} variant="danger">
        {errors?.password}
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

          <Link to="/forgot-password" className="text-sm">
            {t('Forgot password?')}
          </Link>
        </div>
      </div>
    </Form>
  );
}
