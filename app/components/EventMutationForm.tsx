import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import { EventErrors, EventValidator } from '~/validations/models/event';
import LocaleSelector from '~/components/LocaleSelector';
import { SupportedLanguages } from '~/config/i18n';
import { countErrorsForLocalisedFields } from '~/utils/content';
import { isLocalisedValue } from '~/types/Content';

type Props = Partial<Omit<EventValidator, 'eventDate'>> & {
  id?: string;
};

export default function EventMutationForm({
  id = '',
  ...initialValues
}: Props) {
  const { t, i18n } = useTranslation('EventMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<EventErrors, EventValidator>>();

  const [currentContentLocale, setCurrentContentLocale] =
    useState<SupportedLanguages>(i18n.language as SupportedLanguages);

  const [content, setContent] = useState<Partial<EventValidator> | undefined>(
    () => {
      if (initialValues && !!Object.values(initialValues).length)
        return initialValues;

      return undefined;
    },
  );
  const [errors, setErrors] = useState<EventErrors | undefined>();
  const [totalErrorsByLocale, setTotalErrorsByLocale] = useState<
    Record<SupportedLanguages, number>
  >({
    nl: 0,
    en: 0,
    pap: 0,
  });
  const [totalErrors, setTotalErrors] = useState(0);

  useEffect(() => {
    const cachedContent = localStorage.getItem('eventContent');
    if (cachedContent) {
      setContent(JSON.parse(cachedContent));
    }
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      const { data } = fetcher.data;

      const content = {} as EventValidator;

      Object.keys(data).forEach((key) => {
        if (key in data) {
          const value = data[key as keyof EventValidator];

          if (isLocalisedValue(value)) {
            content[key as keyof EventValidator] = value;
          } else {
            content[key as keyof EventValidator] = value.toString();
          }
        }
      });

      for (const [key, value] of Object.entries<EventValidator>(data)) {
        if (isLocalisedValue(value)) {
          content[key] = value;
        } else {
          content[key as keyof EventValidator] = value.toString();
        }
      }

      setContent(content);
    }

    if (fetcher.data?.errors) {
      setErrors(fetcher.data.errors);
      const totalErrors = countErrorsForLocalisedFields(fetcher.data.errors);
      setTotalErrorsByLocale(totalErrors);
      setTotalErrors(
        Object.values(totalErrors).reduce((acc, curr) => acc + curr, 0),
      );
    }
  }, [fetcher.data, i18n.language]);

  const isSubmitting = fetcher.state !== 'idle';

  const handleLocaleSelect = (locale: string) => {
    setCurrentContentLocale(locale as SupportedLanguages);
  };

  const handleChange = (field: keyof EventValidator, value: string) => {
    setContent((prev) => {
      const updatedData = { ...prev, [field]: value };
      localStorage.setItem('eventContent', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleLocalizedChange = (
    field: 'title' | 'description',
    locale: string,
    value: string,
  ) => {
    setContent((prev) => {
      const updatedData = {
        ...prev,
        [field]: { ...prev[field], [locale]: value },
      };
      localStorage.setItem('eventContent', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <fetcher.Form className="space-y-4" method="post">
      <div className="flex flex-row justify-between items-center">
        <Heading level={1}>{t('Title')}</Heading>

        <LocaleSelector
          onLocaleSelect={handleLocaleSelect}
          selectedLocale={currentContentLocale}
          showSelectedLocale
          captionBadge={totalErrors ? totalErrors.toString() : undefined}
          localeBadges={totalErrorsByLocale}
        />
      </div>

      {id ?
        <input type="hidden" name="id" value={id} />
      : null}

      <Input
        label={t('Labels.Title')}
        type="text"
        value={content?.title?.[currentContentLocale] || ''}
        onSlChange={(e) =>
          handleLocalizedChange(
            'title',
            currentContentLocale,
            (e.target as HTMLInputElement)?.value,
          )
        }
        error={errors?.title?.[currentContentLocale]?._errors}
      />
      <input type="hidden" name="title.nl" value={content?.title?.nl || ''} />
      <input type="hidden" name="title.en" value={content?.title?.en || ''} />
      <input type="hidden" name="title.pap" value={content?.title?.pap || ''} />

      <Input
        label={t('Labels.Description')}
        type="text"
        value={content?.description?.[currentContentLocale] || ''}
        onSlChange={(e) =>
          handleLocalizedChange(
            'description',
            currentContentLocale,
            (e.target as HTMLInputElement)?.value,
          )
        }
        error={errors?.description?.[currentContentLocale]?._errors}
      />
      <input
        type="hidden"
        name="description.nl"
        value={content?.description?.nl || ''}
      />
      <input
        type="hidden"
        name="description.en"
        value={content?.description?.en || ''}
      />
      <input
        type="hidden"
        name="description.pap"
        value={content?.description?.pap || ''}
      />

      <Input
        label={t('Labels.Address')}
        name="address"
        id="address"
        type="text"
        value={content?.address || ''}
        onSlChange={(e) =>
          handleChange('address', (e.target as HTMLInputElement)?.value)
        }
        error={errors?.address?._errors}
      />

      <Input
        label={t('Labels.Link')}
        id="link"
        name="link"
        type="url"
        value={content?.link || ''}
        onSlChange={(e) =>
          handleChange('link', (e.target as HTMLInputElement)?.value)
        }
        error={errors?.link?._errors}
      />

      <Input
        label={t('Labels.EventDate')}
        name="eventDate"
        id="eventDate"
        type="datetime-local"
        defaultValue={content?.eventDate || ''}
        onSlChange={(e) =>
          handleChange('eventDate', (e.target as HTMLInputElement)?.value)
        }
        error={errors?.eventDate?._errors}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
