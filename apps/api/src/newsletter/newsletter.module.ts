import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterSubscriberEntity } from './newsletter-subscriber.entity.js';
import { NewsletterController } from './newsletter.controller.js';
import { NewsletterService } from './newsletter.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([NewsletterSubscriberEntity])],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
