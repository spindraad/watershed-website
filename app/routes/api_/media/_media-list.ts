import type { Route } from './+types/_media-list';
import { fileStorage } from '~/.server/file-uploads';

export type MediaFile = {
  key: string;
  name: string;
  type: string;
  url: string;
  size?: number;
  lastModified?: number;
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const limitParam = url.searchParams.get('limit');
  const cursor = url.searchParams.get('cursor') || undefined;
  const prefix = url.searchParams.get('prefix') || undefined;
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  if (isNaN(limit) || limit <= 0 || limit > 100) {
    return new Response('Invalid "limit" parameter (must be 1-100)', {
      status: 400,
    });
  }

  try {
    const result = await fileStorage.list({
      limit,
      cursor,
      prefix,
      includeMetadata: true,
    });

    const baseUrl =
      process.env.NODE_ENV === 'production' ?
        `https://${process.env.BUCKET_NAME}.ams3.digitaloceanspaces.com`
      : '/afbeelding';

    const files: MediaFile[] = result.files.map((file) => ({
      key: file.key,
      name: file.name,
      type: file.type,
      url: `${baseUrl}/${file.key}`,
      size: file.size,
      lastModified: file.lastModified,
    }));

    return {
      files,
      cursor: result.cursor,
      hasMore: !!result.cursor,
    };
  } catch (error) {
    console.error('Error listing media files:', error);
    throw new Response('Error listing media files', { status: 500 });
  }
}
