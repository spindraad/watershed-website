import type { Route } from './+types/_nieuw';
import { ContentURLParams } from '~/types/Content';

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

export default function AdminNewContentRoute({ params }: Route.ComponentProps) {
  const type = params.content as ContentURLParams;

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-4xl">{`New ${type}`}</h1>
    </div>
  );
}
