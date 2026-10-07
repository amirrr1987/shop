import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  ContactList,
  ContactListQuery,
  ContactMessage,
  CreateContactMessageInput,
  UpdateContactStatusInput,
} from '@shop/shared';
import { randomUUID } from 'node:crypto';
import type { Repository } from 'typeorm';
import { ContactMessageEntity } from './contact-message.entity.js';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectRepository(ContactMessageEntity)
    private readonly messages: Repository<ContactMessageEntity>,
  ) {}

  async create(input: CreateContactMessageInput): Promise<{ id: string }> {
    if (input.company?.trim()) {
      this.logger.warn(`Contact honeypot tripped for ${input.email}`);
      // Fake success so bots do not retry with corrected payloads.
      return { id: randomUUID() };
    }

    const saved = await this.messages.save(
      this.messages.create({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone ?? null,
        subject: input.subject.trim(),
        message: input.message.trim(),
        status: 'new',
      }),
    );
    return { id: saved.id };
  }

  async findAllAdmin(query: ContactListQuery): Promise<ContactList> {
    const { page, perPage, status } = query;
    const qb = this.messages
      .createQueryBuilder('message')
      .orderBy('message.created_at', 'DESC')
      .skip((page - 1) * perPage)
      .take(perPage);

    if (status) {
      qb.andWhere('message.status = :status', { status });
    }

    const [rows, total] = await qb.getManyAndCount();
    return {
      items: rows.map((row) => this.toMessage(row)),
      total,
      page,
      perPage,
    };
  }

  async updateStatus(
    id: string,
    input: UpdateContactStatusInput,
  ): Promise<ContactMessage> {
    const row = await this.findEntity(id);
    row.status = input.status;
    return this.toMessage(await this.messages.save(row));
  }

  async remove(id: string) {
    const row = await this.findEntity(id);
    await this.messages.remove(row);
    return { id };
  }

  private async findEntity(id: string) {
    const row = await this.messages.findOne({ where: { id } });
    if (!row) {
      throw new NotFoundException('پیام پیدا نشد');
    }
    return row;
  }

  private toMessage(row: ContactMessageEntity): ContactMessage {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      subject: row.subject,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    };
  }
}
