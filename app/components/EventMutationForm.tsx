import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import { Event } from '~/models/events.server';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';
import { EventErrors, EventValidator } from '~/validations/models/event';
import LocaleSelector from '~/components/LocaleSelector';

type Props = Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>> & {
  id?: string;
};

type EventContent = {
  title: Record<string, string>;
  description: Record<string, string>;
  address: string;
  link: string;
  eventDate: string;
};

export default function EventMutationForm({
  id = '',
  ...initialValues
}: Props) {
  const { t, i18n } = useTranslation('EventMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<EventErrors, EventValidator>>();

  const [currentContentLocale, setCurrentContentLocale] = useState(
    i18n.language,
  );
  // const [title, setTitle] = useState(
  //   initialValues.title ? initialValues.title[currentContentLocale] : '',
  // );
  // const [description, setDescription] = useState(
  //   initialValues.description ?
  //     initialValues.description[currentContentLocale]
  //   : '',
  // );
  // const [address, setAddress] = useState(initialValues.address ?? '');
  // const [link, setLink] = useState(initialValues.link ?? '');
  // const [eventDate, setEventDate] = useState(
  //   initialValues.eventDate ? initialValues.eventDate.toISOString() : '',
  // );
  const [content, setContent] = useState<Partial<EventContent> | undefined>(
    () => {
      if (initialValues && !!Object.values(initialValues).length)
        return initialValues;

      const cachedContent = localStorage.getItem('eventContent');
      console.log(cachedContent);
      if (cachedContent) return JSON.parse(cachedContent);

      return {
        title: {},
        description: {},
        address: '',
        link: '',
        eventDate: '',
      };
    },
  );

  useEffect(() => {
    if (fetcher.data) {
      const { title, description, address, link, eventDate } =
        fetcher.data.data;
      // setTitle(title);
      // setDescription(description);
      // setAddress(address);
      // setLink(link);
      // setEventDate(eventDate);
      setContent({
        title: { nl: title, en: title, pap: title },
        description: { nl: description, en: description, pap: description },
        address,
        link,
        eventDate,
      });
    }
  }, [fetcher.data, i18n.language]);

  const errors = fetcher.data?.errors;
  const isSubmitting = fetcher.state !== 'idle';

  const handleLocaleSelect = (locale: string) => {
    setCurrentContentLocale(locale);
  };

  const handleChange = (field: keyof EventContent, value: string) => {
    setContent((prev: any) => {
      const updatedData = { ...prev, [field]: value };
      localStorage.setItem('eventFormData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleLocalizedChange = (
    field: 'title' | 'description',
    locale: string,
    value: string,
  ) => {
    setContent((prev: any) => {
      const updatedData = {
        ...prev,
        [field]: { ...prev[field], [locale]: value },
      };
      localStorage.setItem('eventFormData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  console.log({ content });

  return (
    <fetcher.Form className="space-y-4" method="post">
      <div className="flex flex-row justify-between items-center">
        <Heading level={1}>{t('Title')}</Heading>

        <LocaleSelector
          onLocaleSelect={handleLocaleSelect}
          selectedLocale={currentContentLocale}
          showSelectedLocale
        />
      </div>

      {id ?
        <input type="hidden" name="id" value={id} />
      : null}

      <Input
        label={t('Labels.Title')}
        name="title"
        id="title"
        type="text"
        value={content?.title?.[currentContentLocale] || ''}
        onSlChange={(e) =>
          handleLocalizedChange(
            'title',
            currentContentLocale,
            (e.target as HTMLInputElement)?.value,
          )
        }
        error={errors?.title}
      />

      <Input
        label={t('Labels.Description')}
        name="description"
        id="description"
        type="text"
        value={content?.description?.[currentContentLocale] || ''}
        onSlChange={(e) =>
          handleLocalizedChange(
            'description',
            currentContentLocale,
            (e.target as HTMLInputElement)?.value,
          )
        }
        error={errors?.description}
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
        error={errors?.address}
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
        error={errors?.link}
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
        error={errors?.eventDate}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
