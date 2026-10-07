import { mergeWishlistSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class MergeWishlistDto extends createZodDto(mergeWishlistSchema) {}
