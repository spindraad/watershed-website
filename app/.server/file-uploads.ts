import { type FileUpload, parseFormData } from '@mjackson/form-data-parser';
import { LocalFileStorage } from '@mjackson/file-storage/local';
import { FileStorage } from '@mjackson/file-storage';
import { S3FileStorageClass } from '~/.server/S3FileStorageClass';

let storage: FileStorage;
console.log('Setting up file storage', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  storage = new S3FileStorageClass();
} else {
  storage = new LocalFileStorage('./tmp/uploads');
}
export const fileStorage = storage;

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
