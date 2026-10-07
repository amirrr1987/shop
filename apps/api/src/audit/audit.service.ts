import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  AuditLog,
  AuditLogList,
  AuditLogListQuery,
  PublicUser,
} from '@shop/shared';
import type { Repository } from 'typeorm';
import { AuditLogEntity } from './audit-log.entity.js';

export type AuditRecordInput = {
  actor?: PublicUser | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  meta?: Record<string, unknown> | null;
};

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly logs: Repository<AuditLogEntity>,
  ) {}

  async record(input: AuditRecordInput): Promise<void> {
    try {
      await this.logs.save(
        this.logs.create({
          actorUserId: input.actor?.id ?? null,
          actorEmail: input.actor?.email ?? null,
          action: input.action,
          entityType: input.entityType,
          entityId: input.entityId ?? null,
          meta: input.meta ?? null,
        }),
      );
    } catch (err) {
      this.logger.warn(
        `Failed to write audit log action=${input.action}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }
  }

  async findAllAdmin(query: AuditLogListQuery): Promise<AuditLogList> {
    const page = query.page;
    const perPage = query.perPage;
    const qb = this.logs
      .createQueryBuilder('log')
      .orderBy('log.createdAt', 'DESC')
      .skip((page - 1) * perPage)
      .take(perPage);

    if (query.action) {
      qb.andWhere('log.action = :action', { action: query.action });
    }

    const [rows, total] = await qb.getManyAndCount();
    return {
      items: rows.map((row) => this.toLog(row)),
      total,
      page,
      perPage,
    };
  }

  private toLog(row: AuditLogEntity): AuditLog {
    return {
      id: row.id,
      actorUserId: row.actorUserId,
      actorEmail: row.actorEmail,
      action: row.action,
      entityType: row.entityType,
      entityId: row.entityId,
      meta: row.meta,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
