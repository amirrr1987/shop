import { mergeCartSchema, replaceCartSchema } from '@shop/shared';
import { createZodDto } from 'nestjs-zod';

export class ReplaceCartDto extends createZodDto(replaceCartSchema) {}

export class MergeCartDto extends createZodDto(mergeCartSchema) {}
