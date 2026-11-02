import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { StorageService } from './storage.service.js';

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

@Injectable()
export class UploadsService {
  constructor(private readonly storage: StorageService) {}

  async saveImage(
    file: Express.Multer.File | undefined,
    folder: 'images' | 'reviews',
    opts: { maxEdge?: number } = {},
  ): Promise<{ url: string }> {
    if (!file?.buffer?.length) {
      throw new BadRequestException('فایل تصویر ارسال نشده است');
    }
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException('فقط JPEG، PNG، WebP یا GIF مجاز است');
    }

    const maxEdge = opts.maxEdge ?? (folder === 'reviews' ? 1600 : 2400);
    let pipeline = sharp(file.buffer, { failOn: 'none' }).rotate();
    const meta = await pipeline.metadata();
    if (meta.width && meta.height) {
      const longest = Math.max(meta.width, meta.height);
      if (longest > maxEdge) {
        pipeline = pipeline.resize({
          width: meta.width >= meta.height ? maxEdge : undefined,
          height: meta.height > meta.width ? maxEdge : undefined,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    }

    const output = await pipeline
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();

    const key = `${folder}/${randomUUID()}.jpg`;
    const stored = await this.storage.put(key, output, 'image/jpeg');
    return { url: stored.url };
  }
}
