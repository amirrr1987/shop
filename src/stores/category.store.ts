import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateCategory, Category, UpdateCategory } from '@/models/category.model'
import { useCategoryService } from '@/services/category.service'

export const useCategoryStore = defineStore('category', () => {
  const categoryService = useCategoryService()
  const categories = ref<Category[]>([])
  const loading = ref(false)

  const getCategories = async () => {
    loading.value = true
    try {
      const response = await categoryService.getCategories()
      categories.value = Array.isArray(response) ? response : []
    } finally {
      loading.value = false
    }
  }

  const getCategory = async (categoryId: Category['id']) => {
    loading.value = true
    try {
      const response = await categoryService.getCategory(categoryId)
      return response
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (category: CreateCategory) => {
    await categoryService.createCategory(category)
    await getCategories()
  }

  const updateCategory = async (category: UpdateCategory) => {
    await categoryService.updateCategory(category)
    await getCategories()
  }

  const deleteCategory = async (categoryId: Category['id']) => {
    await categoryService.deleteCategory(categoryId)
    await getCategories()
  }

  return { categories, loading, getCategories, getCategory, createCategory, updateCategory, deleteCategory }
})

