import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Env } from '../../config/env.schema.js';
import { UsersService } from '../../users/users.service.js';
import {
  accessCookieName,
  resolveAuthClient,
  AUTH_CLIENT_HEADER,
} from '../auth.constants.js';

export type JwtPayload = {
  sub: string;
  email?: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService<Env, true>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const client = resolveAuthClient(req.headers?.[AUTH_CLIENT_HEADER]);
          const token = req.cookies?.[accessCookieName(client)];
          return typeof token === 'string' ? token : null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET', { infer: true }),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    if (!user || user.isActive === false) {
      throw new UnauthorizedException('نشست نامعتبر است');
    }
    return this.usersService.toPublicUser(user);
  }
}
