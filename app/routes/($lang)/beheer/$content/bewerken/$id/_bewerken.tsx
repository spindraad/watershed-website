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
import { getPage, updatePage } from '~/models/pages.server';
import { PageValidator, validatePage } from '~/validations/models/page';
import PageMutationForm from '~/components/PageMutationForm';
import { getMakerById, updateMaker, getMakers } from '~/models/makers.server';
import { MakerValidator, validateMaker } from '~/validations/models/maker';
import MakerMutationForm from '~/components/MakerMutationForm';
import {
  getTalentPrograms,
  getTalentProgram,
  updateTalentProgram,
} from '~/models/talentPrograms.server';
import {
  TalentProgramValidator,
  validateTalentProgram,
} from '~/validations/models/talentProgram';
import TalentProgramMutationForm from '~/components/TalentProgramMutationForm';
import {
  getCandyShopCategory,
  updateCandyShopCategory,
  getCandyShopCategories,
} from '~/models/candyShopCategories.server';
import {
  CandyShopCategoryValidator,
  validateCandyShopCategory,
} from '~/validations/models/candyShopCategory';
import CandyShopCategoryMutationForm from '~/components/CandyShopCategoryMutationForm';
import {
  getCandyShopItem,
  updateCandyShopItem,
} from '~/models/candyShopItems.server';
import {
  CandyShopItemValidator,
  validateCandyShopItem,
} from '~/validations/models/candyShopItem';
import CandyShopItemMutationForm from '~/components/CandyShopItemMutationForm';
import {
  getRubriekCategory,
  updateRubriekCategory,
  getRubriekCategories,
} from '~/models/rubriekCategories.server';
import {
  RubriekCategoryValidator,
  validateRubriekCategory,
} from '~/validations/models/rubriekCategory';
import RubriekCategoryMutationForm from '~/components/RubriekCategoryMutationForm';
import { getRubriek, updateRubriek } from '~/models/rubrieken.server';
import {
  RubriekValidator,
  validateRubriek,
} from '~/validations/models/rubriek';
import RubriekMutationForm from '~/components/RubriekMutationForm';

export const handle = {
  i18n: [
    'EditContentRoute',
    'ProjectMutationForm',
    'EventMutationForm',
    'PageMutationForm',
    'MakerMutationForm',
    'TalentProgramMutationForm',
    'CandyShopCategoryMutationForm',
    'CandyShopItemMutationForm',
    'RubriekCategoryMutationForm',
    'RubriekMutationForm',
    'ImageSelectionField',
    'ContentSelectionField',
    'LocalisedRichTextEditor',
    'MediaLibraryDialog',
  ],
  crud: {
    state: 'update',
  },
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
  let relatedData: Record<string, unknown> = {};

  switch (content) {
    case 'paginas':
      payload = await getPage(id);
      break;
    case 'evenementen': {
      payload = await getEvent(id);
      const makers = await getMakers();
      relatedData = { makers };
      break;
    }
    case 'projecten': {
      payload = await getProject(id);
      const makers = await getMakers();
      relatedData = { makers };
      break;
    }
    case 'makers': {
      payload = await getMakerById(id);
      const talentPrograms = await getTalentPrograms();
      relatedData = { talentPrograms };
      break;
    }
    case 'talentprogrammas': {
      payload = await getTalentProgram(id);
      const makers = await getMakers();
      relatedData = { makers };
      break;
    }
    case 'snoepwinkel-categorieen':
      payload = await getCandyShopCategory(id);
      break;
    case 'snoepwinkel-items': {
      payload = await getCandyShopItem(id);
      const categories = await getCandyShopCategories();
      relatedData = { categories };
      break;
    }
    case 'rubriek-categorieen':
      payload = await getRubriekCategory(id);
      break;
    case 'rubrieken': {
      payload = await getRubriek(id);
      const categories = await getRubriekCategories();
      relatedData = { categories };
      break;
    }
    default:
      throw new Error(`Content type "${content}" not found`);
  }

  return data({ payload, metaTranslations, ...relatedData });
}

