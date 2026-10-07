import { z } from 'zod';
import { paginationQuerySchema } from './pagination.js';

export const newsletterSubscriberSchema = z.object({
  id: z.string(),
  email: z.email(),
  createdAt: z.iso.datetime(),
});

export type NewsletterSubscriber = z.infer<typeof newsletterSubscriberSchema>;

export const newsletterListSchema = z.object({
  items: z.array(newsletterSubscriberSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  perPage: z.number().int().min(1),
});

export type NewsletterList = z.infer<typeof newsletterListSchema>;

export const subscribeNewsletterSchema = z.object({
  email: z.email(),
  /** Honeypot — bots fill this; humans leave empty. */
  company: z.string().optional(),
});

export type SubscribeNewsletterInput = z.infer<
  typeof subscribeNewsletterSchema
>;

export const newsletterListQuerySchema = paginationQuerySchema;

export type NewsletterListQuery = z.infer<typeof newsletterListQuerySchema>;
