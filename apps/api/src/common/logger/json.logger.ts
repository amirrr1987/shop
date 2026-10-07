import { ConsoleLogger, type LogLevel } from '@nestjs/common';

/**
 * Production-friendly structured logs (one JSON object per line).
 * Falls back to Nest's pretty console when LOG_FORMAT != json and not production.
 */
export class JsonLogger extends ConsoleLogger {
  private readonly json: boolean;

  constructor(context?: string) {
    super(context ?? 'Application');
    const format = (process.env.LOG_FORMAT || '').toLowerCase();
    this.json =
      format === 'json' ||
      (format !== 'pretty' && process.env.NODE_ENV === 'production');
  }

  protected override printMessages(
    messages: unknown[],
    context?: string,
    logLevel: LogLevel = 'log',
    writeStreamType?: 'stdout' | 'stderr',
  ) {
    if (!this.json) {
      super.printMessages(messages, context, logLevel, writeStreamType);
      return;
    }

    const stream =
      writeStreamType === 'stderr' ? process.stderr : process.stdout;

    for (const message of messages) {
      const line = {
        ts: new Date().toISOString(),
        level: logLevel,
        service: 'api',
        context: context || this.context || undefined,
        message:
          typeof message === 'string'
            ? message
            : message instanceof Error
              ? message.message
              : message,
        ...(message instanceof Error
          ? { stack: message.stack }
          : undefined),
      };
      stream.write(`${JSON.stringify(line)}\n`);
    }
  }
}
