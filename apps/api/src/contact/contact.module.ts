import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessageEntity } from './contact-message.entity.js';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessageEntity])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
