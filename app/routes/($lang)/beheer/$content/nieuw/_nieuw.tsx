import type { Route } from './+types/_nieuw';
import { ContentURLParams } from '~/types/Content';
import i18nServer from '~/modules/i18n.server';
import { useTranslation } from 'react-i18next';

export const handle = {
  i18: 'NewContentRoute',
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
  // const content = params.content as ContentURLParams;
  //
  // let validatorFn;
  //
  // if (content === 'evenementen') {
  //   validatorFn = validatePost;
  // } else {
  //   validatorFn = validateEvent;
  // }
  //
  // try {
  //   const result = await validatorFn(request);
  //
  //   if (content === 'evenementen') {
  //     await savePost(result as PostValidator);
  //   } else {
  //     await saveEvent(result as EventValidator);
  //   }
  //
  //   console.log('Data is validated and ready to be saved...');
  //   return redirect(`/admin/${content}`);
  // } catch (err) {
  //   if (!(err instanceof ZodError)) {
  //     throw err;
  //   }
  //
  //   const errors = (err as ZodError).flatten().fieldErrors;
  //   console.error('Data is invalid and cannot be saved...');
  //   return data({ errors }, { status: 400 });
  // }
  console.log({ params, request: request.method });
  return null;
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
  const { t } = useTranslation('NewContentRoute');

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-4xl">{t('Title', { content: type, count: 1 })}</h1>
    </div>
  );
}
