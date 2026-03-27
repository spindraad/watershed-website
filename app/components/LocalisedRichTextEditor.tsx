import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ZodFormattedError } from 'zod';
import { ShoelaceContext } from '~/components/shoelace';
import { SupportedLanguages } from '~/config/i18n';
import LocaleSelector from '~/components/LocaleSelector';
import RichTextEditor from '~/components/RichTextEditor';

type Props = {
  /**
   * The id of the editor.
   */
  id: string;

  /**
   * The name used for form submission.
   */
  name: string;

  /**
   * The label for the editor.
   */
  label: string;

  /**
   * The initial values per locale.
   */
  value?: Partial<Record<SupportedLanguages, string>>;

  /**
   * Validation errors per locale.
   */
  errors?: Partial<ZodFormattedError<Record<SupportedLanguages, string[]>>>;

  /**
   * The initially selected locale.
   */
  selectedLocale?: SupportedLanguages;

  /**
   * Whether to show the toolbar.
   */
  showToolbar?: boolean;

  /**
   * Custom class name for the editor container.
   */
  className?: string;
};

export default function LocalisedRichTextEditor({
  id,
  name,
  label,
  value: initialValue,
  errors,
  selectedLocale = 'nl',
  showToolbar = true,
  className = '',
}: Props) {
  const { t } = useTranslation('LocalisedRichTextEditor');
  const { SlAlert } = useContext(ShoelaceContext);

  const [currentLocale, setCurrentLocale] =
    useState<SupportedLanguages>(selectedLocale);
  const [value, setValue] = useState<Record<SupportedLanguages, string>>({
    nl: initialValue?.nl ?? '',
    en: initialValue?.en ?? '',
    pap: initialValue?.pap ?? '',
  });

  function handleLocaleSelect(locale: SupportedLanguages) {
    setCurrentLocale(locale);
  }

  function handleValueChange(content: string) {
    setValue((prev) => ({
      ...prev,
      [currentLocale]: content,
    }));
  }

  const currentLocaleHasError = !!errors?.[currentLocale]?._errors.length;
  const errorsExist = Object.values(errors ?? {}).some((error) => {
    if (Array.isArray(error)) return false;
    return error._errors.length;
  });
  const errorsByLocale = Object.entries(errors ?? {}).reduce<
    Record<string, number>
  >((acc, [locale, error]) => {
    if (Array.isArray(error)) return acc;
    acc[locale] = error._errors.length;
    return acc;
  }, {});

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-row items-center justify-between gap-2">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label} ({t(`Locales.${currentLocale}`)})
        </label>
        <LocaleSelector
          captionType="none"
          onLocaleSelect={handleLocaleSelect}
          selectedLocale={currentLocale}
          captionBadge={errorsExist ? '•' : undefined}
          localeBadges={errorsByLocale}
        />
      </div>

      <RichTextEditor
        key={currentLocale}
        id={`${id}-${currentLocale}`}
        initialValue={value[currentLocale]}
        onChange={handleValueChange}
        showToolbar={showToolbar}
        className={currentLocaleHasError ? 'border-red-300' : ''}
      />

      <SlAlert id={`${id}-error`} open={currentLocaleHasError} variant="danger">
        {errors?.[currentLocale]?._errors.join(', ')}
      </SlAlert>

      <input type="hidden" name={`${name}.nl`} value={value.nl} />
      <input type="hidden" name={`${name}.en`} value={value.en} />
      <input type="hidden" name={`${name}.pap`} value={value.pap} />
    </div>
  );
}
