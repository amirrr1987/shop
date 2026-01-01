import type { CreateCategory, Category, UpdateCategory } from '@/models/category.model'
import { axiosInstance } from './useAxios'

export const useCategoryService = () => {
  const getCategories = async () => {
    const response = await axiosInstance.get('/categories')
    return response.data
  }
  const getCategory = async (categoryId: Category['id']) => {
    const response = await axiosInstance.get(`/categories/${categoryId}`)
    return response.data
  }
  const createCategory = async (category: CreateCategory) => {
    const response = await axiosInstance.post('/categories', category)
    return response.data
  }
  const updateCategory = async (category: UpdateCategory) => {
    const response = await axiosInstance.patch(`/categories`, category)
    return response.data
  }
  const deleteCategory = async (categoryId: Category['id']) => {
    const response = await axiosInstance.delete(`/categories/${categoryId}`)
    return response.data
  }
  return { getCategories, getCategory, createCategory, updateCategory, deleteCategory }
}

