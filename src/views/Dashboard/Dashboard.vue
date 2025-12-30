<template>
  <div class="dashboard">
    <!-- Stats Cards -->
    <Row :gutter="[16, 16]" class="mb-6">
      <Col :xs="24" :sm="12" :lg="6">
        <Card class="stat-card stat-card--sales">
          <Statistic
            title="فروش امروز"
            :value="stats.todaySales"
            :precision="0"
            suffix="تومان"
            :value-style="{ color: '#10b981', fontWeight: 700 }"
          >
            <template #prefix>
              <DollarOutlined />
            </template>
          </Statistic>
          <div class="stat-trend stat-trend--up">
            <ArrowUpOutlined /> ۱۲٪ نسبت به دیروز
          </div>
        </Card>
      </Col>
      <Col :xs="24" :sm="12" :lg="6">
        <Card class="stat-card stat-card--orders">
          <Statistic
            title="سفارشات امروز"
            :value="stats.todayOrders"
            :value-style="{ color: '#6366f1', fontWeight: 700 }"
          >
            <template #prefix>
              <ShoppingCartOutlined />
            </template>
          </Statistic>
          <div class="stat-trend stat-trend--up">
            <ArrowUpOutlined /> ۸٪ نسبت به دیروز
          </div>
        </Card>
      </Col>
      <Col :xs="24" :sm="12" :lg="6">
        <Card class="stat-card stat-card--products">
          <Statistic
            title="محصولات فعال"
            :value="stats.activeProducts"
            :value-style="{ color: '#f59e0b', fontWeight: 700 }"
          >
            <template #prefix>
              <ShoppingOutlined />
            </template>
          </Statistic>
          <div class="stat-info">
            {{ stats.lowStockProducts }} محصول کم موجودی
          </div>
        </Card>
      </Col>
      <Col :xs="24" :sm="12" :lg="6">
        <Card class="stat-card stat-card--users">
          <Statistic
            title="کاربران جدید"
            :value="stats.newUsers"
            :value-style="{ color: '#ec4899', fontWeight: 700 }"
          >
            <template #prefix>
              <UserAddOutlined />
            </template>
          </Statistic>
          <div class="stat-trend stat-trend--down">
            <ArrowDownOutlined /> ۳٪ نسبت به هفته قبل
          </div>
        </Card>
      </Col>
    </Row>

    <!-- Charts Row -->
    <Row :gutter="[16, 16]" class="mb-6">
      <Col :xs="24" :lg="16">
        <Card title="نمودار فروش هفتگی" class="chart-card">
          <div class="chart-container">
            <div class="chart-bars">
              <div
                v-for="(day, index) in weeklyData"
                :key="index"
                class="chart-bar-wrapper"
              >
                <div
                  class="chart-bar"
                  :style="{ height: `${(day.value / maxWeeklyValue) * 100}%` }"
                >
                  <span class="chart-bar-value">{{ formatNumber(day.value) }}</span>
                </div>
                <span class="chart-bar-label">{{ day.label }}</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :lg="8">
        <Card title="وضعیت سفارشات" class="chart-card">
          <div class="order-status-list">
            <div
              v-for="status in orderStatuses"
              :key="status.key"
              class="order-status-item"
            >
              <div class="order-status-info">
                <span class="order-status-dot" :style="{ background: status.color }"></span>
                <span class="order-status-label">{{ status.label }}</span>
              </div>
              <div class="order-status-value">
                <span class="order-status-count">{{ status.count }}</span>
                <Progress
                  :percent="status.percent"
                  :show-info="false"
                  :stroke-color="status.color"
                  size="small"
                  class="order-status-progress"
                />
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>

    <!-- Recent Orders & Top Products -->
    <Row :gutter="[16, 16]">
      <Col :xs="24" :lg="14">
        <Card title="سفارشات اخیر" class="orders-card">
          <template #extra>
            <Button type="link" size="small">مشاهده همه</Button>
          </template>
          <Table
            :columns="orderColumns"
            :dataSource="recentOrders"
            :pagination="false"
            size="small"
            :row-key="(record) => record.id"
          />
        </Card>
      </Col>
      <Col :xs="24" :lg="10">
        <Card title="پرفروش‌ترین محصولات" class="top-products-card">
          <template #extra>
            <Button type="link" size="small">مشاهده همه</Button>
          </template>
          <div class="top-products-list">
            <div
              v-for="(product, index) in topProducts"
              :key="product.id"
              class="top-product-item"
            >
              <div class="top-product-rank">{{ index + 1 }}</div>
              <Image
                :src="product.image"
                :width="48"
                :height="48"
                class="top-product-image"
                :preview="false"
                :fallback="fallbackImage"
              />
              <div class="top-product-info">
                <div class="top-product-name">{{ product.name }}</div>
                <div class="top-product-sales">{{ product.sales }} فروش</div>
              </div>
              <div class="top-product-revenue">
                {{ formatPrice(product.revenue) }}
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Progress,
  Image,
  Tag as AntTag,
  type TableColumnType,
} from 'ant-design-vue'
import {
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons-vue'
import { h, computed } from 'vue'

// Sample stats data
const stats = {
  todaySales: 12_450_000,
  todayOrders: 47,
  activeProducts: 234,
  lowStockProducts: 12,
  newUsers: 156,
}

// Weekly sales data
const weeklyData = [
  { label: 'شنبه', value: 8_500_000 },
  { label: 'یکشنبه', value: 12_300_000 },
  { label: 'دوشنبه', value: 9_800_000 },
  { label: 'سه‌شنبه', value: 15_200_000 },
  { label: 'چهارشنبه', value: 11_400_000 },
  { label: 'پنجشنبه', value: 18_600_000 },
  { label: 'جمعه', value: 7_200_000 },
]

const maxWeeklyValue = computed(() => Math.max(...weeklyData.map((d) => d.value)))

// Order statuses
const orderStatuses = [
  { key: 'pending', label: 'در انتظار پرداخت', count: 23, percent: 25, color: '#f59e0b' },
  { key: 'processing', label: 'در حال پردازش', count: 18, percent: 20, color: '#6366f1' },
  { key: 'shipped', label: 'ارسال شده', count: 31, percent: 34, color: '#3b82f6' },
  { key: 'delivered', label: 'تحویل داده شده', count: 156, percent: 85, color: '#10b981' },
  { key: 'cancelled', label: 'لغو شده', count: 8, percent: 9, color: '#ef4444' },
]

// Recent orders
const recentOrders = [
  {
    id: '1001',
    customer: 'علی محمدی',
    amount: 2_450_000,
    status: 'delivered',
    date: '۱۴۰۲/۱۰/۱۵',
  },
  {
    id: '1002',
    customer: 'سارا احمدی',
    amount: 1_890_000,
    status: 'shipped',
    date: '۱۴۰۲/۱۰/۱۵',
  },
  {
    id: '1003',
    customer: 'محمد رضایی',
    amount: 3_200_000,
    status: 'processing',
    date: '۱۴۰۲/۱۰/۱۴',
  },
  {
    id: '1004',
    customer: 'نازنین کریمی',
    amount: 980_000,
    status: 'pending',
    date: '۱۴۰۲/۱۰/۱۴',
  },
  {
    id: '1005',
    customer: 'امیر حسینی',
    amount: 4_500_000,
    status: 'delivered',
    date: '۱۴۰۲/۱۰/۱۳',
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'در انتظار', color: 'warning' },
  processing: { label: 'پردازش', color: 'processing' },
  shipped: { label: 'ارسال شده', color: 'blue' },
  delivered: { label: 'تحویل شده', color: 'success' },
  cancelled: { label: 'لغو شده', color: 'error' },
}

interface Order {
  id: string
  customer: string
  amount: number
  status: string
  date: string
}

const orderColumns: TableColumnType<Order>[] = [
  { title: 'شماره', dataIndex: 'id', width: 80 },
  { title: 'مشتری', dataIndex: 'customer' },
  {
    title: 'مبلغ',
    dataIndex: 'amount',
    customRender: ({ text }) => formatPrice(text),
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    customRender: ({ text }) => {
      const config = statusConfig[text]
      return h(AntTag, { color: config.color }, () => config.label)
    },
  },
  { title: 'تاریخ', dataIndex: 'date', width: 100 },
]

// Top products
const topProducts = [
  {
    id: 1,
    name: 'گوشی سامسونگ گلکسی S23',
    image: 'https://picsum.photos/seed/p1/100/100',
    sales: 89,
    revenue: 45_000_000,
  },
  {
    id: 2,
    name: 'لپ‌تاپ ایسوس ZenBook',
    image: 'https://picsum.photos/seed/p2/100/100',
    sales: 67,
    revenue: 38_500_000,
  },
  {
    id: 3,
    name: 'هدفون سونی WH-1000XM5',
    image: 'https://picsum.photos/seed/p3/100/100',
    sales: 54,
    revenue: 22_300_000,
  },
  {
    id: 4,
    name: 'تبلت اپل iPad Pro',
    image: 'https://picsum.photos/seed/p4/100/100',
    sales: 43,
    revenue: 18_900_000,
  },
  {
    id: 5,
    name: 'ساعت هوشمند شیائومی',
    image: 'https://picsum.photos/seed/p5/100/100',
    sales: 38,
    revenue: 12_400_000,
  },
]

const fallbackImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNNDAgNDVDNDAgNDIuMjM4NiA0Mi4yMzg2IDQwIDQ1IDQwSDU1QzU3Ljc2MTQgNDAgNjAgNDIuMjM4NiA2MCA0NVY1NUM2MCA1Ny43NjE0IDU3Ljc2MTQgNjAgNTUgNjBINDVDNDIuMjM4NiA2MCA0MCA1Ny43NjE0IDQwIDU1VjQ1WiIgZmlsbD0iIzlDQTNBRiIvPjwvc3ZnPg=='

// Formatters
const formatNumber = (num: number) => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`
  }
  return num.toString()
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
}
</script>

<style scoped>
.dashboard {
  min-height: 100%;
}

/* Stat Cards */
.stat-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-card--sales {
  border-top: 3px solid #10b981;
}

.stat-card--orders {
  border-top: 3px solid #6366f1;
}

.stat-card--products {
  border-top: 3px solid #f59e0b;
}

.stat-card--users {
  border-top: 3px solid #ec4899;
}

.stat-trend,
.stat-info {
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}

.stat-trend--up {
  color: #10b981;
}

.stat-trend--down {
  color: #ef4444;
}

/* Chart Card */
.chart-card {
  border-radius: 12px;
  height: 100%;
}

.chart-container {
  height: 250px;
  display: flex;
  align-items: flex-end;
  padding: 16px 0;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  gap: 8px;
}

.chart-bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
}

.chart-bar {
  width: 100%;
  max-width: 48px;
  background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 6px 6px 0 0;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.chart-bar:hover {
  background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%);
}

.chart-bar-value {
  position: absolute;
  top: -24px;
  font-size: 11px;
  font-weight: 600;
  color: #6366f1;
  white-space: nowrap;
}

.chart-bar-label {
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}

/* Order Status */
.order-status-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-status-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.order-status-info {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.order-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.order-status-label {
  font-size: 13px;
  color: #374151;
}

.order-status-value {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.order-status-count {
  font-weight: 600;
  min-width: 32px;
  text-align: left;
}

.order-status-progress {
  flex: 1;
  max-width: 100px;
}

/* Orders Card */
.orders-card,
.top-products-card {
  border-radius: 12px;
}

/* Top Products */
.top-products-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.top-product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.top-product-item:hover {
  background: #f9fafb;
}

.top-product-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-product-image {
  border-radius: 8px;
  object-fit: cover;
}

.top-product-info {
  flex: 1;
  min-width: 0;
}

.top-product-name {
  font-weight: 500;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-product-sales {
  font-size: 12px;
  color: #6b7280;
}

.top-product-revenue {
  font-weight: 600;
  color: #10b981;
  font-size: 13px;
  white-space: nowrap;
}
</style>
