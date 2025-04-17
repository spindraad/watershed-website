import { type FileUpload, parseFormData } from '@mjackson/form-data-parser';
import { LocalFileStorage } from '@mjackson/file-storage/local';

export const fileStorage = new LocalFileStorage('./tmp/uploads');

async function uploadHandler(fieldName: string, fileUpload: FileUpload) {
  if (
    fileUpload.fieldName === fieldName &&
    fileUpload.type.startsWith('image/')
  ) {
    const fileName = fileUpload.name;

    await fileStorage.set(fileName, fileUpload);

    return fileStorage.get(fileName);
  }
}

export function uploadFileFromRequest(request: Request, fieldName: string) {
  return parseFormData(request, (handler) => uploadHandler(fieldName, handler));
}
