import { z } from 'zod';
import { AUDIT_ACTIONS } from '../constants.js';
import { paginationQuerySchema } from './pagination.js';

export const auditLogSchema = z.object({
  id: z.string(),
  actorUserId: z.string().nullable(),
  actorEmail: z.string().nullable(),
  action: z.string(),
  entityType: z.string().nullable(),
  entityId: z.string().nullable(),
  meta: z.record(z.string(), z.unknown()).nullable(),
  createdAt: z.iso.datetime(),
});

export type AuditLog = z.infer<typeof auditLogSchema>;

export const auditLogListSchema = z.object({
  items: z.array(auditLogSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  perPage: z.number().int().min(1),
});

export type AuditLogList = z.infer<typeof auditLogListSchema>;

export const auditLogListQuerySchema = paginationQuerySchema.extend({
  action: z.enum(AUDIT_ACTIONS).optional(),
});

export type AuditLogListQuery = z.infer<typeof auditLogListQuerySchema>;
