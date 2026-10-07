import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import type { Response } from 'express';

const DEFAULT_MESSAGES: Record<number, string> = {
  [HttpStatus.BAD_REQUEST]: 'درخواست نامعتبر است',
  [HttpStatus.UNAUTHORIZED]: 'لطفاً وارد شوید',
  [HttpStatus.FORBIDDEN]: 'دسترسی مجاز نیست',
  [HttpStatus.NOT_FOUND]: 'مورد پیدا نشد',
  [HttpStatus.CONFLICT]: 'تداخل در داده‌ها',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'خطای داخلی سرور',
};

const ENGLISH_DEFAULTS = new Set([
  'Bad Request',
  'Unauthorized',
  'Forbidden',
  'Not Found',
  'Conflict',
  'Internal Server Error',
]);

@Catch(HttpException)
export class PersianHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PersianHttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const payload = exception.getResponse();

    let message: string | string[] =
      DEFAULT_MESSAGES[status] ?? 'خطایی رخ داد';

    if (typeof payload === 'string') {
      message = ENGLISH_DEFAULTS.has(payload)
        ? (DEFAULT_MESSAGES[status] ?? payload)
        : payload;
    } else if (payload && typeof payload === 'object' && 'message' in payload) {
      const raw = (payload as { message?: string | string[] }).message;
      if (Array.isArray(raw)) {
        message = raw;
      } else if (typeof raw === 'string') {
        message = ENGLISH_DEFAULTS.has(raw)
          ? (DEFAULT_MESSAGES[status] ?? raw)
          : raw;
      }
    }

    if (status >= 500) {
      this.logger.error(
        typeof message === 'string' ? message : message.join(', '),
        exception.stack,
      );
      Sentry.captureException(exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: DEFAULT_MESSAGES[status] ?? 'Error',
    });
  }
}
