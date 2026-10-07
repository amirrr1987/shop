import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { PublicUser } from '@shop/shared';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): PublicUser | null => {
    const request = context.switchToHttp().getRequest<{
      user?: PublicUser | null;
    }>();
    return request.user ?? null;
  },
);
