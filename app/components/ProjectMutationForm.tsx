import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from '~/models/projects.server';
import { ShoelaceContext } from '~/components/shoelace';
import { useFetcher } from 'react-router';
import { ProjectErrors, ProjectValidator } from '~/validations/models/project';
import Heading from '~/components/Heading';
import Input from '~/components/Input';
import { ErrorResponse } from '~/types/Validations';

type Props = Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>> & {
  id?: string;
};

export default function ProjectMutationForm({
  id = '',
  ...initialValues
}: Props) {
  const { t, i18n } = useTranslation('ProjectMutationForm');
  const { SlButton } = useContext(ShoelaceContext);
  const fetcher = useFetcher<ErrorResponse<ProjectErrors, ProjectValidator>>();

  const [title, setTitle] = useState(
    initialValues.title ? initialValues.title[i18n.language] : '',
  );
  const [description, setDescription] = useState(
    initialValues.description ? initialValues.description[i18n.language] : '',
  );
  const [summary, setSummary] = useState(
    initialValues.summary ? initialValues.summary[i18n.language] : '',
  );
  const [slug, setSlug] = useState(initialValues.slug ?? '');

  useEffect(() => {
    if (fetcher.data) {
      const { title, description, summary, slug } = fetcher.data.data;
      setTitle(title);
      setDescription(description);
      setSummary(summary);
      setSlug(slug);
    }
  }, [fetcher.data, i18n.language]);
  const errors = fetcher.data?.errors as ProjectErrors;
  const isSubmitting = fetcher.state !== 'idle';

  return (
    <fetcher.Form className="space-y-4" method="post">
      <Heading level={1}>{t('Title')}</Heading>

      {id ?
        <input type="hidden" name="id" value={id} />
      : null}

      <Input
        label={t('Labels.Title')}
        name="title"
        id="title"
        type="text"
        value={title}
        error={errors?.title}
      />

      <Input
        label={t('Labels.Description')}
        name="description"
        id="description"
        type="text"
        value={description}
        error={errors?.description}
      />

      <Input
        label={t('Labels.Summary')}
        name="summary"
        id="summary"
        type="text"
        value={summary}
        error={errors?.summary}
      />

      <Input
        label={t('Labels.Slug')}
        name="slug"
        id="slug"
        type="text"
        value={slug}
        error={errors?.slug}
      />

      <div className="flex justify-end">
        <SlButton loading={isSubmitting} variant="primary" type="submit">
          {t('Save')}
        </SlButton>
      </div>
    </fetcher.Form>
  );
}
