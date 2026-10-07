import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  computeLoyaltyEarn,
  computeLoyaltyRedeem,
  maxRedeemablePoints,
  type LoyaltyQuote,
  type LoyaltyQuoteRequest,
  type StoreSettings,
} from '@shop/shared';
import type { EntityManager, Repository } from 'typeorm';
import { OrderEntity } from '../orders/order.entity.js';
import { SettingsService } from '../settings/settings.service.js';
import { User } from '../users/user.entity.js';
import {
  LoyaltyLedgerEntity,
  type LoyaltyLedgerReason,
} from './loyalty-ledger.entity.js';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(LoyaltyLedgerEntity)
    private readonly ledger: Repository<LoyaltyLedgerEntity>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly settingsService: SettingsService,
  ) {}

  async quote(
    userId: string | null,
    input: LoyaltyQuoteRequest,
  ): Promise<LoyaltyQuote> {
    const settings = await this.settingsService.get();
    const balance = userId
      ? ((await this.users.findOne({ where: { id: userId } }))?.loyaltyPoints ??
        0)
      : 0;

    if (!settings.loyaltyEnabled) {
      return {
        enabled: false,
        balance,
        earnRialsPerPoint: settings.loyaltyEarnRialsPerPoint,
        redeemRialsPerPoint: settings.loyaltyRedeemRialsPerPoint,
        maxRedeemPercent: settings.loyaltyMaxRedeemPercent,
        maxRedeemablePoints: 0,
        discount: 0,
        pointsUsed: 0,
      };
    }

    const maxPoints = maxRedeemablePoints({
      balance,
      redeemRialsPerPoint: settings.loyaltyRedeemRialsPerPoint,
      subtotal: input.subtotal,
      couponDiscount: input.couponDiscount,
      maxRedeemPercent: settings.loyaltyMaxRedeemPercent,
    });
    const requested =
      input.pointsToRedeem === undefined ? maxPoints : input.pointsToRedeem;
    const redeemed = computeLoyaltyRedeem({
      pointsRequested: requested,
      balance,
      redeemRialsPerPoint: settings.loyaltyRedeemRialsPerPoint,
      subtotal: input.subtotal,
      couponDiscount: input.couponDiscount,
      maxRedeemPercent: settings.loyaltyMaxRedeemPercent,
    });

    return {
      enabled: true,
      balance,
      earnRialsPerPoint: settings.loyaltyEarnRialsPerPoint,
      redeemRialsPerPoint: settings.loyaltyRedeemRialsPerPoint,
      maxRedeemPercent: settings.loyaltyMaxRedeemPercent,
      maxRedeemablePoints: maxPoints,
      discount: redeemed.discount,
      pointsUsed: redeemed.pointsUsed,
    };
  }

  async lockUser(
    manager: EntityManager,
    userId: string,
  ): Promise<User> {
    const user = await manager
      .getRepository(User)
      .createQueryBuilder('user')
      .setLock('pessimistic_write')
      .where('user.id = :id', { id: userId })
      .getOne();
    if (!user) {
      throw new BadRequestException('کاربر پیدا نشد');
    }
    return user;
  }

  /** Preview redeem amounts without mutating (same rules as redeem). */
  previewRedeem(
    balance: number,
    pointsRequested: number | null | undefined,
    subtotal: number,
    couponDiscount: number,
    settings: StoreSettings,
  ): { loyaltyDiscount: number; loyaltyPointsRedeemed: number } {
    if (
      !settings.loyaltyEnabled ||
      !pointsRequested ||
      pointsRequested < 1
    ) {
      return { loyaltyDiscount: 0, loyaltyPointsRedeemed: 0 };
    }
    const { pointsUsed, discount } = computeLoyaltyRedeem({
      pointsRequested,
      balance,
      redeemRialsPerPoint: settings.loyaltyRedeemRialsPerPoint,
      subtotal,
      couponDiscount,
      maxRedeemPercent: settings.loyaltyMaxRedeemPercent,
    });
    return {
      loyaltyDiscount: discount,
      loyaltyPointsRedeemed: pointsUsed,
    };
  }

  /** Deduct previously previewed points from a locked user row. */
  async commitRedeem(
    manager: EntityManager,
    user: User,
    orderId: string,
    pointsUsed: number,
  ): Promise<void> {
    if (pointsUsed < 1) {
      return;
    }
    if (user.loyaltyPoints < pointsUsed) {
      throw new BadRequestException('امتیاز کافی نیست');
    }
    user.loyaltyPoints -= pointsUsed;
    await manager.getRepository(User).save(user);
    await this.writeLedger(manager, {
      userId: user.id,
      orderId,
      delta: -pointsUsed,
      balanceAfter: user.loyaltyPoints,
      reason: 'redeem',
    });
  }

  async awardForPaidOrder(order: OrderEntity): Promise<void> {
    if (!order.userId || (order.loyaltyPointsEarned ?? 0) > 0) {
      return;
    }
    const settings = await this.settingsService.get();
    if (!settings.loyaltyEnabled) {
      return;
    }

    const net = Math.max(0, order.subtotal - (order.discount ?? 0));
    const earned = computeLoyaltyEarn(
      net,
      settings.loyaltyEarnRialsPerPoint,
    );
    if (earned < 1) {
      return;
    }

    await this.users.manager.transaction(async (manager) => {
      const orderRepo = manager.getRepository(OrderEntity);
      const locked = await orderRepo
        .createQueryBuilder('order')
        .setLock('pessimistic_write')
        .where('order.id = :id', { id: order.id })
        .getOne();
      if (!locked?.userId || (locked.loyaltyPointsEarned ?? 0) > 0) {
        return;
      }
      if (locked.paymentStatus !== 'paid') {
        return;
      }

      const userRepo = manager.getRepository(User);
      const user = await userRepo
        .createQueryBuilder('user')
        .setLock('pessimistic_write')
        .where('user.id = :id', { id: locked.userId })
        .getOne();
      if (!user) {
        return;
      }

      user.loyaltyPoints += earned;
      await userRepo.save(user);
      locked.loyaltyPointsEarned = earned;
      await orderRepo.save(locked);
      await this.writeLedger(manager, {
        userId: user.id,
        orderId: locked.id,
        delta: earned,
        balanceAfter: user.loyaltyPoints,
        reason: 'earn',
      });
    });
  }

  /** Call inside cancel transaction before flipping paymentStatus. */
  async settleOnCancel(
    manager: EntityManager,
    order: OrderEntity,
  ): Promise<void> {
    const wasPaid =
      order.paymentStatus === 'paid' || order.paymentStatus === 'refunded';
    if (wasPaid) {
      await this.clawbackEarn(manager, order);
      return;
    }
    await this.releaseRedeem(manager, order);
  }

  private async releaseRedeem(
    manager: EntityManager,
    order: OrderEntity,
  ): Promise<void> {
    if (!order.userId || (order.loyaltyPointsRedeemed ?? 0) < 1) {
      return;
    }

    const userRepo = manager.getRepository(User);
    const user = await userRepo
      .createQueryBuilder('user')
      .setLock('pessimistic_write')
      .where('user.id = :id', { id: order.userId })
      .getOne();
    if (!user) {
      return;
    }

    const points = order.loyaltyPointsRedeemed;
    user.loyaltyPoints += points;
    await userRepo.save(user);
    order.loyaltyPointsRedeemed = 0;
    await this.writeLedger(manager, {
      userId: user.id,
      orderId: order.id,
      delta: points,
      balanceAfter: user.loyaltyPoints,
      reason: 'release',
    });
  }

  private async clawbackEarn(
    manager: EntityManager,
    order: OrderEntity,
  ): Promise<void> {
    if (!order.userId || (order.loyaltyPointsEarned ?? 0) < 1) {
      return;
    }

    const userRepo = manager.getRepository(User);
    const user = await userRepo
      .createQueryBuilder('user')
      .setLock('pessimistic_write')
      .where('user.id = :id', { id: order.userId })
      .getOne();
    if (!user) {
      return;
    }

    const claw = Math.min(user.loyaltyPoints, order.loyaltyPointsEarned);
    user.loyaltyPoints -= claw;
    await userRepo.save(user);
    order.loyaltyPointsEarned = 0;
    await this.writeLedger(manager, {
      userId: user.id,
      orderId: order.id,
      delta: -claw,
      balanceAfter: user.loyaltyPoints,
      reason: 'clawback',
    });
  }

  private writeLedger(
    manager: EntityManager,
    row: {
      userId: string;
      orderId: string | null;
      delta: number;
      balanceAfter: number;
      reason: LoyaltyLedgerReason;
    },
  ) {
    const repo = manager.getRepository(LoyaltyLedgerEntity);
    return repo.save(repo.create(row));
  }
}
