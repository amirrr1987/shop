import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  NewsletterList,
  NewsletterListQuery,
  NewsletterSubscriber,
  SubscribeNewsletterInput,
} from '@shop/shared';
import { randomUUID } from 'node:crypto';
import type { Repository } from 'typeorm';
import { NewsletterSubscriberEntity } from './newsletter-subscriber.entity.js';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    @InjectRepository(NewsletterSubscriberEntity)
    private readonly subscribers: Repository<NewsletterSubscriberEntity>,
  ) {}

  async subscribe(
    input: SubscribeNewsletterInput,
  ): Promise<{ id: string; alreadySubscribed: boolean }> {
    if (input.company?.trim()) {
      this.logger.warn(`Newsletter honeypot tripped for ${input.email}`);
      return { id: randomUUID(), alreadySubscribed: false };
    }

    const email = input.email.trim().toLowerCase();
    const existing = await this.subscribers.findOne({ where: { email } });
    if (existing) {
      return { id: existing.id, alreadySubscribed: true };
    }

    const saved = await this.subscribers.save(
      this.subscribers.create({ email }),
    );
    return { id: saved.id, alreadySubscribed: false };
  }

  async findAllAdmin(query: NewsletterListQuery): Promise<NewsletterList> {
    const { page, perPage } = query;
    const [rows, total] = await this.subscribers.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      items: rows.map((row) => this.toSubscriber(row)),
      total,
      page,
      perPage,
    };
  }

  async remove(id: string) {
    const row = await this.subscribers.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('مشترک پیدا نشد');
    }
    await this.subscribers.remove(row);
    return { id };
  }

  private toSubscriber(row: NewsletterSubscriberEntity): NewsletterSubscriber {
    return {
      id: row.id,
      email: row.email,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
