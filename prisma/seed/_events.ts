import path from 'node:path';
import fs from 'node:fs';
import { Blob } from 'node:buffer';
import mime from 'mime';
import { Event } from '@prisma/client';
import { parseFormData } from '@mjackson/form-data-parser';
import { fileStorage } from '~/.server/file-uploads';

type SeedEvent = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'content'>;
const __dirname = import.meta.dirname;

export const events: SeedEvent[] = [
  {
    title: {
      nl: 'Buskeda in de bieb',
      en: 'Buskeda in the library',
      pap: 'Buskeda den bibi',
    },
    description: {
      nl: 'Een gezellige middag met muziek en poëzie.',
      en: 'A cozy afternoon with music and poetry.',
      pap: 'Un atardi di biba ku musik i poesia.',
    },
    imageUrl: 'buskeda-milouska.png',
    imageAlt: null,
    organiser: 'Milouska Meulens',
    eventDate: new Date('2025-09-11T15:00:00Z'),
    address: 'De Witte Dame, Eindhoven',
    link: 'https://www.bibliotheek.nl/agenda/buskeda-in-de-bieb.html',
  },
  {
    title: {
      nl: 'Echt gebeurd verhalenavond',
      en: 'True stories evening',
      pap: 'Verhalen di ta pasa',
    },
    description: {
      nl: 'Een avond vol waargebeurde verhalen van de deelnemers.',
      en: 'An evening full of true stories from the participants.',
      pap: 'Un atardi ku ta biba di e participanten.',
    },
    imageUrl: 'echte-verhalen.png',
    imageAlt: null,
    organiser: null,
    eventDate: new Date('2025-09-11T17:00:00Z'),
    address: 'De Witte Dame, Eindhoven',
    link: 'https://www.bibliotheek.nl/agenda/buskeda-in-de-bieb.html',
  },
  {
    title: {
      nl: 'Ik weet zeker dat het niet alleen mijn verhaal is',
      en: 'I am sure it is not only my story',
      pap: 'Mi ta sigur ku no so mi ta konta e historia',
    },
    description: {
      nl: 'Een avond vol waargebeurde verhalen van de deelnemers.',
      en: 'An evening full of true stories from the participants.',
      pap: 'Un atardi ku ta biba di e participanten.',
    },
    imageUrl: 'ik-weet-zeker.png',
    imageAlt: null,
    organiser: 'Monique Hendriks',
    eventDate: new Date('2025-09-11T19:00:00Z'),
    address: 'De Witte Dame, Eindhoven',
    link: 'https://www.bibliotheek.nl/agenda/buskeda-in-de-bieb.html',
  },
];

export async function uploadImagesIfNeeded() {
  console.log('Checking uploaded images for events...');

  for (const event of events) {
    if (event.imageUrl) {
      const file = await fileStorage.has(event.imageUrl);
      if (!file) {
        console.warn(`[404] Image not found: ${event.imageUrl}, uploading...`);
        const imagePath = path.join(
          __dirname,
          'images',
          'events',
          event.imageUrl,
        );
        const request = createUploadRequest(event.imageUrl, imagePath);

        await parseFormData(request, async (handler) => {
          const bytes = await handler.bytes();
          const file = new File([bytes.buffer as ArrayBuffer], handler.name, {
            type: handler.type,
          });
          await fileStorage.set(event.imageUrl!, file);
        });
      } else {
        console.log(`[200] Image already exists: ${event.imageUrl}`);
      }
    }
  }
}

function createUploadRequest(fileName: string, filePath: string): Request {
  // Create a Blob from the file path
  const fileBuffer = fs.readFileSync(filePath);
  const fileType = mime.getType(filePath) || 'application/octet-stream';
  const fileBlob: Blob = new Blob([fileBuffer]);
  // @ts-expect-error TypeScript thinks the Blob type is different when imported.
  const file = new File([fileBlob], fileName, { type: fileType });

  const formData = new FormData();
  formData.append('media', file);

  // Don't need to set Content-Type header, fetch will do it automatically based on the formData object.
  // See red note here: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects#sending_files_using_a_formdata_object
  return new Request('http://localhost/upload', {
    method: 'POST',
    body: formData,
  });
}
