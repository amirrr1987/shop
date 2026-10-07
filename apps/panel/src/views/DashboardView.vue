<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import {
  Badge,
  Button,
  Card,
  Col,
  Progress,
  Radio,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  TypographyTitle,
} from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import type {
  AdminOrder,
  Category,
  ContactList,
  Product,
  SalesReport,
  SalesTopCategory,
  SalesTopProduct,
} from '@shop/shared'
import {
  ORDER_STATUS_LABELS_FA,
  PAYMENT_STATUS_LABELS_FA,
} from '@shop/shared'
import {
  CloseCircleOutlined,
  MailOutlined,
  WarningOutlined,
} from '@ant-design/icons-vue'
import gsap from 'gsap'
import SalesTrendChart from '@/components/SalesTrendChart.vue'
import { api } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { dayjs } from '@/utils/date'
import { formatMoney, formatNumber } from '@/utils/format'
import {
  LOW_STOCK_THRESHOLD,
  ORDER_STATUS_COLOR,
  PAYMENT_STATUS_COLOR,
  stockTag,
} from '@/utils/status'
import {
  ORDER_STATUS_ICON,
  PAYMENT_STATUS_ICON,
} from '@/utils/status-icons'

const router = useRouter()
const rootRef = ref<HTMLElement | null>(null)
const reportDays = ref(7)
let ctx: gsap.Context | undefined

type DaySale = {
  key: string
  label: string
  orders: number
  revenue: number
}

const lowStockColumns: TableColumnType<Product>[] = [
  { title: 'محصول', dataIndex: 'name', key: 'name' },
  { title: 'موجودی', dataIndex: 'stock', key: 'stock', width: 100 },
  { title: 'وضعیت', key: 'status', width: 110 },
]

const recentOrderColumns: TableColumnType<AdminOrder>[] = [
  { title: 'مشتری', key: 'customer', ellipsis: true },
  { title: 'مبلغ', key: 'total', width: 120 },
  { title: 'وضعیت', key: 'status', width: 120 },
  { title: 'پرداخت', key: 'payment', width: 120 },
]

const daySaleColumns: TableColumnType<DaySale>[] = [
  { title: 'روز', dataIndex: 'label', key: 'label', width: 110 },
  { title: 'سفارش', dataIndex: 'orders', key: 'orders', width: 80 },
  { title: 'فروش', key: 'revenue' },
  { title: 'سهم', key: 'share', width: 120 },
]

const topProductColumns: TableColumnType<SalesTopProduct>[] = [
  { title: 'محصول', dataIndex: 'name', key: 'name', ellipsis: true },
  { title: 'تعداد', dataIndex: 'quantity', key: 'quantity', width: 80 },
  { title: 'فروش', key: 'revenue', width: 140 },
]

const topCategoryColumns: TableColumnType<SalesTopCategory>[] = [
  { title: 'دسته', dataIndex: 'name', key: 'name', ellipsis: true },
  { title: 'تعداد', dataIndex: 'quantity', key: 'quantity', width: 80 },
  { title: 'فروش', key: 'revenue', width: 140 },
]

const { data, isPending } = useQuery({
  queryKey: computed(() => [...queryKeys.dashboard, reportDays.value]),
  queryFn: async () => {
    const days = reportDays.value
    const [categories, products, orders, contacts, sales] = await Promise.all([
      api<Category[]>('/categories'),
      api<{ items: Product[]; total: number }>('/products/admin', {
        params: { perPage: 100, sort: 'newest' },
      }),
      api<AdminOrder[]>('/orders/admin'),
      api<ContactList>('/contact/admin', {
        params: { page: 1, perPage: 1, status: 'new' },
      }),
      api<SalesReport>('/reports/sales', { params: { days } }),
    ])

    const lowStock = products.items
      .filter((item) => item.stock <= LOW_STOCK_THRESHOLD)
      .sort((a, b) => a.stock - b.stock)

    const daySales: DaySale[] = sales.days.map((day) => ({
      key: day.date,
      label: dayjs(day.date).calendar('jalali').locale('fa').format(
        days > 14 ? 'D MMM' : 'dddd D',
      ),
      orders: day.orders,
      revenue: day.revenue,
    }))

    const rangeRevenue = daySales.reduce((sum, day) => sum + day.revenue, 0)
    const rangeOrders = daySales.reduce((sum, day) => sum + day.orders, 0)

    return {
      categoryCount: categories.length,
      productCount: products.total,
      featuredCount: products.items.filter((item) => item.isFeatured).length,
      orderCount: sales.totals.orders,
      lowStock,
      recentOrders: orders.slice(0, 5),
      pendingOrders: sales.totals.pendingOrders,
      unpaidOrders: sales.totals.unpaidOrders,
      revenueTotal: sales.totals.revenue,
      aov: sales.totals.aov,
      todayOrderCount: sales.today.orders,
      todayRevenue: sales.today.revenue,
      rangeOrders,
      rangeRevenue,
      daySales,
      topProducts: sales.topProducts,
      topCategories: sales.topCategories,
      newContactCount: contacts.total,
    }
  },
})

