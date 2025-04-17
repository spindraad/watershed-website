import type { Route } from './+types/_media-upload';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import { uploadFileFromRequest } from '~/.server/file-uploads';
import { redirect } from 'react-router';
import Heading from '~/components/Heading';

export async function action({ request }: Route.ActionArgs) {
  const formData = await uploadFileFromRequest(request, 'media');

  const image = formData.get('media') as File | null;

  if (!image) {
    throw new Response('No image uploaded', { status: 400 });
  }

  console.log('Uploaded image:', image.name);

  return redirect('/beheer/media');
}

export default function MediaUploadRoute() {
  const { SlButton } = useContext(ShoelaceContext);

  return (
    <div className="flex flex-col gap-4">
      <Heading level={1}>Upload Media</Heading>
      <form method="post" encType="multipart/form-data">
        <input type="file" name="media" accept="image/*" />
        <SlButton type="submit">Upload</SlButton>
      </form>
    </div>
  );
}
