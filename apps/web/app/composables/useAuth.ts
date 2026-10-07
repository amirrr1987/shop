import type {
  ChangePasswordInput,
  LoginInput,
  PublicUser,
  RegisterInput,
  UpdateProfileInput,
} from '@shop/shared'

type AuthUserResponse = {
  user: PublicUser
}

export function useAuth() {
  const user = useState<PublicUser | null>('auth-user', () => null)
  const pending = useState('auth-pending', () => false)
  const api = useApi()
  const cart = useCart()
  const wishlist = useWishlist()
  const toast = useToast()

  async function fetchMe() {
    pending.value = true
    try {
      const response = await api<AuthUserResponse>('/auth/me')
      user.value = response.user
    } catch {
      user.value = null
    } finally {
      pending.value = false
    }
  }

  async function afterAuth(next: PublicUser) {
    user.value = next
    try {
      const issues = await cart.mergeForUser(next.id)
      if (issues.length) {
        toast.add({
          title: 'سبد خرید به‌روز شد',
          description: issues
            .slice(0, 3)
            .map((issue) => `${issue.name}: ${issue.message}`)
            .join(' · '),
          color: 'warning',
        })
      }
    } catch {
      // Keep merged local lines even if availability sync fails.
    }
    try {
      await wishlist.mergeForUser()
    } catch {
      // Keep local wishlist if server sync fails.
    }
  }

  async function login(input: LoginInput) {
    const response = await api<AuthUserResponse>('/auth/login', {
      method: 'POST',
      body: input,
    })
    await afterAuth(response.user)
    return response.user
  }

  async function register(input: RegisterInput) {
    const response = await api<AuthUserResponse>('/auth/register', {
      method: 'POST',
      body: input,
    })
    await afterAuth(response.user)
    return response.user
  }

  async function updateProfile(input: UpdateProfileInput) {
    const response = await api<AuthUserResponse>('/auth/profile', {
      method: 'PATCH',
      body: input,
    })
    user.value = response.user
    return response.user
  }

  async function changePassword(input: ChangePasswordInput) {
    await api<{ ok: true }>('/auth/password', {
      method: 'POST',
      body: input,
    })
  }

  async function logout() {
    if (user.value) {
      cart.saveForUser(user.value.id)
    }
    await api('/auth/logout', { method: 'POST' })
    user.value = null
  }

  return {
    user,
    pending,
    fetchMe,
    login,
    register,
    updateProfile,
    changePassword,
    logout,
  }
}
