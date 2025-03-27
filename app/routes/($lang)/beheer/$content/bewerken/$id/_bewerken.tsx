import type { Route } from './+types/_bewerken';
import { ZodError } from 'zod';
import { data, redirect, useLoaderData } from 'react-router';
import { ContentURLParams } from '~/types/Content';
import i18nServer from '~/modules/i18n.server';
import { getEvent, updateEvent } from '~/models/events.server';
import { getProject, updateProject } from '~/models/projects.server';
import EventMutationForm from '~/components/EventMutationForm';
import ProjectMutationForm from '~/components/ProjectMutationForm';
import { EventValidator, validateEvent } from '~/validations/models/event';
import {
  ProjectValidator,
  validateProject,
} from '~/validations/models/project';

export const handle = {
  i18n: 'EditContentRoute',
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    throw new Error('No ID provided');
  }

  if (!params.content) {
    throw new Error('No content provided');
  }

  const t = await i18nServer.getFixedT(request, 'EditContentRoute');
  const content = params.content as ContentURLParams;

  const metaTranslations = {
    title: t('Meta.Title', { content, count: 1 }),
  };

  let payload;
  switch (content) {
    case 'evenementen':
      payload = await getEvent(id);
      break;

    case 'projecten':
      payload = await getProject(id);
      break;
    default:
      throw new Error(`Content type "${content}" not found`);
  }

  return data({ payload, metaTranslations });
}

export async function action({ params, request }: Route.ActionArgs) {
  const content = params.content as ContentURLParams;

  let validatorFn;

  switch (content) {
    case 'evenementen':
      validatorFn = validateEvent;
      break;
    case 'projecten':
      validatorFn = validateProject;
      break;
    default:
      throw new Error(`Content type "${content}" not found`);
  }

  try {
    const result = await validatorFn(request);
    const { id } = params;

    if (result.success) {
      switch (content) {
        case 'evenementen':
          await updateEvent(id, result.data as EventValidator);
          break;
        case 'projecten':
          await updateProject(id, result.data as ProjectValidator);
          break;
      }

      console.log('Data is validated and ready to be saved...');
      return redirect(`/beheer/${content}`);
    }

    console.error('Data is invalid and cannot be saved...', result.error);
    return data(result, { status: 400 });
  } catch (err) {
    if (!(err instanceof ZodError)) {
      throw err;
    }

    const errors = (err as ZodError).format();
    console.error('Data is invalid and cannot be saved...');
    return data({ errors }, { status: 400 });
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: data.metaTranslations.title,
    },
  ];
};

export default function AdminEditContentRoute({
  params,
}: Route.ComponentProps) {
  const type = params.content as ContentURLParams;
  const { payload } = useLoaderData<typeof loader>();

  function getForm() {
    switch (type) {
      case 'projecten':
        return <ProjectMutationForm {...payload} />;
      case 'evenementen':
        return <EventMutationForm {...payload} />;
    }
  }

  return <div className="w-full">{getForm()}</div>;
}
