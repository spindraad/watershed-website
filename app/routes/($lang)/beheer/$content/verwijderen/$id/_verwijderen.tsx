import { redirect } from 'react-router';
import type { Route } from './+types/_verwijderen';
import { ContentURLParams } from '~/types/Content';
import { deleteEvent } from '~/models/events.server';
import { deleteProject } from '~/models/projects.server';

export async function loader() {
  // Return method not allowed
  return new Response('Method not allowed', { status: 405 });
}

export async function action({ params, request }: Route.ActionArgs) {
  // Only proceed if the request method is DELETE
  if (request.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { id } = params;

  if (!id) {
    throw new Error('No ID provided');
  }

  const content = params.content as ContentURLParams;

  let deleteFn: (id: string) => Promise<void>;
  switch (content) {
    case 'evenementen': {
      deleteFn = deleteEvent;
      break;
    }
    case 'projecten': {
      deleteFn = deleteProject;
      break;
    }
    default: {
      throw new Error('Invalid content type');
    }
  }

  try {
    await deleteFn(id);

    return redirect(`/beheer/${content}`);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete content');
  }
}

export default function AdminDeleteContentRoute() {
  return null;
}
