import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
  itemName: string;
  isDeleting?: boolean;
};

export default function ConfirmDeleteDialog({
  open,
  onDelete,
  onCancel,
  itemName,
  isDeleting,
}: Props) {
  const { t } = useTranslation('ConfirmDeleteDialog');
  const { SlDialog, SlButton } = useContext(ShoelaceContext);

  return (
    <SlDialog label={t('Title')} open={open} onSlAfterHide={onCancel}>
      <p>{t('Message', { itemName })}</p>

      <div className="flex flex-row gap-4 justify-end" slot="footer">
        <SlButton type="button" onClick={onCancel}>
          {t('Cancel')}
        </SlButton>
        <SlButton
          disabled={isDeleting}
          loading={isDeleting}
          type="button"
          variant="primary"
          onClick={onDelete}
        >
          {t('Delete')}
        </SlButton>
      </div>
    </SlDialog>
  );
}
