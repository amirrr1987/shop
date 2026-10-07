import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getHealth() {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        ok: true as const,
        db: 'up' as const,
        ts: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        ok: false,
        db: 'down',
        ts: new Date().toISOString(),
      });
    }
  }
}
