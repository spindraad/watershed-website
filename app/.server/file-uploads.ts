import { type FileUpload } from '@mjackson/form-data-parser';
import { LocalFileStorage } from '@mjackson/file-storage/local';

export const fileStorage = new LocalFileStorage('./tmp/uploads');

export async function uploadHandler(fieldName: string, fileUpload: FileUpload) {
  if (
    fileUpload.fieldName === fieldName &&
    fileUpload.type.startsWith('image/')
  ) {
    const fileName = fileUpload.name;

    await fileStorage.set(fileName, fileUpload);

    return fileStorage.get(fileName);
  }
}
