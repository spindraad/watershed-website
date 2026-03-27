import { data, redirect, useLoaderData } from 'react-router';
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
import { MakerValidator, validateMaker } from '~/validations/models/maker';
import MakerMutationForm from '~/components/MakerMutationForm';
import { saveMaker, getMakers } from '~/models/makers.server';
import {
  getTalentPrograms,
  saveTalentProgram,
} from '~/models/talentPrograms.server';
import {
  TalentProgramValidator,
  validateTalentProgram,
} from '~/validations/models/talentProgram';
import TalentProgramMutationForm from '~/components/TalentProgramMutationForm';
import {
  CandyShopCategoryValidator,
  validateCandyShopCategory,
} from '~/validations/models/candyShopCategory';
import CandyShopCategoryMutationForm from '~/components/CandyShopCategoryMutationForm';
import {
  saveCandyShopCategory,
  getCandyShopCategories,
} from '~/models/candyShopCategories.server';
import {
  CandyShopItemValidator,
  validateCandyShopItem,
} from '~/validations/models/candyShopItem';
import CandyShopItemMutationForm from '~/components/CandyShopItemMutationForm';
import { saveCandyShopItem } from '~/models/candyShopItems.server';
import {
  RubriekCategoryValidator,
  validateRubriekCategory,
} from '~/validations/models/rubriekCategory';
import RubriekCategoryMutationForm from '~/components/RubriekCategoryMutationForm';
import {
  saveRubriekCategory,
  getRubriekCategories,
} from '~/models/rubriekCategories.server';
import {
  RubriekValidator,
  validateRubriek,
} from '~/validations/models/rubriek';
import RubriekMutationForm from '~/components/RubriekMutationForm';
import { saveRubriek } from '~/models/rubrieken.server';

export const handle = {
  i18n: [
    'NewContentRoute',
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
    state: 'create',
  },
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'NewContentRoute');

  let titleKey = 'Meta.Title.Neuter';
  const content = params.content as ContentURLParams;
  if (content === 'paginas') {
    titleKey = 'Meta.Title.Common';
  }

  // Load related data for forms that need it
  let relatedData: Record<string, unknown> = {};

  switch (content) {
    case 'evenementen':
    case 'projecten': {
      const makers = await getMakers();
      relatedData = { makers };
      break;
    }
    case 'makers': {
      const talentPrograms = await getTalentPrograms();
      relatedData = { talentPrograms };
      break;
    }
    case 'talentprogrammas': {
      const makers = await getMakers();
      relatedData = { makers };
      break;
    }
    case 'snoepwinkel-items': {
      const categories = await getCandyShopCategories();
      relatedData = { categories };
      break;
    }
    case 'rubrieken': {
      const categories = await getRubriekCategories();
      relatedData = { categories };
      break;
    }
  }

  return {
    ...relatedData,
    metaTranslations: {
      title: t(titleKey, { content: params.content, count: 1 }),
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
        case 'makers':
          await saveMaker(result.data as MakerValidator);
          break;
        case 'talentprogrammas':
          await saveTalentProgram(result.data as TalentProgramValidator);
          break;
        case 'snoepwinkel-categorieen':
          await saveCandyShopCategory(
            result.data as CandyShopCategoryValidator,
          );
          break;
        case 'snoepwinkel-items':
          await saveCandyShopItem(result.data as CandyShopItemValidator);
          break;
        case 'rubriek-categorieen':
          await saveRubriekCategory(result.data as RubriekCategoryValidator);
          break;
        case 'rubrieken':
          await saveRubriek(result.data as RubriekValidator);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loaderData = useLoaderData<typeof loader>() as any;

  function getForm() {
    switch (type) {
      case 'paginas':
        return <PageMutationForm />;
      case 'projecten':
        return <ProjectMutationForm makers={loaderData.makers || []} />;
      case 'evenementen':
        return <EventMutationForm makers={loaderData.makers || []} />;
      case 'makers':
        return (
          <MakerMutationForm talentPrograms={loaderData.talentPrograms || []} />
        );
      case 'talentprogrammas':
        return <TalentProgramMutationForm makers={loaderData.makers || []} />;
      case 'snoepwinkel-categorieen':
        return <CandyShopCategoryMutationForm />;
      case 'snoepwinkel-items':
        return (
          <CandyShopItemMutationForm categories={loaderData.categories || []} />
        );
      case 'rubriek-categorieen':
        return <RubriekCategoryMutationForm />;
      case 'rubrieken':
        return <RubriekMutationForm categories={loaderData.categories || []} />;
    }
  }

  return <>{getForm()}</>;
}
