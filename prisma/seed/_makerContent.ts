import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Blob } from 'node:buffer';
import mime from 'mime';
import { PrismaClient, Maker } from '@prisma/client';
import { parseFormData } from '@mjackson/form-data-parser';
import { fileStorage } from '~/.server/file-uploads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makers: Array<Omit<Maker, 'id' | 'createdAt' | 'updatedAt'>> = [
  {
    name: 'Monique Hendriks',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet Ploeg-E',
      nl: 'Stadsdichter Ploeg-E',
      pap: 'Poeta di Siudat Ploeg-E',
    },
    slug: 'monique-hendriks',
    imageUrl: 'monique-hendriks.png',
  },
  {
    name: 'Terence van Lange',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet Ploeg-E',
      nl: 'Stadsdichter Ploeg-E',
      pap: 'Poeta di Siudat Ploeg-E',
    },
    slug: 'terence-van-lange',
    imageUrl: 'terence-van-lange.png',
  },
  {
    name: 'Corinne Heyrman',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet Ploeg-E',
      nl: 'Stadsdichter Ploeg-E',
      pap: 'Poeta di Siudat Ploeg-E',
    },
    slug: 'corinne-heyrman',
    imageUrl: 'corinne-heyrman.png',
  },
  {
    name: 'Jonathan Griffioen',
    profession: {
      en: 'Poet',
      nl: 'Dichter',
      pap: 'Poeta',
    },
    summary: {
      en: 'Stories for Saga',
      nl: 'Verhalen voor Saga',
      pap: 'Kuenta pa Saga',
    },
    slug: 'jonathan-griffioen',
    imageUrl: 'jonathan-griffioen.png',
  },
  {
    name: 'Iris Penning',
    profession: {
      en: 'Writer',
      nl: 'Schrijver',
      pap: 'Eskribidó',
    },
    summary: {
      en: 'City Poet (2019-2024)',
      nl: 'Stadsdichter (2019-2024)',
      pap: 'Poeta di Siudat (2019-2024)',
    },
    slug: 'iris-penning',
    imageUrl: 'iris-penning.png',
  },
];

export const createMakers = (client: PrismaClient) => {
  return client.maker.createManyAndReturn({
    data: makers,
  });
};

export async function uploadMakerImagesIfNeeded() {
  console.log('Checking uploaded images for makers...');

  for (const maker of makers) {
    if (maker.imageUrl) {
      const file = await fileStorage.has(maker.imageUrl);
      if (!file) {
        console.warn(`[404] Image not found: ${maker.imageUrl}, uploading...`);
        const imagePath = path.join(__dirname, 'makers', maker.imageUrl);
        const request = createUploadRequest(maker.imageUrl, imagePath);

        await parseFormData(request, async (handler) => {
          const bytes = await handler.bytes();
          const file = new File([bytes.buffer as ArrayBuffer], handler.name, {
            type: handler.type,
          });
          await fileStorage.set(maker.imageUrl!, file);
        });
      } else {
        console.log(`[200] Image already exists: ${maker.imageUrl}`);
      }
    }
  }
}

function createUploadRequest(fileName: string, filePath: string): Request {
  const fileBuffer = fs.readFileSync(filePath);
  const fileType = mime.getType(filePath) || 'application/octet-stream';
  const fileBlob: Blob = new Blob([fileBuffer]);
  // @ts-expect-error TypeScript thinks the Blob type is different when imported.
  const file = new File([fileBlob], fileName, { type: fileType });

  const formData = new FormData();
  formData.append('media', file);

  return new Request('http://localhost/upload', {
    method: 'POST',
    body: formData,
  });
}
