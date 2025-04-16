import { data, redirect } from 'react-router';
import { ZodError } from 'zod';
import type { Route } from './+types/_nieuw';
import { ContentURLParams } from '~/types/Content';
import i18nServer from '~/modules/i18n.server';
import {
  ProjectValidator,
  validateProject,
} from '~/validations/models/project';
import { EventValidator, validateEvent } from '~/validations/models/event';
import { saveEvent } from '~/models/events.server';
import { saveProject } from '~/models/projects.server';
import ProjectMutationForm from '~/components/ProjectMutationForm';
import EventMutationForm from '~/components/EventMutationForm';
import { PageValidator, validatePage } from '~/validations/models/page';
import PageMutationForm from '~/components/PageMutationForm';
import { savePage } from '~/models/pages.server';

export const handle = {
  i18n: [
    'NewContentRoute',
    'ProjectMutationForm',
    'EventMutationForm',
    'PageMutationForm',
  ],
  crud: {
    state: 'create',
  },
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'NewContentRoute');

  return {
    metaTranslations: {
      title: t('Meta.Title', { content: params.content, count: 1 }),
    },
  };
}

export async function action({ params, request }: Route.ActionArgs) {
  const content = params.content as ContentURLParams;

  let validatorFn;

  switch (content) {
    case 'paginas':
      validatorFn = validatePage;
      break;
    case 'projecten':
      validatorFn = validateProject;
      break;
    case 'evenementen':
      validatorFn = validateEvent;
      break;
    default:
      throw new Error(`Unsupported content type: ${content}`);
  }

  try {
    const result = await validatorFn(request);

    if (result.success) {
      switch (content) {
        case 'paginas':
          await savePage(result.data as PageValidator);
          break;
        case 'projecten':
          await saveProject(result.data as ProjectValidator);
          break;
        case 'evenementen':
          await saveEvent(result.data as EventValidator);
          break;
      }

      return redirect(`/beheer/${content}`);
    }

    return data(result, { status: 400 });
  } catch (err) {
    if (!(err instanceof ZodError)) {
      throw err;
    }

    return data(err, { status: 500 });
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    {
      title: data.metaTranslations.title,
    },
  ];
};

export default function AdminNewContentRoute({ params }: Route.ComponentProps) {
  const type = params.content as ContentURLParams;

  function getForm() {
    switch (type) {
      case 'paginas':
        return <PageMutationForm />;
      case 'projecten':
        return <ProjectMutationForm />;
      case 'evenementen':
        return <EventMutationForm />;
    }
  }

  return <>{getForm()}</>;
}