const categoryCount = computed(() => data.value?.categoryCount ?? 0)
const productCount = computed(() => data.value?.productCount ?? 0)
const featuredCount = computed(() => data.value?.featuredCount ?? 0)
const orderCount = computed(() => data.value?.orderCount ?? 0)
const lowStock = computed(() => data.value?.lowStock ?? [])
const recentOrders = computed(() => data.value?.recentOrders ?? [])
const pendingOrders = computed(() => data.value?.pendingOrders ?? 0)
const unpaidOrders = computed(() => data.value?.unpaidOrders ?? 0)
const revenueTotal = computed(() => data.value?.revenueTotal ?? 0)
const aov = computed(() => data.value?.aov ?? 0)
const todayOrderCount = computed(() => data.value?.todayOrderCount ?? 0)
const todayRevenue = computed(() => data.value?.todayRevenue ?? 0)
const rangeOrders = computed(() => data.value?.rangeOrders ?? 0)
const rangeRevenue = computed(() => data.value?.rangeRevenue ?? 0)
const daySales = computed(() => data.value?.daySales ?? [])
const topProducts = computed(() => data.value?.topProducts ?? [])
const topCategories = computed(() => data.value?.topCategories ?? [])
const newContactCount = computed(() => data.value?.newContactCount ?? 0)
const maxDayRevenue = computed(() =>
  Math.max(1, ...daySales.value.map((day) => day.revenue)),
)
const chartPoints = computed(() =>
  daySales.value.map((day) => ({
    label: day.label,
    revenue: day.revenue,
    orders: day.orders,
  })),
)


