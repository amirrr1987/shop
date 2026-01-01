import type { CreateProduct, Product, UpdateProduct } from '@/models/product.model'
import { axiosInstance } from './useAxios'

export const useProductService = () => {
  const getProducts = async () => {
    const response = await axiosInstance.get('/products')
    return response.data
  }
  const getProduct = async (productId: Product['id']) => {
    const response = await axiosInstance.get(`/products/${productId}`)
    return response.data
  }
  const createProduct = async (product: CreateProduct) => {
    const response = await axiosInstance.post('/products', product)
    return response.data
  }
  // product id is required and must be a uuid v4 and without createdAt and updatedAt and anothr fleid is optional
  const updateProduct = async (product: UpdateProduct) => {
    const response = await axiosInstance.patch(`/products`, product)
    return response.data
  }
  const deleteProduct = async (productId: Product['id']) => {
    const response = await axiosInstance.delete(`/products/${productId}`)
    return response.data
  }
  return { getProducts, getProduct, createProduct, updateProduct, deleteProduct }
}
