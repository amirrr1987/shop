import { h, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  MenuOutlined,
  TagOutlined,
  FileOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'

export const useMenu = () => {
  const router = useRouter()
  const selectedKeys = ref<string[]>([])

  const menuItems = ref<MenuProps['items']>([
    {
      key: 'TheDashboard',
      icon: h(HomeOutlined),
      label: 'داشبورد',
    },
    {
      type: 'divider',
    },
    {
      key: 'TheProduct',
      icon: h(ShoppingOutlined),
      label: 'محصولات',
      children: [
        {
          key: 'TheProductCreate',
          icon: h(PlusOutlined),
          label: 'ایجاد محصول',
        },
        {
          key: 'TheProductList',
          icon: h(UnorderedListOutlined),
          label: 'لیست محصولات',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'TheCustomer',
      icon: h(UserOutlined),
      label: 'مشتریان',
      children: [
        {
          key: 'TheCustomerCreate',
          icon: h(PlusOutlined),
          label: 'ایجاد مشتری',
        },
        {
          key: 'TheCustomerList',
          icon: h(UnorderedListOutlined),
          label: 'لیست مشتریان',
        },
      ],
    },
    {
      key: 'TheTags',
      icon: h(TagOutlined),
      label: 'تگ ها',
      children: [
        {
          key: 'TheTagCreate',
          icon: h(PlusOutlined),
          label: 'ایجاد تگ',
        },
        {
          key: 'TheTagList',
          icon: h(UnorderedListOutlined),
          label: 'لیست تگ ها',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'TheCategory',
      icon: h(ShoppingOutlined),
      label: 'دسته بندی ها',
      children: [
        {
          key: 'TheCategoryCreate',
          icon: h(PlusOutlined),
          label: 'ایجاد دسته بندی',
        },
        {
          key: 'TheCategoryList',
          icon: h(UnorderedListOutlined),
          label: 'لیست دسته بندی ها',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'TheMenu',
      icon: h(MenuOutlined),
      label: 'منوها',
      children: [
        {
          key: 'TheMenuCreate',
          icon: h(PlusOutlined),
          label: 'ایجاد منو',
        },
        {
          key: 'TheMenuList',
          icon: h(UnorderedListOutlined),
          label: 'لیست منوها',
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'TheMedia',
      icon: h(FileOutlined),
      label: 'رسانه ها',
    },
    {
      type: 'divider',
    },
    {
      key: 'TheSetting',
      icon: h(SettingOutlined),
      label: 'تنظیمات',
      children: [
        {
          key: 'TheShopSetting',
          icon: h(SettingOutlined),
          label: 'تنظیمات فروشگاه',
        },
        {
          key: 'ThePanelSetting',
          icon: h(SettingOutlined),
          label: 'تنظیمات پنل',
        },
      ],
    },
  ])

  onMounted(() => {
    const currentRouteName = router.currentRoute.value.name
    if (currentRouteName && typeof currentRouteName === 'string') {
      selectedKeys.value = [currentRouteName]
    }
  })

  watch(
    () => router.currentRoute.value.name,
    (newRouteName) => {
      if (newRouteName && typeof newRouteName === 'string') {
        selectedKeys.value = [newRouteName]
      }
    },
  )

  watch(selectedKeys, (newKeys) => {
    if (newKeys.length > 0) {
      const key = newKeys[0]
      if (key) {
        router.push({ name: key })
      }
    }
  })

  return {
    selectedKeys,
    menuItems,
  }
}
