import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Attaches user when a valid JWT exists; otherwise continues as anonymous. */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(_err: Error | null, user: TUser): TUser | null {
    return user ?? null;
  }
}
