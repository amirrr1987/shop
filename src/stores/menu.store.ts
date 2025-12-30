import type { CreateMenu, Menu, UpdateMenu } from '@/models/menu.model'
import { useMenuService } from '@/services/menu.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menuService = useMenuService()
  const menus = ref<Menu[]>([])
  const locations = ref<string[]>([])
  const loading = ref(false)

  const getMenus = async () => {
    loading.value = true
    try {
      const response = await menuService.getMenus()
      menus.value = Array.isArray(response) ? response : []
    } finally {
      loading.value = false
    }
  }

  const getLocations = async () => {
    const response = await menuService.getLocations()
    locations.value = Array.isArray(response) ? response : []
  }

  const createMenu = async (menu: CreateMenu) => {
    await menuService.createMenu(menu)
    await getMenus()
  }

  const updateMenu = async (menu: UpdateMenu) => {
    await menuService.updateMenu(menu)
    await getMenus()
  }

  const deleteMenu = async (id: string) => {
    await menuService.deleteMenu(id)
    await getMenus()
  }

  return { menus, locations, loading, getMenus, getLocations, createMenu, updateMenu, deleteMenu }
})
