import {
  newsletterListQuerySchema,
  subscribeNewsletterSchema,
} from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class SubscribeNewsletterDto extends createZodDto(
  subscribeNewsletterSchema,
) {}

export class NewsletterListQueryDto extends createZodDto(
  newsletterListQuerySchema,
) {}
