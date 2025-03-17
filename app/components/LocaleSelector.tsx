import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  /**
   * Callback function that is called when a locale is selected.
   * @param locale
   */
  onLocaleSelect?: (locale: string) => void;

  /**
   * Whether to emit a change language event to the app (changes the app's locale).
   */
  emitChangeLanguage?: boolean;

  /**
   * The currently selected locale.
   */
  selectedLocale?: string;

  /**
   * Whether to show the selected locale in the button caption.
   */
  showSelectedLocale?: boolean;
};

export default function LocaleSelector({
  onLocaleSelect,
  emitChangeLanguage,
  selectedLocale,
  showSelectedLocale,
}: Props) {
  const { t, i18n } = useTranslation('LocaleSelector');
  const { SlButton, SlIcon, SlDropdown, SlMenu, SlMenuItem } =
    useContext(ShoelaceContext);

  const handleLocaleSelect = (event: CustomEvent) => {
    const locale = event.detail.item.value;

    if (emitChangeLanguage) {
      i18n.changeLanguage(locale).catch((error) => {
        console.error(error);
      });
    }

    if (onLocaleSelect) {
      onLocaleSelect(locale);
    }
  };

  return (
    <SlDropdown>
      <SlButton slot="trigger" type="button" caret>
        <SlIcon name="globe-europe-africa" slot="prefix" />
        {showSelectedLocale ?
          t(`Locales.${selectedLocale}`)
        : t('ButtonCaption')}
      </SlButton>

      <SlMenu onSlSelect={handleLocaleSelect}>
        <SlMenuItem
          type="checkbox"
          checked={selectedLocale === 'nl'}
          value="nl"
        >
          {t('Locales.nl')}
        </SlMenuItem>
        <SlMenuItem
          type="checkbox"
          checked={selectedLocale === 'en'}
          value="en"
        >
          {t('Locales.en')}
        </SlMenuItem>
        <SlMenuItem
          type="checkbox"
          checked={selectedLocale === 'pap'}
          value="pap"
        >
          {t('Locales.pap')}
        </SlMenuItem>
      </SlMenu>
    </SlDropdown>
  );
}
