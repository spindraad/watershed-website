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

interface StoredMetadata {
  key: string;
  lastModified: number;
  name: string;
  type: string;
}

/**
 * Computes SHA-256 hash of a key, matching LocalFileStorage behavior.
 */
async function computeHash(key: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(key),
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Gets the S3 paths for a given key, matching LocalFileStorage structure.
 */
async function getPaths(key: string) {
  const hash = await computeHash(key);
  const directory = hash.slice(0, 2);
  return {
    directory,
    filePath: `${directory}/${hash}.dat`,
    metaPath: `${directory}/${hash}.meta.json`,
  };
}

export class S3FileStorageClass implements FileStorage {
  bucket = process.env.BUCKET_NAME;

  async has(key: string): Promise<boolean> {
    const { metaPath } = await getPaths(key);
    try {
      await s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: metaPath,
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
    const { filePath, metaPath } = await getPaths(key);

    try {
      // First, get the metadata
      const metaResponse = await s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: metaPath,
        }),
      );

      if (!metaResponse.Body) {
        return null;
      }

      const metaText = await metaResponse.Body.transformToString();
      const meta: StoredMetadata = JSON.parse(metaText);

      // Then, get the actual file
      const fileResponse = await s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: filePath,
        }),
      );

      if (!fileResponse.Body) {
        return null;
      }

      const bytes = await fileResponse.Body.transformToByteArray();
      return new File([bytes.buffer as ArrayBuffer], meta.name, {
        type: meta.type,
        lastModified: meta.lastModified,
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
      // List all .meta.json files
      const response = await s3Client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          ContinuationToken: cursor,
          MaxKeys: limit * 2, // Account for .dat files
        }),
      );

      const files: (T extends { includeMetadata: true } ? FileMetadata
      : FileKey)[] = [];

      const metaFiles =
        response.Contents?.filter((f) => f.Key?.endsWith('.meta.json')) ?? [];

      for (const file of metaFiles) {
        if (files.length >= limit) break;

        try {
          const metaResponse = await s3Client.send(
            new GetObjectCommand({
              Bucket: this.bucket,
              Key: file.Key!,
            }),
          );

          if (metaResponse.Body) {
            const metaText = await metaResponse.Body.transformToString();
            const meta: StoredMetadata = JSON.parse(metaText);

            if (prefix != null && !meta.key.startsWith(prefix)) {
              continue;
            }

            if (includeMetadata) {
              // Get file size from the .dat file
              const datKey = file.Key!.replace('.meta.json', '.dat');
              const datFile = response.Contents?.find((f) => f.Key === datKey);

              (files as FileMetadata[]).push({
                key: meta.key,
                name: meta.name,
                type: meta.type,
                size: datFile?.Size,
                lastModified: meta.lastModified,
              } as FileMetadata);
            } else {
              (files as FileKey[]).push({
                key: meta.key,
              });
            }
          }
        } catch {
          // Skip files we can't read
        }
      }

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
    // Remove existing file first
    await this.remove(key);

    const { filePath, metaPath } = await getPaths(key);

    try {
      // Upload the file
      const fileUpload = new Upload({
        client: s3Client,
        params: {
          Bucket: this.bucket,
          Key: filePath,
          Body: value.stream(),
          ContentType: value.type,
        },
      });
      await fileUpload.done();

      // Upload the metadata
      const meta: StoredMetadata = {
        key,
        lastModified: value.lastModified,
        name: value.name,
        type: value.type,
      };

      const metaUpload = new Upload({
        client: s3Client,
        params: {
          Bucket: this.bucket,
          Key: metaPath,
          Body: JSON.stringify(meta),
          ContentType: 'application/json',
        },
      });
      await metaUpload.done();
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
      throw new Error('Failed to fetch file after put');
    }
    return file;
  }

  async remove(key: string): Promise<void> {
    const { filePath, metaPath } = await getPaths(key);

    try {
      await Promise.all([
        s3Client.send(
          new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: filePath,
          }),
        ),
        s3Client.send(
          new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: metaPath,
          }),
        ),
      ]);
    } catch (error) {
      console.error(
        `Failed to remove a file ${key} in bucket ${this.bucket}`,
        error,
      );
    }
  }
}
