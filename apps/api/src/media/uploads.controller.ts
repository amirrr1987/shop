import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCookieAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CATALOG_WRITE_ROLES } from '@shop/shared';
import { memoryStorage } from 'multer';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { UploadsService } from './uploads.service.js';

const imageUpload = FileInterceptor('file', {
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new BadRequestException('فقط فایل تصویری مجاز است') as Error, false);
      return;
    }
    cb(null, true);
  },
});

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...CATALOG_WRITE_ROLES)
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(imageUpload)
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.saveImage(file, 'images');
  }

  @Post('review-images')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(imageUpload)
  uploadReviewImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.saveImage(file, 'reviews', { maxEdge: 1600 });
  }
}
