import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { SalesReport, SalesReportQuery } from '@shop/shared';
import { DataSource, type Repository } from 'typeorm';
import { OrderEntity } from '../orders/order.entity.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async sales(query: SalesReportQuery): Promise<SalesReport> {
    const dayCount = query.days;
    const todayStart = startOfLocalDay(new Date());
    const rangeStart = new Date(todayStart);
    rangeStart.setDate(rangeStart.getDate() - (dayCount - 1));

    const [
      rangeOrders,
      orderCount,
      pendingOrders,
      unpaidOrders,
      paidAgg,
      todayOrders,
      topProducts,
      topCategories,
      rangePaidAgg,
    ] = await Promise.all([
      this.orders
        .createQueryBuilder('order')
        .where('order.createdAt >= :rangeStart', { rangeStart })
        .getMany(),
      this.orders.count(),
      this.orders.count({ where: { status: 'pending' } }),
      this.orders.count({ where: { paymentStatus: 'pending' } }),
      this.orders
        .createQueryBuilder('order')
        .select('COUNT(*)', 'count')
        .addSelect('COALESCE(SUM(order.total), 0)', 'revenue')
        .where('order.paymentStatus = :paid', { paid: 'paid' })
        .getRawOne<{ count: string; revenue: string }>(),
      this.orders
        .createQueryBuilder('order')
        .where('order.createdAt >= :todayStart', { todayStart })
        .getMany(),
      this.dataSource.query<
        Array<{
          product_id: string;
          name: string;
          quantity: string;
          revenue: string;
        }>
      >(
        `
        SELECT
          oi.product_id::text AS product_id,
          MAX(oi.name) AS name,
          COALESCE(SUM(oi.quantity), 0)::text AS quantity,
          COALESCE(SUM(oi.unit_price * oi.quantity), 0)::text AS revenue
        FROM order_items oi
        INNER JOIN orders o ON o.id = oi.order_id
        WHERE o.payment_status = 'paid'
          AND o.created_at >= $1
        GROUP BY oi.product_id
        ORDER BY COALESCE(SUM(oi.unit_price * oi.quantity), 0) DESC
        LIMIT 10
        `,
        [rangeStart],
      ),
      this.dataSource.query<
        Array<{
          category_id: string;
          name: string;
          quantity: string;
          revenue: string;
        }>
      >(
        `
        SELECT
          c.id::text AS category_id,
          c.name AS name,
          COALESCE(SUM(oi.quantity), 0)::text AS quantity,
          COALESCE(SUM(oi.unit_price * oi.quantity), 0)::text AS revenue
        FROM order_items oi
        INNER JOIN orders o ON o.id = oi.order_id
        INNER JOIN products p ON p.id = oi.product_id
        INNER JOIN categories c ON c.id = p.category_id
        WHERE o.payment_status = 'paid'
          AND o.created_at >= $1
        GROUP BY c.id, c.name
        ORDER BY COALESCE(SUM(oi.unit_price * oi.quantity), 0) DESC
        LIMIT 10
        `,
        [rangeStart],
      ),
      this.orders
        .createQueryBuilder('order')
        .select('COUNT(*)', 'count')
        .addSelect('COALESCE(SUM(order.total), 0)', 'revenue')
        .where('order.paymentStatus = :paid', { paid: 'paid' })
        .andWhere('order.createdAt >= :rangeStart', { rangeStart })
        .getRawOne<{ count: string; revenue: string }>(),
    ]);

    const byDate = new Map<
      string,
      { orders: number; paidOrders: number; revenue: number }
    >();

    for (let offset = 0; offset < dayCount; offset += 1) {
      const day = new Date(rangeStart);
      day.setDate(rangeStart.getDate() + offset);
      byDate.set(formatDateKey(day), {
        orders: 0,
        paidOrders: 0,
        revenue: 0,
      });
    }

    for (const order of rangeOrders) {
      const key = formatDateKey(order.createdAt);
      const bucket = byDate.get(key);
      if (!bucket) continue;
      bucket.orders += 1;
      if (order.paymentStatus === 'paid') {
        bucket.paidOrders += 1;
        bucket.revenue += order.total;
      }
    }

    const todayRevenue = todayOrders
      .filter((order) => order.paymentStatus === 'paid')
      .reduce((sum, order) => sum + order.total, 0);

    const rangePaidCount = Number(rangePaidAgg?.count) || 0;
    const rangePaidRevenue = Number(rangePaidAgg?.revenue) || 0;

    return {
      days: [...byDate.entries()].map(([date, value]) => ({
        date,
        ...value,
      })),
      totals: {
        orders: orderCount,
        paidOrders: Number(paidAgg?.count) || 0,
        revenue: Number(paidAgg?.revenue) || 0,
        pendingOrders,
        unpaidOrders,
        aov:
          rangePaidCount > 0
            ? Math.floor(rangePaidRevenue / rangePaidCount)
            : 0,
      },
      today: {
        orders: todayOrders.length,
        revenue: todayRevenue,
      },
      topProducts: topProducts.map((row) => ({
        productId: row.product_id,
        name: row.name,
        quantity: Number(row.quantity) || 0,
        revenue: Number(row.revenue) || 0,
      })),
      topCategories: topCategories.map((row) => ({
        categoryId: row.category_id,
        name: row.name,
        quantity: Number(row.quantity) || 0,
        revenue: Number(row.revenue) || 0,
      })),
    };
  }
}

function startOfLocalDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function formatDateKey(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
