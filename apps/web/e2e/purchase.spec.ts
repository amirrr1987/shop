import { expect, test } from '@playwright/test'
import { seedPurchaseCatalog } from './helpers/catalog'

test.describe('purchase path', () => {
  test('guest: product → cart → checkout → mock pay → paid', async ({
    page,
  }) => {
    const product = await seedPurchaseCatalog()

    await page.goto(`/products/${product.slug}`)
    await expect(page.getByRole('heading', { name: product.name })).toBeVisible()

    await page.getByRole('button', { name: 'افزودن به سبد' }).click()
    await expect(page.getByText('به سبد اضافه شد')).toBeVisible()

    await page.goto('/cart')
    await expect(page.getByRole('link', { name: product.name })).toBeVisible()
    await page.getByRole('link', { name: 'ادامه خرید' }).click()

    await expect(page).toHaveURL(/\/checkout/)
    await expect(page.getByText('خرید به‌عنوان مهمان')).toBeVisible()

    const guestEmail = `guest-${Date.now()}@example.com`
    await page.getByPlaceholder('برای رسید سفارش').fill(guestEmail)
    await page.getByLabel('نام کامل').fill('مهمان تست')
    await page.getByLabel('تلفن').fill('09121234567')
    await page.getByLabel('استان').fill('تهران')
    await page.getByLabel('شهر').fill('تهران')
    await page.getByLabel('کد پستی').fill('1234567890')
    await page.getByLabel('آدرس').fill('خیابان تست، پلاک ۱')

    await page.getByRole('button', { name: 'ثبت سفارش' }).click()

    await expect(page).toHaveURL(/\/checkout\/callback/, { timeout: 30_000 })
    await expect(page.getByRole('heading', { name: 'پرداخت' })).toBeVisible()

    await page.getByRole('button', { name: 'پرداخت' }).click()

    await expect(page).toHaveURL(/\/checkout\/callback/, { timeout: 45_000 })
    await expect(page.getByText('پرداخت‌شده')).toBeVisible({ timeout: 45_000 })
  })
})
