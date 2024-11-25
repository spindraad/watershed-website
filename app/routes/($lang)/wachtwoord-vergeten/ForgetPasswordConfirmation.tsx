import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';

export default function ForgetPasswordConfirmation() {
  const { t } = useTranslation('ForgetPasswordConfirmationComponent');

  return (
    <div className="content space-y-4">
      <Heading level={1}>{t('Title')}</Heading>

      <p>{t('ConfirmationMessage')}</p>
    </div>
  );
}
