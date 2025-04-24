import type { Route } from './+types/_dynamic-image';
import { fileStorage } from '~/.server/file-uploads';

export async function loader({ params }: Route.LoaderArgs) {
  const { fileName } = params;

  const file = await fileStorage.get(fileName);

  if (!file) {
    console.warn(`File not found: ${fileName}`);
    throw new Response('Not Found', { status: 404 });
  }

  console.log(`Serving file: ${fileName}`);
  return new Response(file.stream(), {
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size.toString(),
      'Content-Disposition': `attachment; filename="${file.name}"`,
    },
  });
}
