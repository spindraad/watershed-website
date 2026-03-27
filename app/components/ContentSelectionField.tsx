import { useContext, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';

type ContentItem = {
  id: string;
  [key: string]: unknown;
};

type Props<T extends ContentItem> = {
  /**
   * The id of the field.
   */
  id: string;

  /**
   * The name used for form submission.
   */
  name: string;

  /**
   * The label for the field.
   */
  label: string;

  /**
   * Pre-fetched content library.
   */
  contentLibrary: T[];

  /**
   * Currently selected item IDs.
   */
  selectedIds: string[];

  /**
   * Field to display in the list.
   */
  displayField: keyof T;

  /**
   * Fields to search/filter on.
   */
  searchFields?: (keyof T)[];

  /**
   * Allow multiple selection.
   */
  multiSelect?: boolean;

  /**
   * Callback when selection changes.
   */
  onChange?: (ids: string[]) => void;
};

export default function ContentSelectionField<T extends ContentItem>({
  name,
  label,
  contentLibrary,
  selectedIds: initialSelectedIds,
  displayField,
  searchFields = [],
  multiSelect = true,
  onChange,
}: Props<T>) {
  const { t } = useTranslation('ContentSelectionField');
  const { SlButton, SlDialog, SlInput, SlIcon, SlTag } =
    useContext(ShoelaceContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedItems = useMemo(() => {
    return contentLibrary.filter((item) => selectedIds.includes(item.id));
  }, [contentLibrary, selectedIds]);

  const availableItems = useMemo(() => {
    return contentLibrary.filter((item) => !selectedIds.includes(item.id));
  }, [contentLibrary, selectedIds]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return availableItems;

    const lowerSearch = searchTerm.toLowerCase();
    return availableItems.filter((item) => {
      const fieldsToSearch =
        searchFields.length > 0 ? searchFields : [displayField];
      return fieldsToSearch.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerSearch);
        }
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some(
            (v) =>
              typeof v === 'string' && v.toLowerCase().includes(lowerSearch),
          );
        }
        return false;
      });
    });
  }, [availableItems, searchTerm, searchFields, displayField]);

  function handleSelect(item: T) {
    let newIds: string[];
    if (multiSelect) {
      newIds = [...selectedIds, item.id];
    } else {
      newIds = [item.id];
      setDialogOpen(false);
    }
    setSelectedIds(newIds);
    onChange?.(newIds);
  }

  function handleRemove(itemId: string) {
    const newIds = selectedIds.filter((id) => id !== itemId);
    setSelectedIds(newIds);
    onChange?.(newIds);
  }

  function getDisplayValue(item: T): string {
    const value = item[displayField];
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return (
        (value as Record<string, string>)['nl'] ||
        (value as Record<string, string>)['en'] ||
        Object.values(value)[0] ||
        ''
      );
    }
    return String(value);
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium text-gray-700">{label}</label>

      <div className="flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <SlTag
            key={item.id}
            size="medium"
            removable
            onSlRemove={() => handleRemove(item.id)}
          >
            {getDisplayValue(item)}
          </SlTag>
        ))}

        <SlButton size="small" onClick={() => setDialogOpen(true)}>
          <SlIcon name="plus" slot="prefix" />
          {t('AddButton')}
        </SlButton>
      </div>

      <SlDialog
        open={dialogOpen}
        label={t('DialogTitle')}
        onSlRequestClose={() => setDialogOpen(false)}
        style={{ '--width': '500px' } as React.CSSProperties}
      >
        <div className="flex flex-col gap-4">
          <SlInput
            placeholder={t('SearchPlaceholder')}
            value={searchTerm}
            onSlInput={(e: CustomEvent) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
          >
            <SlIcon name="search" slot="prefix" />
          </SlInput>

          <div className="max-h-64 overflow-y-auto">
            {filteredItems.length > 0 ?
              <ul className="divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      {getDisplayValue(item)}
                    </button>
                  </li>
                ))}
              </ul>
            : <div className="text-center py-8 text-gray-500">
                {t('NoResults')}
              </div>
            }
          </div>
        </div>

        <SlButton
          slot="footer"
          variant="default"
          onClick={() => setDialogOpen(false)}
        >
          {t('CloseButton')}
        </SlButton>
      </SlDialog>

      <input type="hidden" name={name} value={selectedIds.join(',')} />
    </div>
  );
}
