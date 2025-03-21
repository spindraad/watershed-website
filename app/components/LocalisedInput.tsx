import { ComponentProps, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { ReactWebComponent } from '@lit/react';
import {
  SlChangeEvent,
  SlInput as SlInputComponent,
} from '@shoelace-style/shoelace';
import { SlInputEventHandlers } from '~/types/Input';
import { SupportedLanguages } from '~/config/i18n';
import LocaleSelector from '~/components/LocaleSelector';

type Props = Omit<
  ComponentProps<ReactWebComponent<SlInputComponent>>,
  | 'onSlBlur'
  | 'onSlChange'
  | 'onSlClear'
  | 'onSlFocus'
  | 'onSlInput'
  | 'onSlInvalid'
  | 'value'
> &
  SlInputEventHandlers & {
    errors?: Partial<Record<SupportedLanguages, string[]>>;
    selectedLocale?: SupportedLanguages;
    value?: Partial<Record<SupportedLanguages, string>>;
  };

export default function LocalisedInput({
  errors,
  id = '',
  name = '',
  className = '',
  'aria-invalid': ariaInvalid = !!errors,
  selectedLocale = 'nl',
  label = '',
  ...inputProps
}: Props) {
  const { t } = useTranslation('LocalisedInput');
  const { SlInput, SlAlert } = useContext(ShoelaceContext);

  const [currentLocale, setCurrentLocale] =
    useState<SupportedLanguages>(selectedLocale);
  const [value, setValue] = useState<Record<SupportedLanguages, string>>({
    nl: inputProps?.value?.nl ?? '',
    en: inputProps?.value?.en ?? '',
    pap: inputProps?.value?.pap ?? '',
  });

  function handleLocaleSelect(locale: SupportedLanguages) {
    setCurrentLocale(locale);
  }

  function handleValueChange(event: SlChangeEvent) {
    setValue({
      ...value,
      [currentLocale]: event.detail.value,
    });
  }

  const currentLocaleHasError = !!errors?.[currentLocale]?.length;
  const errorsExist = Object.values(errors ?? {}).some((error) => error.length);
  const errorsByLocale = Object.entries(errors ?? {}).reduce<
    Record<string, number>
  >((acc, [locale, error]) => {
    acc[locale] = error.length;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-end">
        <SlInput
          {...inputProps}
          type="text"
          label={`${label} (${t(`Locales.${currentLocale}`)})`}
          id={id}
          name={name}
          className={`${className} ${currentLocaleHasError ? 'part-[base]:border-red-300' : ''}`}
          value={value[currentLocale]}
          onSlChange={handleValueChange}
          aria-invalid={ariaInvalid}
          aria-describedby={errors ? `${id}-error` : undefined}
        ></SlInput>
        <LocaleSelector
          captionType="none"
          onLocaleSelect={handleLocaleSelect}
          selectedLocale={currentLocale}
          captionBadge={errorsExist ? '•' : undefined}
          localeBadges={errorsByLocale}
        />
      </div>
      <SlAlert id={`${id}-error`} open={currentLocaleHasError} variant="danger">
        {errors?.[currentLocale]?.join(', ')}
      </SlAlert>
      <input type="hidden" name={`${name}.nl`} value={value.nl} />
      <input type="hidden" name={`${name}.en`} value={value.en} />
      <input type="hidden" name={`${name}.pap`} value={value.pap} />
    </div>
  );
}
