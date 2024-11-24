import { useTranslation } from 'react-i18next';
import LoginFormComponent from './LoginFormComponent';
import { MetaFunction } from '@remix-run/node';
import Heading from '~/components/Heading';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Login',
      description: 'Login to your account',
    },
  ];
};

export default function LoginRoute() {
  const { t } = useTranslation('login');

  return (
    <div className="content">
      <Heading level={1}>{t('title')}</Heading>

      <div className="w-full max-w-lg">
        <LoginFormComponent action="/login" />
      </div>
    </div>
  );
}
