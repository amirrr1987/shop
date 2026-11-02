import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { Env } from '../config/env.schema.js';

export type StoredObject = {
  /** Path or absolute URL stored on products/settings/reviews. */
  url: string;
  key: string;
};

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly driver: 'local' | 's3';
  private readonly uploadRoot: string;
  private readonly s3?: S3Client;
  private readonly bucket: string;
  private readonly publicBase: string;

  constructor(private readonly config: ConfigService<Env, true>) {
    this.driver = this.config.get('STORAGE_DRIVER', { infer: true });
    this.uploadRoot = join(
      process.cwd(),
      this.config.get('UPLOAD_DIR', { infer: true }),
    );
    this.bucket = this.config.get('S3_BUCKET', { infer: true }) || 'shop';
    this.publicBase = (
      this.config.get('S3_PUBLIC_URL', { infer: true }) || ''
    ).replace(/\/$/, '');

    if (this.driver === 's3') {
      const endpoint =
        this.config.get('S3_ENDPOINT', { infer: true }) || undefined;
      this.s3 = new S3Client({
        region: this.config.get('S3_REGION', { infer: true }),
        endpoint,
        forcePathStyle: this.config.get('S3_FORCE_PATH_STYLE', {
          infer: true,
        }),
        credentials: {
          accessKeyId:
            this.config.get('S3_ACCESS_KEY_ID', { infer: true }) || '',
          secretAccessKey:
            this.config.get('S3_SECRET_ACCESS_KEY', { infer: true }) || '',
        },
      });
      this.logger.log(`Storage driver=s3 bucket=${this.bucket}`);
    } else {
      this.logger.log(`Storage driver=local root=${this.uploadRoot}`);
    }
  }

  async put(
    key: string,
    body: Buffer,
    contentType: string,
  ): Promise<StoredObject> {
    if (this.driver === 's3') {
      if (!this.s3) {
        throw new Error('S3 client not initialized');
      }
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
        }),
      );
      const url = this.publicBase ? `${this.publicBase}/${key}` : `/${key}`;
      return { url, key };
    }

    const abs = join(this.uploadRoot, key);
    await mkdir(dirname(abs), { recursive: true });
    await writeFile(abs, body);
    return { url: `/uploads/${key.replace(/\\/g, '/')}`, key };
  }
}
