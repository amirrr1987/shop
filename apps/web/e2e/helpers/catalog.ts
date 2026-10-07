export type SeededProduct = {
  id: string
  slug: string
  name: string
}

function apiBase() {
  return (process.env.E2E_API_URL || 'http://127.0.0.1:3001').replace(/\/$/, '')
}

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text()
  let body: unknown = null
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = text
  }
  if (!response.ok) {
    throw new Error(
      `API ${response.status} ${response.url}: ${typeof body === 'string' ? body : JSON.stringify(body)}`,
    )
  }
  return body as T
}

/** Create an active product (+ shipping if missing) via admin API for a fresh purchase path. */
export async function seedPurchaseCatalog(): Promise<SeededProduct> {
  const base = apiBase()
  const adminEmail = process.env.E2E_ADMIN_EMAIL || 'admin@shop.local'
  const adminPassword = process.env.E2E_ADMIN_PASSWORD || 'password123'
  const suffix = Date.now().toString(36)

  const login = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: adminEmail,
      password: adminPassword,
    }),
  })
  const auth = await readJson<{ accessToken: string }>(login)

  const shippingList = await readJson<Array<{ id: string; isActive?: boolean }>>(
    await fetch(`${base}/shipping-methods`),
  )
  if (!shippingList.length) {
    await readJson(
      await fetch(`${base}/shipping-methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({
          name: `E2E Post ${suffix}`,
          description: null,
          price: 20_000,
          estimatedDays: 2,
          freeAbove: null,
          sortOrder: 0,
          isActive: true,
        }),
      }),
    )
  }

  const product = await readJson<{ id: string; slug: string; name: string }>(
    await fetch(`${base}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify({
        name: `E2E Playwright ${suffix}`,
        slug: `e2e-pw-${suffix}`,
        description: 'محصول تست Playwright',
        price: 150_000,
        stock: 10,
        categoryId: null,
        images: [],
        isActive: true,
        isFeatured: false,
        variants: [],
      }),
    }),
  )

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
  }
}
