import { createRouter, createWebHistory } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { ability, type Actions, type Subjects } from '@/ability'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'

declare module 'vue-router' {
  interface RouteMeta {
    guest?: boolean
    requiresAuth?: boolean
    action?: Actions
    subject?: Subjects
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guest: true },
    },
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: { action: 'read', subject: 'Dashboard' },
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/CategoriesView.vue'),
          meta: { action: 'read', subject: 'Category' },
        },
        {
          path: 'brands',
          name: 'brands',
          component: () => import('@/views/BrandsView.vue'),
          meta: { action: 'read', subject: 'Brand' },
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/ProductsView.vue'),
          meta: { action: 'read', subject: 'Product' },
        },
        {
          path: 'products/new',
          name: 'product-create',
          component: () => import('@/views/ProductFormView.vue'),
          meta: { action: 'create', subject: 'Product' },
        },
        {
          path: 'products/:id/edit',
          name: 'product-edit',
          component: () => import('@/views/ProductFormView.vue'),
          meta: { action: 'update', subject: 'Product' },
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/OrdersView.vue'),
          meta: { action: 'read', subject: 'Order' },
        },
        {
          path: 'customers',
          name: 'customers',
          component: () => import('@/views/CustomersView.vue'),
          meta: { action: 'read', subject: 'Customer' },
        },
        {
          path: 'staff',
          name: 'staff',
          component: () => import('@/views/StaffView.vue'),
          meta: { action: 'read', subject: 'Staff' },
        },
        {
          path: 'reviews',
          name: 'reviews',
          component: () => import('@/views/ReviewsView.vue'),
          meta: { action: 'read', subject: 'Review' },
        },
        {
          path: 'magazine',
          name: 'magazine',
          component: () => import('@/views/MagazineView.vue'),
          meta: { action: 'read', subject: 'Magazine' },
        },
        {
          path: 'magazine/new',
          name: 'magazine-create',
          component: () => import('@/views/MagazineFormView.vue'),
          meta: { action: 'create', subject: 'Magazine' },
        },
        {
          path: 'magazine/:id/edit',
          name: 'magazine-edit',
          component: () => import('@/views/MagazineFormView.vue'),
          meta: { action: 'update', subject: 'Magazine' },
        },
        {
          path: 'units',
          name: 'units',
          component: () => import('@/views/ProductUnitsView.vue'),
          meta: { action: 'read', subject: 'ProductUnit' },
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: () => import('@/views/CouponsView.vue'),
          meta: { action: 'read', subject: 'Coupon' },
        },
        {
          path: 'shipping',
          name: 'shipping',
          component: () => import('@/views/ShippingMethodsView.vue'),
          meta: { action: 'read', subject: 'Shipping' },
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/ContactMessagesView.vue'),
          meta: { action: 'read', subject: 'Contact' },
        },
        {
          path: 'newsletter',
          name: 'newsletter',
          component: () => import('@/views/NewsletterView.vue'),
          meta: { action: 'read', subject: 'Newsletter' },
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/SettingsView.vue'),
          meta: { action: 'update', subject: 'Settings' },
        },
        {
          path: 'audit',
          name: 'audit',
          component: () => import('@/views/AuditLogsView.vue'),
          meta: { action: 'read', subject: 'Audit' },
        },
      ],
    },
  ],
})

const { isLoading } = useNProgress(null, {
  showSpinner: false,
})

router.beforeEach(async (to) => {
  isLoading.value = true
  const auth = useAuthStore()

  if (!auth.ready) {
    await auth.fetchMe()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.requiresAuth && auth.isAuthenticated && !auth.canAccessPanel) {
    await auth.logout()
    return { name: 'login', query: { error: 'admin' } }
  }

  if (to.meta.requiresAuth && auth.isAuthenticated && auth.canAccessPanel) {
    const settings = useSettingsStore()
    if (!settings.loaded) {
      try {
        await settings.fetch()
      } catch {
        // keep toman defaults until the settings page retries
      }
    }
  }

  if (
    to.meta.action &&
    to.meta.subject &&
    !ability.can(to.meta.action, to.meta.subject)
  ) {
    return { name: 'dashboard' }
  }

  if (to.meta.guest && auth.isAuthenticated && auth.canAccessPanel) {
    return { name: 'dashboard' }
  }

  return true
})

router.afterEach(() => {
  isLoading.value = false
})

router.onError(() => {
  isLoading.value = false
})

export default router
