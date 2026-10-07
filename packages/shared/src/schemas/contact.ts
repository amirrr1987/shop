import { z } from 'zod';
import { CONTACT_STATUSES } from '../constants.js';
import { paginationQuerySchema } from './pagination.js';

export const contactMessageSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string().nullable(),
  subject: z.string(),
  message: z.string(),
  status: z.enum(CONTACT_STATUSES),
  createdAt: z.iso.datetime(),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;

export const contactListSchema = z.object({
  items: z.array(contactMessageSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  perPage: z.number().int().min(1),
});

export type ContactList = z.infer<typeof contactListSchema>;

export const createContactMessageSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  phone: z.string().trim().nullable().optional(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1),
  /** Honeypot — bots fill this; humans leave empty. */
  company: z.string().optional(),
});

export type CreateContactMessageInput = z.infer<
  typeof createContactMessageSchema
>;

export const updateContactStatusSchema = z.object({
  status: z.enum(CONTACT_STATUSES),
});

export type UpdateContactStatusInput = z.infer<
  typeof updateContactStatusSchema
>;

export const contactListQuerySchema = paginationQuerySchema.extend({
  status: z.enum(CONTACT_STATUSES).optional(),
});

export type ContactListQuery = z.infer<typeof contactListQuerySchema>;
