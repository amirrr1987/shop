import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

/**
 * Base axios instance configuration
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      const token = localStorage.getItem('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error) => {
      // Handle common errors
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token')
            // You can add router navigation here if needed
            break
          case 403:
            // Forbidden
            console.error('Access forbidden')
            break
          case 404:
            // Not found
            console.error('Resource not found')
            break
          case 500:
            // Server error
            console.error('Server error')
            break
        }
      } else if (error.request) {
        // Request made but no response received
        console.error('Network error: No response received')
      } else {
        // Error setting up the request
        console.error('Request error:', error.message)
      }
      return Promise.reject(error)
    },
  )

  return instance
}

/**
 * Composable function to get configured axios instance
 */
export const useAxios = (): AxiosInstance => {
  return createAxiosInstance()
}

/**
 * Default axios instance export for direct use
 */
export const axiosInstance = createAxiosInstance()

export default axiosInstance
