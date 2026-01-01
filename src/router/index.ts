import { createRouter, createWebHistory } from 'vue-router'
import PanelLayout from '@/layouts/Panel/PanelLayout.vue'
import ProductList from '@/views/products/ProductList.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import CategoryList from '@/views/categories/CategoryList.vue'
import MediaList from '@/views/media/MediaList.vue'
import TheSetting from '@/views/settings/TheSetting.vue'
import MenuList from '@/views/menus/MenuList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PanelLayout,
      name: 'PanelLayout',
      children: [
        {
          path: '/',
          component: Dashboard,
          name: 'TheDashboard',
        },
        {
          path: '/products',
          name: 'TheProduct',
          children: [
            {
              path: '',
              name: 'TheProductList',
              component: () => import('@/views/products/ProductList.vue'),
            },
            {
              path: 'create',
              name: 'TheProductCreate',
              component: () => import('@/views/products/ProductForm.vue'),
            },
            {
              path: ':id',
              name: 'TheProductEdit',
              component: () => import('@/views/products/ProductForm.vue'),
            },
          ],
        },
        {
          path: '/tags',
          name: 'TheTag',
          children: [
            {
              path: '',
              name: 'TheTagList',
              component: () => import('@/views/tags/TagList.vue'),
            },
            {
              path: 'create',
              name: 'TheTagCreate',
              component: () => import('@/views/tags/TagForm.vue'),
            },
            {
              path: ':id',
              name: 'TheTagEdit',
              component: () => import('@/views/tags/TagForm.vue'),
            },
          ],
        },

        {
          path: '/categories',
          name: 'TheCategory',
          children: [
            {
              path: '',
              name: 'TheCategoryList',
              component: () => import('@/views/categories/CategoryList.vue'),
            },
            {
              path: 'create',
              name: 'TheCategoryCreate',
              component: () => import('@/views/categories/CategoryForm.vue'),
            },
            {
              path: ':id',
              name: 'TheCategoryEdit',
              component: () => import('@/views/categories/CategoryForm.vue'),
            },
          ],
        },
        {
          path: '/menus',
          name: 'TheMenu',
          children: [
            {
              path: '',
              name: 'TheMenuList',
              component: () => import('@/views/menus/MenuList.vue'),
            },
            {
              path: 'create',
              name: 'TheMenuCreate',
              component: () => import('@/views/menus/MenuForm.vue'),
            },
            {
              path: ':id',
              name: 'TheMenuEdit',
              component: () => import('@/views/menus/MenuForm.vue'),
            },
          ],
        },
        {
          path: '/settings',
          component: TheSetting,
          name: 'TheSettings',
        },
        {
          path: '/media',
          component: MediaList,
          name: 'TheMedia',
        },
      ],
    },
  ],
})

export default router
