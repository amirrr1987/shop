import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env.schema.js';
import { OrdersService } from './orders.service.js';

@Injectable()
export class OrdersCleanupService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrdersCleanupService.name);
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  onModuleInit() {
    const ttlMinutes = this.config.get('ORDER_UNPAID_TTL_MINUTES', {
      infer: true,
    });
    if (ttlMinutes < 1) {
      this.logger.warn('ORDER_UNPAID_TTL_MINUTES < 1 — cleanup disabled');
      return;
    }

    const intervalMs = Math.min(
      Math.max(Math.floor((ttlMinutes * 60_000) / 4), 60_000),
      15 * 60_000,
    );

    void this.runCleanup();
    this.timer = setInterval(() => {
      void this.runCleanup();
    }, intervalMs);
    this.timer.unref?.();

    this.logger.log(
      `Unpaid order cleanup every ${Math.round(intervalMs / 1000)}s (ttl=${ttlMinutes}m)`,
    );
  }

  onModuleDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async runCleanup() {
    const ttlMinutes = this.config.get('ORDER_UNPAID_TTL_MINUTES', {
      infer: true,
    });
    try {
      const cancelled = await this.ordersService.cancelExpiredUnpaid(ttlMinutes);
      if (cancelled > 0) {
        this.logger.log(`Cancelled ${cancelled} expired unpaid order(s)`);
      }
    } catch (err) {
      this.logger.error('Unpaid order cleanup failed', err as Error);
    }
  }
}
