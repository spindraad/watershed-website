import type { Route } from './+types/_verwijderen';
import { redirect } from 'react-router';

export async function loader() {
  // Return method not allowed
  return new Response('Method not allowed', { status: 405 });
}

export async function action({ params, request }: Route.ActionArgs) {
  // Only proceed if the request method is DELETE
  if (request.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 405 });
  }

  // const { id, content } = params;
  //
  // if (!id) {
  //   throw new Error('No ID provided');
  // }
  //
  // if (content === 'posts') {
  //   await deletePost(id);
  // } else {
  //   await deleteEvent(id);
  // }
  //
  // return redirect(`/beheer/${content}`);
  return null;
}

export default function AdminDeleteContentRoute({
  params,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Are you sure you want to delete this content?</h1>
      <p>
        Type: {params.content} with id {params.id}
      </p>
    </div>
  );
}
