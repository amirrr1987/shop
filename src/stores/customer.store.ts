import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateCustomer, Customer, UpdateCustomer } from '@/models/customer.model'
import { useCustomerService } from '@/services/customer.service'
export const useCustomerStore = defineStore('customer', () => {
  const customerService = useCustomerService()
  const customers = ref<Customer[]>([])

  const getCustomers = async () => {
    const response = await customerService.getCustomers()
    customers.value = Array.isArray(response) ? response : []
  }

  const getCustomer = async (customerId: Customer['id']) => {
    const response = await customerService.getCustomer(customerId)
    return response
  }
  const createCustomer = async (customer: CreateCustomer) => {
    await customerService.createCustomer(customer)
  }
  const updateCustomer = async (customer: UpdateCustomer) => {
    await customerService.updateCustomer(customer)
  }
  const deleteCustomer = async (customerId: Customer['id']) => {
    await customerService.deleteCustomer(customerId)
  }
  return { customers, getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer }
})
