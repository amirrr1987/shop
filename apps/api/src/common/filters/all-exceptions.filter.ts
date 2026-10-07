import {
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import * as Sentry from '@sentry/nestjs';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    this.logger.error(
      exception instanceof Error ? exception.message : 'Unhandled exception',
      exception instanceof Error ? exception.stack : undefined,
    );
    Sentry.captureException(exception);

    if (!response.headersSent) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'خطای داخلی سرور',
        error: 'Internal Server Error',
      });
    }
  }
}
