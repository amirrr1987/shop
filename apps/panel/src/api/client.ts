import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

let accessToken: string | null = null
let refreshPromise: Promise<string | null> | null = null
let onAccessTokenRefreshed: ((token: string | null) => void) | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

/** Auth store wires this so refreshed tokens stay in sessionStorage. */
export function setAccessTokenListener(listener: ((token: string | null) => void) | null) {
  onAccessTokenRefreshed = listener
}

export const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Shop-Client': 'panel',
  },
})

http.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = http
      .post<{ accessToken?: string }>('/auth/refresh')
      .then((response) => {
        const next = response.data.accessToken ?? null
        accessToken = next
        onAccessTokenRefreshed?.(next)
        return next
      })
      .catch(() => {
        accessToken = null
        onAccessTokenRefreshed?.(null)
        return null
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined
    const status = error.response?.status
    const url = config?.url ?? ''

    if (
      status === 401 &&
      config &&
      !config._retry &&
      !url.includes('/auth/login') &&
      !url.includes('/auth/register') &&
      !url.includes('/auth/refresh')
    ) {
      config._retry = true
      const next = await refreshAccessToken()
      if (next) {
        config.headers.Authorization = `Bearer ${next}`
        return http.request(config)
      }
    }

    return Promise.reject(error)
  },
)

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string | string[] } | undefined
    let message = error.message
    if (Array.isArray(data?.message)) {
      message = data.message.join('، ')
    } else if (typeof data?.message === 'string') {
      message = data.message
    }
    return new ApiError(error.response?.status ?? 0, message)
  }

  return new ApiError(0, 'خطای شبکه')
}

export async function api<T>(
  path: string,
  init: {
    method?: AxiosRequestConfig['method']
    body?: unknown
    params?: AxiosRequestConfig['params']
  } = {},
): Promise<T> {
  try {
    const response = await http.request<T>({
      url: path,
      method: init.method ?? 'GET',
      data: init.body,
      params: init.params,
    })
    return response.data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function uploadFile<T>(
  path: string,
  file: Blob,
  filename = 'image.jpg',
  field = 'file',
): Promise<T> {
  const form = new FormData()
  form.append(field, file, filename)

  try {
    const response = await http.post<T>(path, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      transformRequest: [
        (data, headers) => {
          if (data instanceof FormData) {
            delete headers['Content-Type']
          }
          return data
        },
      ],
    })
    return response.data
  } catch (error) {
    throw toApiError(error)
  }
}
