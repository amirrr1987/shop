import type { CreateMenu, Menu, UpdateMenu } from '@/models/menu.model'
import { axiosInstance } from './useAxios'

export const useMenuService = () => {
  const getMenus = async (): Promise<Menu[]> => {
    const response = await axiosInstance.get('/menus')
    return response.data
  }

  const getMenusByLocation = async (location: string): Promise<Menu[]> => {
    const response = await axiosInstance.get(`/menus/location/${location}`)
    return response.data
  }

  const getMenuRoots = async (location?: string): Promise<Menu[]> => {
    const params = location ? { location } : {}
    const response = await axiosInstance.get('/menus/roots', { params })
    return response.data
  }

  const getLocations = async (): Promise<string[]> => {
    const response = await axiosInstance.get('/menus/locations')
    return response.data
  }

  const getMenu = async (id: string): Promise<Menu> => {
    const response = await axiosInstance.get(`/menus/${id}`)
    return response.data
  }

  const getMenuChildren = async (id: string): Promise<Menu[]> => {
    const response = await axiosInstance.get(`/menus/${id}/children`)
    return response.data
  }

  const createMenu = async (menu: CreateMenu): Promise<Menu> => {
    const response = await axiosInstance.post('/menus', menu)
    return response.data
  }

  const updateMenu = async (menu: UpdateMenu): Promise<Menu> => {
    const response = await axiosInstance.patch('/menus', menu)
    return response.data
  }

  const deleteMenu = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/menus/${id}`)
  }

  return {
    getMenus,
    getMenusByLocation,
    getMenuRoots,
    getLocations,
    getMenu,
    getMenuChildren,
    createMenu,
    updateMenu,
    deleteMenu,
  }
}
