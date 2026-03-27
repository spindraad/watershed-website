import { redirect } from 'react-router';
import type { Route } from './+types/_verwijderen';
import { ContentURLParams } from '~/types/Content';
import { deleteEvent } from '~/models/events.server';
import { deleteProject } from '~/models/projects.server';
import { deletePage } from '~/models/pages.server';
import { deleteMaker } from '~/models/makers.server';
import { deleteTalentProgram } from '~/models/talentPrograms.server';
import { deleteCandyShopCategory } from '~/models/candyShopCategories.server';
import { deleteCandyShopItem } from '~/models/candyShopItems.server';
import { deleteRubriekCategory } from '~/models/rubriekCategories.server';
import { deleteRubriek } from '~/models/rubrieken.server';

export const handle = {
  crud: {
    state: 'delete',
  },
};

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
    case 'paginas': {
      deleteFn = deletePage;
      break;
    }
    case 'evenementen': {
      deleteFn = deleteEvent;
      break;
    }
    case 'projecten': {
      deleteFn = deleteProject;
      break;
    }
    case 'makers': {
      deleteFn = deleteMaker;
      break;
    }
    case 'talentprogrammas': {
      deleteFn = deleteTalentProgram;
      break;
    }
    case 'snoepwinkel-categorieen': {
      deleteFn = deleteCandyShopCategory;
      break;
    }
    case 'snoepwinkel-items': {
      deleteFn = deleteCandyShopItem;
      break;
    }
    case 'rubriek-categorieen': {
      deleteFn = deleteRubriekCategory;
      break;
    }
    case 'rubrieken': {
      deleteFn = deleteRubriek;
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
