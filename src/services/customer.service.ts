import type { CreateCustomer, Customer, UpdateCustomer } from '@/models/customer.model'
import { axiosInstance } from './useAxios'

export const useCustomerService = () => {
  const getCustomers = async () => {
    const response = await axiosInstance.get('/customers')
    return response.data
  }
  const getCustomer = async (customerId: Customer['id']) => {
    const response = await axiosInstance.get(`/customers/${customerId}`)
    return response.data
  }
  const createCustomer = async (customer: CreateCustomer) => {
    const response = await axiosInstance.post('/customers', customer)
    return response.data
  }
  const updateCustomer = async (customer: UpdateCustomer) => {
    const response = await axiosInstance.patch(`/customers`, customer)
    return response.data
  }
  const deleteCustomer = async (customerId: Customer['id']) => {
    const response = await axiosInstance.delete(`/customers/${customerId}`)
    return response.data
  }
  return { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer }
}
