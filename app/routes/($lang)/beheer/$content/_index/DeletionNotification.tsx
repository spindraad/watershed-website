import { ForwardedRef, forwardRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { SlAlert } from '@shoelace-style/shoelace';

type Props = {
  itemName: string;
  onClose: () => void;
};

const DeletionNotification = forwardRef(
  ({ itemName, onClose }: Props, ref: ForwardedRef<SlAlert>) => {
    const { t } = useTranslation('DeletionNotification');
    const { SlAlert, SlIcon } = useContext(ShoelaceContext);

    return (
      <SlAlert
        ref={ref}
        variant="danger"
        countdown="rtl"
        duration={2000}
        onSlAfterHide={onClose}
      >
        <SlIcon slot="icon" name="exclamation-octagon" />
        <p className="font-bold">{t('Title')}</p>

        <p>{t('Message', { itemName })}</p>
      </SlAlert>
    );
  },
);

DeletionNotification.displayName = 'DeletionNotification';

export default DeletionNotification;
