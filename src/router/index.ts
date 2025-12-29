import { createRouter, createWebHistory } from 'vue-router'
import PanelLayout from '@/layouts/Panel/PanelLayout.vue'
import ProductList from '@/views/products/ProductList.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import TagList from '@/views/tags/TagList.vue'
import CategoryList from '@/views/categories/CategoryList.vue'

import MediaList from '@/views/media/MediaList.vue'
import TheSetting from '@/views/settings/TheSetting.vue'

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
          component: ProductList,
          name: 'TheProducts',
        },
        {
          path: '/tags',
          component: TagList,
          name: 'TheTags',
        },
        {
          path: '/categories',
          component: CategoryList,
          name: 'TheCategories',
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
      ]
    }
  ],
})

export default router