onMounted(() => {
  if (!rootRef.value) return
  ctx = gsap.context(() => {
    gsap.from('.dash-card', {
      autoAlpha: 0,
      y: 16,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
    })
  }, rootRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="rootRef">
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
      "
    >
      <TypographyTitle :level="3" style="margin: 0">
        داشبورد
      </TypographyTitle>
      <Radio.Group v-model:value="reportDays" button-style="solid" size="small">
        <Radio.Button :value="7">۷ روز</Radio.Button>
        <Radio.Button :value="30">۳۰ روز</Radio.Button>
        <Radio.Button :value="90">۹۰ روز</Radio.Button>
      </Radio.Group>
    </div>

    <Row :gutter="16">
      <Col :xs="24" :sm="12" :xl="6">
        <Card class="dash-card" :loading="isPending">
          <Statistic
            title="فروش پرداخت‌شده (کل)"
            :value="revenueTotal"
            :value-style="{ color: '#52c41a' }"
            :formatter="(val) => formatMoney(Number(val))"
          />
        </Card>
      </Col>
      <Col :xs="24" :sm="12" :xl="6">
        <Card class="dash-card" :loading="isPending">
          <Statistic
            title="فروش امروز"
            :value="todayRevenue"
            :value-style="{ color: '#1677ff' }"
            :formatter="(val) => formatMoney(Number(val))"
          />
          <Tag style="margin-top: 8px">
            {{ formatNumber(todayOrderCount) }} سفارش امروز
          </Tag>
        </Card>
      </Col>
      <Col :xs="24" :sm="12" :xl="6">
        <Card class="dash-card" :loading="isPending">
          <Statistic
            :title="`بازه ${reportDays} روز`"
            :value="rangeRevenue"
            :value-style="{ color: '#722ed1' }"
            :formatter="(val) => formatMoney(Number(val))"
          />
          <Tag style="margin-top: 8px">
            {{ formatNumber(rangeOrders) }} سفارش · AOV
            {{ formatMoney(aov) }}
          </Tag>
        </Card>
      </Col>
      <Col :xs="24" :sm="12" :xl="6">
        <Card class="dash-card" :loading="isPending">
          <Statistic
            title="پیام‌های جدید"
            :value="newContactCount"
            :value-style="{ color: newContactCount ? '#fa8c16' : undefined }"
            :formatter="(val) => formatNumber(Number(val))"
          />
          <Button
            type="link"
            style="padding-inline: 0; margin-top: 4px"
            @click="router.push({ name: 'contact', query: { status: 'new' } })"
          >
            <MailOutlined />
            مشاهده پیام‌ها
          </Button>
        </Card>
      </Col>
    </Row>

    <Row :gutter="16" style="margin-top: 16px">
      <Col :xs="24" :md="8">
        <Card class="dash-card" :loading="isPending">
          <Statistic
            title="دسته‌ها"
            :value="categoryCount"
            :value-style="{ color: '#1677ff' }"
            :formatter="(val) => formatNumber(Number(val))"
          />
        </Card>
      </Col>
      <Col :xs="24" :md="8">
        <Card class="dash-card" :loading="isPending">
          <Statistic
            title="محصولات"
            :value="productCount"
            :value-style="{ color: '#52c41a' }"
            :formatter="(val) => formatNumber(Number(val))"
          />
          <Tag v-if="featuredCount" color="gold" style="margin-top: 8px">
            {{ formatNumber(featuredCount) }} ویژه
          </Tag>
        </Card>
      </Col>
      <Col :xs="24" :md="8">
        <Card class="dash-card" :loading="isPending">
          <Statistic
            title="سفارش‌ها"
            :value="orderCount"
            :value-style="{ color: '#722ed1' }"
            :formatter="(val) => formatNumber(Number(val))"
          />
          <Space style="margin-top: 8px" wrap>
            <Tag
              v-if="pendingOrders"
              color="gold"
              style="cursor: pointer"
              @click="router.push({ name: 'orders', query: { status: 'pending' } })"
            >
              {{ formatNumber(pendingOrders) }} در انتظار
            </Tag>
            <Tag
              v-if="unpaidOrders"
              color="warning"
              style="cursor: pointer"
              @click="router.push({ name: 'orders', query: { payment: 'pending' } })"
            >
              {{ formatNumber(unpaidOrders) }} پرداخت‌نشده
            </Tag>
          </Space>
        </Card>
      </Col>
    </Row>

    <Row :gutter="16" style="margin-top: 16px">
      <Col :xs="24" :lg="14">
        <Card
          class="dash-card"
          :loading="isPending"
          :title="`روند فروش ${reportDays} روز`"
          style="margin-bottom: 16px"
        >
          <SalesTrendChart
            v-if="chartPoints.length"
            :points="chartPoints"
          />
          <p
            v-else
            style="margin: 0; color: rgba(0, 0, 0, 0.45)"
          >
            داده‌ای برای نمودار نیست.
          </p>
          <Table
            v-if="daySales.length && reportDays <= 14"
            row-key="key"
            size="small"
            style="margin-top: 16px"
            :columns="daySaleColumns"
            :data-source="daySales"
            :pagination="false"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'orders'">
                {{ formatNumber((record as DaySale).orders) }}
              </template>
              <template v-else-if="column.key === 'revenue'">
                {{ formatMoney((record as DaySale).revenue) }}
              </template>
              <template v-else-if="column.key === 'share'">
                <Progress
                  :percent="
                    Math.round(
                      ((record as DaySale).revenue / maxDayRevenue) * 100,
                    )
                  "
                  :show-info="false"
                  size="small"
                  stroke-color="#722ed1"
                />
              </template>
            </template>
          </Table>
        </Card>

        <Row :gutter="16">
          <Col :xs="24" :md="12">
            <Card
              class="dash-card"
              :loading="isPending"
              title="پرفروش‌ترین محصولات"
              style="margin-bottom: 16px"
            >
              <Table
                v-if="topProducts.length"
                row-key="productId"
                size="small"
                :columns="topProductColumns"
                :data-source="topProducts"
                :pagination="false"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'quantity'">
                    {{ formatNumber(record.quantity) }}
                  </template>
                  <template v-else-if="column.key === 'revenue'">
                    {{ formatMoney(record.revenue) }}
                  </template>
                </template>
              </Table>
              <p
                v-else
                style="margin: 0; color: rgba(0, 0, 0, 0.45)"
              >
                هنوز فروش پرداخت‌شده‌ای در بازه نیست.
              </p>
            </Card>
          </Col>
          <Col :xs="24" :md="12">
            <Card
              class="dash-card"
              :loading="isPending"
              title="پرفروش‌ترین دسته‌ها"
              style="margin-bottom: 16px"
            >
              <Table
                v-if="topCategories.length"
                row-key="categoryId"
                size="small"
                :columns="topCategoryColumns"
                :data-source="topCategories"
                :pagination="false"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'quantity'">
                    {{ formatNumber(record.quantity) }}
                  </template>
                  <template v-else-if="column.key === 'revenue'">
                    {{ formatMoney(record.revenue) }}
                  </template>
                </template>
              </Table>
              <p
                v-else
                style="margin: 0; color: rgba(0, 0, 0, 0.45)"
              >
                هنوز فروش پرداخت‌شده‌ای در بازه نیست.
              </p>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col :xs="24" :lg="10">
        <Card
          class="dash-card"
          :loading="isPending"
          :extra="`آستانه: ${formatNumber(LOW_STOCK_THRESHOLD)}`"
          style="margin-bottom: 16px"
        >
          <template #title>
            <Space>
              <span>موجودی کم</span>
              <Badge
                :count="lowStock.length"
                :number-style="{
                  backgroundColor: lowStock.length ? '#ff4d4f' : '#52c41a',
                }"
                :show-zero="true"
              />
            </Space>
          </template>
          <Table
            v-if="lowStock.length"
            row-key="id"
            size="small"
            :columns="lowStockColumns"
            :data-source="lowStock"
            :pagination="false"
            :custom-row="() => ({
              style: { cursor: 'pointer' },
              onClick: () => router.push({ name: 'products' }),
            })"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'stock'">
                {{ formatNumber(record.stock) }}
              </template>
              <template v-else-if="column.key === 'status'">
                <Tag :color="stockTag(record.stock).color">
                  <CloseCircleOutlined v-if="record.stock < 1" />
                  <WarningOutlined v-else />
                  {{ stockTag(record.stock).label }}
                </Tag>
              </template>
            </template>
          </Table>
          <p v-else style="margin: 0; color: rgba(0, 0, 0, 0.45)">
            محصولی با موجودی کم نیست.
          </p>
        </Card>

        <Card
          class="dash-card"
          :loading="isPending"
          title="آخرین سفارش‌ها"
        >
          <Table
            v-if="recentOrders.length"
            row-key="id"
            size="small"
            :columns="recentOrderColumns"
            :data-source="recentOrders"
            :pagination="false"
            :custom-row="() => ({
              style: { cursor: 'pointer' },
              onClick: () => router.push({ name: 'orders' }),
            })"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'customer'">
                {{ record.userFullName || record.userEmail || '—' }}
              </template>
              <template v-else-if="column.key === 'total'">
                {{ formatMoney(record.total) }}
              </template>
              <template v-else-if="column.key === 'status'">
                <Tag :color="ORDER_STATUS_COLOR[record.status]">
                  <component :is="ORDER_STATUS_ICON[record.status]" />
                  {{ ORDER_STATUS_LABELS_FA[record.status] }}
                </Tag>
              </template>
              <template v-else-if="column.key === 'payment'">
                <Tag :color="PAYMENT_STATUS_COLOR[record.paymentStatus]">
                  <component :is="PAYMENT_STATUS_ICON[record.paymentStatus]" />
                  {{ PAYMENT_STATUS_LABELS_FA[record.paymentStatus] }}
                </Tag>
              </template>
            </template>
          </Table>
          <p v-else style="margin: 0; color: rgba(0, 0, 0, 0.45)">
            هنوز سفارشی ثبت نشده.
          </p>
        </Card>
      </Col>
    </Row>
  </div>
</template>
