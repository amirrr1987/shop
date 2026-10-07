<script setup lang="ts">
import { computed, h, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Menu,
  TypographyText,
  Button,
  Space,
  Tag,
} from 'ant-design-vue'
import {
  AppstoreOutlined,
  CommentOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  TeamOutlined,
  UserOutlined,
  CarOutlined,
  MailOutlined,
  ReadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  TagOutlined,
  AuditOutlined,
  TagsOutlined,
} from '@ant-design/icons-vue'
import { useAbility } from '@casl/vue'
import gsap from 'gsap'
import type { AppAbility } from '@/ability'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useSessionJwt } from '@/composables/useSessionJwt'
import { formatDateTime } from '@/utils/date'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const settings = useSettingsStore()
const ability = useAbility<AppAbility>()
const { expiresAt, isExpired } = useSessionJwt()
const contentRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

/** Form routes stay under the parent menu item (no submenu clutter). */
const menuKeyByRoute: Record<string, string> = {
  'product-create': 'products',
  'product-edit': 'products',
  'magazine-create': 'magazine',
  'magazine-edit': 'magazine',
}

const selectedKeys = computed(() => {
  const name = String(route.name ?? '')
  return [menuKeyByRoute[name] ?? name]
})

const roleLabels: Record<string, string> = {
  owner: 'مدیر کل',
  admin: 'مدیر',
  editor: 'ویرایشگر',
  viewer: 'ناظر',
  customer: 'مشتری',
}

const items = computed(() =>
  [
    {
      key: 'dashboard',
      icon: () => h(DashboardOutlined),
      label: 'داشبورد',
      title: 'داشبورد',
      subject: 'Dashboard' as const,
    },
    {
      key: 'categories',
      icon: () => h(AppstoreOutlined),
      label: 'دسته‌ها',
      title: 'دسته‌ها',
      subject: 'Category' as const,
    },
    {
      key: 'brands',
      icon: () => h(TagsOutlined),
      label: 'برندها',
      title: 'برندها',
      subject: 'Brand' as const,
    },
    {
      key: 'products',
      icon: () => h(ShoppingOutlined),
      label: 'محصولات',
      title: 'محصولات',
      subject: 'Product' as const,
    },
    {
      key: 'orders',
      icon: () => h(OrderedListOutlined),
      label: 'سفارش‌ها',
      title: 'سفارش‌ها',
      subject: 'Order' as const,
    },
    {
      key: 'customers',
      icon: () => h(UserOutlined),
      label: 'مشتریان',
      title: 'مشتریان',
      subject: 'Customer' as const,
    },
    {
      key: 'staff',
      icon: () => h(TeamOutlined),
      label: 'کارکنان',
      title: 'کارکنان',
      subject: 'Staff' as const,
    },
    {
      key: 'reviews',
      icon: () => h(CommentOutlined),
      label: 'نظرات',
      title: 'نظرات',
      subject: 'Review' as const,
    },
    {
      key: 'magazine',
      icon: () => h(ReadOutlined),
      label: 'مجله',
      title: 'مجله',
      subject: 'Magazine' as const,
    },
    {
      key: 'units',
      icon: () => h(ColumnHeightOutlined),
      label: 'واحدها',
      title: 'واحدها',
      subject: 'ProductUnit' as const,
    },
    {
      key: 'coupons',
      icon: () => h(TagOutlined),
      label: 'تخفیف‌ها',
      title: 'تخفیف‌ها',
      subject: 'Coupon' as const,
    },
    {
      key: 'shipping',
      icon: () => h(CarOutlined),
      label: 'ارسال',
      title: 'ارسال',
      subject: 'Shipping' as const,
    },
    {
      key: 'contact',
      icon: () => h(MailOutlined),
      label: 'پیام‌ها',
      title: 'پیام‌ها',
      subject: 'Contact' as const,
    },
    {
      key: 'settings',
      icon: () => h(SettingOutlined),
      label: 'تنظیمات',
      title: 'تنظیمات',
      subject: 'Settings' as const,
    },
    {
      key: 'audit',
      icon: () => h(AuditOutlined),
      label: 'فعالیت‌ها',
      title: 'فعالیت‌ها',
      subject: 'Audit' as const,
    },
  ].filter((item) =>
    item.subject === 'Settings'
      ? ability.can('update', item.subject)
      : ability.can('read', item.subject),
  ),
)

function onMenuClick({ key }: { key: string | number }) {
  void router.push({ name: String(key) })
}

async function onLogout() {
  await auth.logout()
  await router.push({ name: 'login' })
}

onMounted(() => {
  void settings.fetch().catch(() => {})
  if (!contentRef.value) return
  ctx = gsap.context(() => {
    gsap.from(contentRef.value, {
      autoAlpha: 0,
      y: 12,
      duration: 0.35,
      ease: 'power2.out',
    })
  }, contentRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <Layout style="height: 100vh">
    <LayoutHeader style="
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-inline: 24px;
        ">
      <div style="padding: 16px 20px; font-weight: 600">
        پنل فروشگاه
      </div>
      <Space>
        <Tag
          v-if="expiresAt && !isExpired"
          color="processing"
        >
          انقضا: {{ formatDateTime(expiresAt) }}
        </Tag>
        <Tag
          v-else-if="isExpired"
          color="error"
        >
          توکن منقضی
        </Tag>
        <Tag
          v-if="ability.can('update', 'Settings')"
          color="gold"
          style="cursor: pointer"
          @click="router.push({ name: 'settings' })"
        >
          {{ settings.unitLabel }}
        </Tag>
        <TypographyText>
          {{ auth.user?.fullName }}
        </TypographyText>
        <Tag
          v-if="auth.user?.role"
          :color="
            auth.user.role === 'owner'
              ? 'purple'
              : auth.user.role === 'admin'
                ? 'geekblue'
                : 'green'
          "
        >
          {{ roleLabels[auth.user.role] || auth.user.role }}
        </Tag>
        <Button
          type="text"
          @click="onLogout"
        >
          <template #icon>
            <LogoutOutlined />
          </template>
          خروج
        </Button>
      </Space>
    </LayoutHeader>
 

    <Layout >

      <LayoutSider
        theme="light"
        width="220"
   
      >

        <Menu
          mode="inline"
          :selected-keys="selectedKeys"
          :items="items"
          @click="onMenuClick"
          style="height: 100%;"
        />
      </LayoutSider>
      <LayoutContent style="margin: 24px; padding: 24px; background: #fff; overflow-y: auto;">
        <div ref="contentRef" class="panel-fade">
          <RouterView />
        </div>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
