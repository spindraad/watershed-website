import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { SupportedLanguages } from '~/config/i18n';

type Props = {
  /**
   * Callback function that is called when a locale is selected.
   * @param locale
   */
  onLocaleSelect?: (locale: SupportedLanguages) => void;

  /**
   * Whether to emit a change language event to the app (changes the app's locale).
   */
  emitChangeLanguage?: boolean;

  /**
   * The currently selected locale.
   */
  selectedLocale?: SupportedLanguages;

  /**
   * Which caption to show in the button.
   */
  captionType?: 'default' | 'selected' | 'custom' | 'none';

  /**
   * If `captionType` is `custom`, the custom caption to show in the button.
   */
  buttonCaption?: string;

  /**
   * Badge to display in the button caption.
   */
  captionBadge?: string | number;

  /**
   * Badges to display in the locale list
   */
  localeBadges?: Record<string, string | number>;

  /**
   * The slot to render the component in.
   */
  slot?: string;

  /**
   * Whether to render the component inline (without borders and captions).
   */
  inline?: boolean;

  /**
   * Whether to hoist the dropdown menu to the body.
   */
  hoist?: boolean;
};

export default function LocaleSelector({
  onLocaleSelect,
  emitChangeLanguage,
  selectedLocale,
  captionType = 'default',
  buttonCaption = '',
  captionBadge,
  localeBadges,
  slot = '',
  inline = false,
  hoist = false,
}: Props) {
  const { t, i18n } = useTranslation('LocaleSelector');
  const { SlButton, SlIcon, SlDropdown, SlMenu, SlMenuItem, SlBadge } =
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

  let caption;
  switch (captionType) {
    case 'default':
      caption = t('ButtonCaption');
      break;
    case 'selected':
      caption = t(`Locales.${selectedLocale}`);
      break;
    case 'custom':
      caption = buttonCaption;
      break;
    case 'none':
      caption = '';
      break;
  }

  return (
    <SlDropdown slot={slot} hoist={hoist}>
      <SlButton
        className={
          inline || captionType === 'none' ? 'inline-locale-selector' : ''
        }
        slot="trigger"
        type="button"
        variant={inline ? 'text' : 'default'}
        caret
      >
        <SlIcon name="globe-europe-africa" slot="prefix" />
        {caption ? caption : null}

        {captionBadge ?
          <SlBadge variant="danger" pill>
            {captionBadge}
          </SlBadge>
        : null}
      </SlButton>

      <SlMenu onSlSelect={handleLocaleSelect}>
        <SlMenuItem
          type="checkbox"
          checked={selectedLocale === 'nl'}
          value="nl"
        >
          {t('Locales.nl')}
          {localeBadges?.nl ?
            <SlBadge slot="suffix" variant="danger" pill>
              {localeBadges.nl}
            </SlBadge>
          : null}
        </SlMenuItem>
        <SlMenuItem
          type="checkbox"
          checked={selectedLocale === 'en'}
          value="en"
        >
          {t('Locales.en')}
          {localeBadges?.en ?
            <SlBadge slot="suffix" variant="danger" pill>
              {localeBadges.en}
            </SlBadge>
          : null}
        </SlMenuItem>
        <SlMenuItem
          type="checkbox"
          checked={selectedLocale === 'pap'}
          value="pap"
        >
          {t('Locales.pap')}
          {localeBadges?.pap ?
            <SlBadge slot="suffix" variant="danger" pill>
              {localeBadges.pap}
            </SlBadge>
          : null}
        </SlMenuItem>
      </SlMenu>
    </SlDropdown>
  );
}