export async function action({ params, request }: Route.ActionArgs) {
  const content = params.content as ContentURLParams;

  let validatorFn;

  switch (content) {
    case 'paginas':
      validatorFn = validatePage;
      break;
    case 'evenementen':
      validatorFn = validateEvent;
      break;
    case 'projecten':
      validatorFn = validateProject;
      break;
    case 'makers':
      validatorFn = validateMaker;
      break;
    case 'talentprogrammas':
      validatorFn = validateTalentProgram;
      break;
    case 'snoepwinkel-categorieen':
      validatorFn = validateCandyShopCategory;
      break;
    case 'snoepwinkel-items':
      validatorFn = validateCandyShopItem;
      break;
    case 'rubriek-categorieen':
      validatorFn = validateRubriekCategory;
      break;
    case 'rubrieken':
      validatorFn = validateRubriek;
      break;
    default:
      throw new Error(`Content type "${content}" not found`);
  }

  try {
    const result = await validatorFn(request);
    const { id } = params;

    if (result.success) {
      switch (content) {
        case 'paginas':
          await updatePage(id, result.data as PageValidator);
          break;
        case 'evenementen':
          await updateEvent(id, result.data as EventValidator);
          break;
        case 'projecten':
          await updateProject(id, result.data as ProjectValidator);
          break;
        case 'makers':
          await updateMaker(id, result.data as MakerValidator);
          break;
        case 'talentprogrammas':
          await updateTalentProgram(id, result.data as TalentProgramValidator);
          break;
        case 'snoepwinkel-categorieen':
          await updateCandyShopCategory(
            id,
            result.data as CandyShopCategoryValidator,
          );
          break;
        case 'snoepwinkel-items':
          await updateCandyShopItem(id, result.data as CandyShopItemValidator);
          break;
        case 'rubriek-categorieen':
          await updateRubriekCategory(
            id,
            result.data as RubriekCategoryValidator,
          );
          break;
        case 'rubrieken':
          await updateRubriek(id, result.data as RubriekValidator);
          break;
      }

      return redirect(`/beheer/${content}`);
    }

    return data(result, { status: 400 });
  } catch (err) {
    if (!(err instanceof ZodError)) {
      throw err;
    }

    const errors = (err as ZodError).format();
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loaderData = useLoaderData<typeof loader>() as any;
  const { payload } = loaderData;

  function getForm() {
    switch (type) {
      case 'paginas':
        return <PageMutationForm {...payload} />;
      case 'projecten':
        return (
          <ProjectMutationForm
            {...payload}
            image={{ url: payload.imageUrl || '', alt: payload.imageAlt || '' }}
            makers={loaderData.makers || []}
            selectedMakerIds={
              payload.makers?.map((m: { id: string }) => m.id) || []
            }
          />
        );
      case 'evenementen':
        return (
          <EventMutationForm
            {...payload}
            image={{ url: payload.imageUrl || '', alt: payload.imageAlt || '' }}
            makers={loaderData.makers || []}
            selectedMakerIds={
              payload.makers?.map((m: { id: string }) => m.id) || []
            }
          />
        );
      case 'makers':
        return (
          <MakerMutationForm
            {...payload}
            talentPrograms={loaderData.talentPrograms || []}
          />
        );
      case 'talentprogrammas':
        return (
          <TalentProgramMutationForm
            {...payload}
            makers={loaderData.makers || []}
          />
        );
      case 'snoepwinkel-categorieen':
        return <CandyShopCategoryMutationForm {...payload} />;
      case 'snoepwinkel-items':
        return (
          <CandyShopItemMutationForm
            {...payload}
            categories={loaderData.categories || []}
          />
        );
      case 'rubriek-categorieen':
        return <RubriekCategoryMutationForm {...payload} />;
      case 'rubrieken':
        return (
          <RubriekMutationForm
            {...payload}
            categories={loaderData.categories || []}
          />
        );
    }
  }

  return <>{getForm()}</>;
}
