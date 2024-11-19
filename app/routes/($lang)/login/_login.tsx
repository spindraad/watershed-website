import { useTranslation } from 'react-i18next';
import LoginFormComponent from './LoginFormComponent';

export default function LoginRoute() {
  const { t } = useTranslation('login');

  return (
    <div className="content">
      <h1>{t('title')}</h1>

      <div className="w-full max-w-lg">
        <LoginFormComponent action="/login" />
      </div>
    </div>
  );
}
