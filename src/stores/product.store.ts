import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateProduct, Product, UpdateProduct } from '@/models/product.model'
import { useProductService } from '@/services/product.service'

export const useProductStore = defineStore('product', () => {
  const productService = useProductService()
  const products = ref<Product[]>([])
  const getProducts = async () => {
    const response = await productService.getProducts()
    products.value = Array.isArray(response) ? response : []
  }
  const createProduct = async (product: CreateProduct) => {
    await productService.createProduct(product)
  }
  const updateProduct = async (product: UpdateProduct) => {
    await productService.updateProduct(product)
    await getProducts()
  }
  const deleteProduct = async (productId: Product['id']) => {
    await productService.deleteProduct(productId)
    await getProducts()
  }
  return { products, getProducts, createProduct, updateProduct, deleteProduct }
})
