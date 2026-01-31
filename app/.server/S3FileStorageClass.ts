import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  NoSuchKey,
  NotFound,
  S3,
} from '@aws-sdk/client-s3';
import type {
  FileKey,
  FileMetadata,
  FileStorage,
  ListOptions,
  ListResult,
} from '@mjackson/file-storage';
import mime from 'mime';
import { Upload } from '@aws-sdk/lib-storage';

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: 'https://ams3.digitaloceanspaces.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.BUCKET_KEY_ID!,
    secretAccessKey: process.env.BUCKET_SECRET_KEY!,
  },
});

export class S3FileStorageClass implements FileStorage {
  bucket = process.env.BUCKET_NAME;

  async has(key: string): Promise<boolean> {
    try {
      await s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      return true;
    } catch (error) {
      if (error instanceof NotFound) {
        return false;
      }
      console.error(
        `Failed to check for a file ${key} in bucket ${this.bucket}`,
        error,
      );
      return false;
    }
  }

  async get(key: string): Promise<File | null> {
    try {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
      if (!response.Body) {
        return null;
      }
      const bytes = await response.Body.transformToByteArray();
      return new File([bytes.buffer as ArrayBuffer], key, {
        type: response.ContentType,
        lastModified: response.LastModified?.getTime(),
      });
    } catch (error) {
      if (error instanceof NoSuchKey) {
        return null;
      }
      console.error(
        `Failed to get a file ${key} in bucket ${this.bucket}`,
        error,
      );
      return null;
    }
  }

  async list<T extends ListOptions>(options?: T): Promise<ListResult<T>> {
    const {
      cursor,
      includeMetadata = false,
      limit = 32,
      prefix,
    } = options ?? {};

    try {
      const response = await s3Client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          ContinuationToken: cursor,
          MaxKeys: limit,
          Prefix: prefix,
        }),
      );

      const files: (T extends (
        {
          includeMetadata: true;
        }
      ) ?
        FileMetadata
      : FileKey)[] = [];

      response.Contents?.forEach((file) => {
        if (includeMetadata) {
          (files as FileMetadata[]).push({
            key: file.Key!,
            name: file.Key!.split('/').pop()!,
            type: mime.getType(file.Key!) ?? 'application/octet-stream',
            size: file.Size,
            lastModified: file.LastModified?.getTime(),
          } as FileMetadata);
        } else {
          (files as FileKey[]).push({
            key: file.Key!,
          });
        }
      });

      return {
        cursor: response.NextContinuationToken,
        files,
      };
    } catch (error) {
      console.error(`Failed to list files in bucket ${this.bucket}`, error);
      return {
        cursor: undefined,
        files: [],
      };
    }
  }

  async set(key: string, value: File): Promise<void> {
    try {
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: value.stream(),
          ContentType: value.type,
        },
      });
      await upload.done();
    } catch (error) {
      console.error(
        `Failed to set a file ${key} in bucket ${this.bucket}`,
        error,
      );
    }
  }

  async put(key: string, value: File): Promise<File> {
    await this.set(key, value);
    const file = await this.get(key);
    if (!file) {
      throw new Error('Failed to fetch file are put');
    }
    return file;
  }

  async remove(key: string): Promise<void> {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
    } catch (error) {
      console.error(
        `Failed to remove a file ${key} in bucket ${this.bucket}`,
        error,
      );
    }
  }
}
