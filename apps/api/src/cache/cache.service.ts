import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import type { Env } from '../config/env.schema.js';

type MemoryEntry = { value: string; expiresAt: number };

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private redis: Redis | null = null;
  private readonly memory = new Map<string, MemoryEntry>();
  private enabled = false;

  constructor(private readonly config: ConfigService<Env, true>) {}

  async onModuleInit() {
    const enabled = this.config.get('REDIS_ENABLED', { infer: true });
    if (!enabled) {
      this.logger.log('Cache: Redis disabled (REDIS_ENABLED=false)');
      return;
    }

    const url = this.config.get('REDIS_URL', { infer: true });
    let client: Redis | null = null;
    try {
      client = new Redis(url, {
        maxRetriesPerRequest: 1,
        connectTimeout: 2000,
        retryStrategy: () => null,
        lazyConnect: true,
      });
      client.on('error', (err: Error) => {
        this.logger.warn(`Redis error: ${err.message}`);
      });
      await client.connect();
      await client.ping();
      this.redis = client;
      this.enabled = true;
      this.logger.log(`Cache: Redis connected (${url})`);
    } catch (err) {
      if (client) {
        client.disconnect();
      }
      this.logger.warn(
        `Cache: Redis unavailable, using in-memory fallback (${
          err instanceof Error ? err.message : 'unknown'
        })`,
      );
      this.redis = null;
      this.enabled = true;
    }
  }

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.quit().catch(() => undefined);
      this.redis = null;
    }
    this.memory.clear();
  }

  get isEnabled() {
    return this.enabled;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.enabled) {
      return null;
    }
    try {
      if (this.redis) {
        const raw = await this.redis.get(key);
        return raw ? (JSON.parse(raw) as T) : null;
      }
      const entry = this.memory.get(key);
      if (!entry) {
        return null;
      }
      if (entry.expiresAt <= Date.now()) {
        this.memory.delete(key);
        return null;
      }
      return JSON.parse(entry.value) as T;
    } catch (err) {
      this.logger.warn(
        `Cache get failed for ${key}: ${
          err instanceof Error ? err.message : 'unknown'
        }`,
      );
      return null;
    }
  }

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    if (!this.enabled || ttlSeconds <= 0) {
      return;
    }
    const raw = JSON.stringify(value);
    try {
      if (this.redis) {
        await this.redis.set(key, raw, 'EX', ttlSeconds);
        return;
      }
      this.memory.set(key, {
        value: raw,
        expiresAt: Date.now() + ttlSeconds * 1000,
      });
    } catch (err) {
      this.logger.warn(
        `Cache set failed for ${key}: ${
          err instanceof Error ? err.message : 'unknown'
        }`,
      );
    }
  }

  async del(...keys: string[]): Promise<void> {
    if (!this.enabled || !keys.length) {
      return;
    }
    try {
      if (this.redis) {
        await this.redis.del(...keys);
        return;
      }
      for (const key of keys) {
        this.memory.delete(key);
      }
    } catch (err) {
      this.logger.warn(
        `Cache del failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
    }
  }

  async delByPrefix(prefix: string): Promise<void> {
    if (!this.enabled || !prefix) {
      return;
    }
    try {
      if (this.redis) {
        let cursor = '0';
        do {
          const [next, keys] = await this.redis.scan(
            cursor,
            'MATCH',
            `${prefix}*`,
            'COUNT',
            100,
          );
          cursor = next;
          if (keys.length) {
            await this.redis.del(...keys);
          }
        } while (cursor !== '0');
        return;
      }
      for (const key of this.memory.keys()) {
        if (key.startsWith(prefix)) {
          this.memory.delete(key);
        }
      }
    } catch (err) {
      this.logger.warn(
        `Cache delByPrefix failed for ${prefix}: ${
          err instanceof Error ? err.message : 'unknown'
        }`,
      );
    }
  }

  async getOrSet<T>(
    key: string,
    ttlSeconds: number,
    factory: () => Promise<T>,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }
    const value = await factory();
    await this.set(key, value, ttlSeconds);
    return value;
  }
}
