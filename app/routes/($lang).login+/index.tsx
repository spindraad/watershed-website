import { useTranslation } from 'react-i18next';

export default function LoginRoute() {
  const { t } = useTranslation('login');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
