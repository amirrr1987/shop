import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  AdminUser,
  AdminUsersQuery,
  CreateAdminUserInput,
  PublicUser,
  SetUserActiveInput,
  UpdateAdminUserInput,
  UpdateUserRoleInput,
  UserRole,
} from '@shop/shared';
import {
  OPS_ROLES,
  PANEL_ROLES,
  isPanelRole,
} from '@shop/shared';
import * as bcrypt from 'bcrypt';
import { DataSource, In, type FindOptionsWhere, type Repository } from 'typeorm';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  findById(id: string) {
    return this.users.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.users.findOne({ where: { email } });
  }

  findByIds(ids: string[]) {
    if (!ids.length) {
      return Promise.resolve([] as User[]);
    }
    return this.users.find({ where: { id: In(ids) } });
  }

  async findAllAdmin(query: AdminUsersQuery = {}): Promise<AdminUser[]> {
    const where: FindOptionsWhere<User> | FindOptionsWhere<User>[] =
      query.scope === 'customers'
        ? { role: 'customer' }
        : query.scope === 'staff'
          ? PANEL_ROLES.map((role) => ({ role }))
          : {};

    const rows = await this.users.find({
      where,
      order: { createdAt: 'DESC' },
    });
    const stats = await this.loadOrderStats(rows.map((row) => row.id));
    return rows.map((user) => this.toAdminUser(user, stats.get(user.id)));
  }

  async createByAdmin(
    actor: PublicUser,
    input: CreateAdminUserInput,
  ): Promise<AdminUser> {
    this.assertActorIsOps(actor);
    this.assertCanAssignRole(actor, input.role);

    const email = input.email.toLowerCase().trim();
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new ConflictException('این ایمیل قبلاً ثبت شده است');
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.create({
      email,
      passwordHash,
      fullName: input.fullName.trim(),
      role: input.role,
    });
    return this.toAdminUser(user);
  }

  create(
    data: Pick<User, 'email' | 'passwordHash' | 'fullName'> & {
      role?: UserRole;
      isActive?: boolean;
    },
  ) {
    return this.users.save(
      this.users.create({
        role: 'customer',
        isActive: true,
        ...data,
      }),
    );
  }

  async setRole(
    actor: PublicUser,
    id: string,
    input: UpdateUserRoleInput,
  ): Promise<AdminUser> {
    const user = await this.requireUser(id);
    this.assertCanManageTarget(actor, user);
    this.assertCanAssignRole(actor, input.role);
    await this.ensureNotLastOwner(user, input.role);

    user.role = input.role;
    await this.users.save(user);
    const stats = await this.loadOrderStats([user.id]);
    return this.toAdminUser(user, stats.get(user.id));
  }

  async updateByAdmin(
    actor: PublicUser,
    id: string,
    input: UpdateAdminUserInput,
  ): Promise<AdminUser> {
    const user = await this.requireUser(id);
    this.assertCanManageTarget(actor, user);

    if (input.role !== undefined) {
      this.assertCanAssignRole(actor, input.role);
      await this.ensureNotLastOwner(user, input.role);
      user.role = input.role;
    }

    if (input.fullName !== undefined) {
      user.fullName = input.fullName.trim();
    }

    if (input.email !== undefined) {
      const email = input.email.toLowerCase().trim();
      if (email !== user.email) {
        const existing = await this.findByEmail(email);
        if (existing && existing.id !== user.id) {
          throw new ConflictException('این ایمیل قبلاً ثبت شده است');
        }
        user.email = email;
      }
    }

    if (input.password !== undefined) {
      user.passwordHash = await bcrypt.hash(input.password, 10);
    }

    await this.users.save(user);
    const stats = await this.loadOrderStats([user.id]);
    return this.toAdminUser(user, stats.get(user.id));
  }

  async setActive(
    actor: PublicUser,
    id: string,
    input: SetUserActiveInput,
  ): Promise<AdminUser> {
    const user = await this.requireUser(id);

    if (actor.id === id) {
      throw new BadRequestException('نمی‌توانید وضعیت خودتان را تغییر دهید');
    }

    // Only owner may deactivate/reactivate panel users.
    if (actor.role !== 'owner') {
      throw new ForbiddenException('فقط مدیر کل می‌تواند کاربر را غیرفعال کند');
    }

    this.assertCanManageTarget(actor, user);

    if (!input.isActive && user.role === 'owner') {
      const ownerCount = await this.users.count({
        where: { role: 'owner', isActive: true },
      });
      if (ownerCount <= 1) {
        throw new BadRequestException('نمی‌توان آخرین مدیر کل را غیرفعال کرد');
      }
    }

    user.isActive = input.isActive;
    await this.users.save(user);
    const stats = await this.loadOrderStats([user.id]);
    return this.toAdminUser(user, stats.get(user.id));
  }

  async updateFullName(id: string, fullName: string) {
    await this.users.update({ id }, { fullName });
    return this.findById(id);
  }

  async updatePasswordHash(id: string, passwordHash: string) {
    await this.users.update({ id }, { passwordHash });
  }

  toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      loyaltyPoints: user.loyaltyPoints ?? 0,
    };
  }

  toAdminUser(
    user: User,
    stats?: { orderCount: number; orderTotal: number },
  ): AdminUser {
    return {
      ...this.toPublicUser(user),
      createdAt: user.createdAt.toISOString(),
      orderCount: stats?.orderCount ?? 0,
      orderTotal: stats?.orderTotal ?? 0,
      isActive: user.isActive !== false,
    };
  }

  private async requireUser(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('کاربر پیدا نشد');
    }
    return user;
  }

  private assertActorIsOps(actor: PublicUser) {
    if (!(OPS_ROLES as readonly string[]).includes(actor.role)) {
      throw new ForbiddenException('دسترسی کافی نیست');
    }
  }

  private assertCanManageTarget(actor: PublicUser, target: User) {
    this.assertActorIsOps(actor);

    if (actor.role === 'admin') {
      if (target.role === 'owner' || target.role === 'admin') {
        throw new ForbiddenException('اجازه مدیریت این کاربر را ندارید');
      }
      return;
    }

    // owner may manage anyone except demoting last owner (checked separately)
  }

  private assertCanAssignRole(actor: PublicUser, role: UserRole) {
    this.assertActorIsOps(actor);

    if (actor.role === 'admin') {
      if (role !== 'viewer' && role !== 'editor' && role !== 'customer') {
        throw new ForbiddenException(
          'مدیر فقط می‌تواند ناظر یا ویرایشگر تعیین کند',
        );
      }
      return;
    }

    // owner may assign any role
    if (isPanelRole(role) || role === 'customer') {
      return;
    }
    throw new BadRequestException('نقش نامعتبر است');
  }

  private async ensureNotLastOwner(user: User, nextRole: UserRole) {
    if (user.role !== 'owner' || nextRole === 'owner') {
      return;
    }
    const ownerCount = await this.users.count({
      where: { role: 'owner', isActive: true },
    });
    if (ownerCount <= 1) {
      throw new BadRequestException('نمی‌توان آخرین مدیر کل را تغییر نقش داد');
    }
  }

  private async loadOrderStats(userIds: string[]) {
    const map = new Map<string, { orderCount: number; orderTotal: number }>();
    if (!userIds.length) {
      return map;
    }

    const rows = await this.dataSource.query<
      Array<{ user_id: string; order_count: string; order_total: string }>
    >(
      `
      SELECT
        user_id::text AS user_id,
        COUNT(*)::text AS order_count,
        COALESCE(SUM(total), 0)::text AS order_total
      FROM orders
      WHERE user_id = ANY($1::uuid[])
      GROUP BY user_id
      `,
      [userIds],
    );

    for (const row of rows) {
      map.set(row.user_id, {
        orderCount: Number(row.order_count) || 0,
        orderTotal: Number(row.order_total) || 0,
      });
    }
    return map;
  }
}
