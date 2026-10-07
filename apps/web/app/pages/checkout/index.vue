<script setup lang="ts">
import type {
  Address,
  CreateOrderResult,
  SavedAddress,
  SendOtpResult,
  ShippingMethod,
  ValidateCouponResult,
  VerifyOtpResult,
} from '@shop/shared'
import {
  addressSchema,
  computeLoyaltyRedeem,
  maxRedeemablePoints,
  normalizeIranMobile,
  resolveShippingCost,
} from '@shop/shared'
import type { FormSubmitEvent } from '@nuxt/ui'

usePrivateSeo('تسویه حساب', '/checkout')

const { items, subtotal, canCheckout, clear, sync } = useCart()
const { user, fetchMe } = useAuth()
const settings = useStoreSettingsState()
const { track } = useAnalytics()
const { save: saveGuestToken } = useGuestOrderToken()
const api = useApi()
const toast = useToast()
const syncing = ref(false)
const error = ref<string | null>(null)
const guestEmail = ref('')
const guestPhone = ref('')
const otpCode = ref('')
const otpToken = ref<string | null>(null)
const otpSending = ref(false)
const otpVerifying = ref(false)
const otpCooldown = ref(0)
let otpCooldownTimer: ReturnType<typeof setInterval> | null = null

const phoneVerified = computed(
  () => Boolean(otpToken.value && guestPhone.value),
)

function startCooldown(sec = 60) {
  otpCooldown.value = sec
  if (otpCooldownTimer) {
    clearInterval(otpCooldownTimer)
  }
  otpCooldownTimer = setInterval(() => {
    otpCooldown.value -= 1
    if (otpCooldown.value <= 0 && otpCooldownTimer) {
      clearInterval(otpCooldownTimer)
      otpCooldownTimer = null
    }
  }, 1000)
}

watch(guestPhone, () => {
  otpToken.value = null
  otpCode.value = ''
})

onBeforeUnmount(() => {
  if (otpCooldownTimer) {
    clearInterval(otpCooldownTimer)
  }
})

async function sendGuestOtp() {
  const phone = normalizeIranMobile(guestPhone.value)
  if (!phone) {
    error.value = 'شماره موبایل معتبر وارد کنید (مثلاً 09123456789)'
    return
  }
  guestPhone.value = phone
  otpSending.value = true
  error.value = null
  try {
    const result = await api<SendOtpResult>('/otp/send', {
      method: 'POST',
      body: { phone, purpose: 'guest_checkout' },
    })
    startCooldown(60)
    toast.add({
      title: 'کد ارسال شد',
      description: result.debugCode
        ? `کد توسعه: ${result.debugCode}`
        : 'کد تایید را وارد کنید',
      color: 'success',
    })
  } catch (err) {
    error.value = getApiErrorMessage(err, 'ارسال کد ممکن نشد')
  } finally {
    otpSending.value = false
  }
}

async function verifyGuestOtp() {
  const phone = normalizeIranMobile(guestPhone.value)
  if (!phone) {
    error.value = 'شماره موبایل معتبر وارد کنید'
    return
  }
  if (!/^\d{6}$/.test(otpCode.value.trim())) {
    error.value = 'کد ۶ رقمی را وارد کنید'
    return
  }
  otpVerifying.value = true
  error.value = null
  try {
    const result = await api<VerifyOtpResult>('/otp/verify', {
      method: 'POST',
      body: {
        phone,
        code: otpCode.value.trim(),
        purpose: 'guest_checkout',
      },
    })
    guestPhone.value = phone
    otpToken.value = result.token
    toast.add({ title: 'موبایل تایید شد', color: 'success' })
  } catch (err) {
    otpToken.value = null
    error.value = getApiErrorMessage(err, 'تایید کد ممکن نشد')
  } finally {
    otpVerifying.value = false
  }
}

if (import.meta.client) {
  if (!user.value) {
    await fetchMe()
  }

  syncing.value = true
  try {
    const issues = await sync()
    if (issues.length) {
      toast.add({
        title: 'سبد به‌روز شد',
        description: issues.map((issue) => issue.message).join(' · '),
        color: 'warning',
      })
    }
  } catch {
    // keep local cart; place-order will surface API errors
  } finally {
    syncing.value = false
  }

  if (items.value.length === 0 || !canCheckout.value) {
    await navigateTo('/cart')
  }
}

const { data: addresses } = await useAsyncData('checkout-addresses', () =>
  user.value ? api<SavedAddress[]>('/addresses') : Promise.resolve([]),
)

const { data: shippingMethods } = await useAsyncData(
  'checkout-shipping-methods',
  () => api<ShippingMethod[]>('/shipping-methods'),
)

const selectedAddressId = ref<string | 'new'>('new')
const selectedShippingId = ref<string | null>(null)
const orderNote = ref('')

watch(
  shippingMethods,
  (list) => {
    if (!list?.length) {
      selectedShippingId.value = null
      return
    }
    if (
      !selectedShippingId.value ||
      !list.some((item) => item.id === selectedShippingId.value)
    ) {
      selectedShippingId.value = list[0]!.id
    }
  },
  { immediate: true },
)

const selectedShipping = computed(
  () =>
    shippingMethods.value?.find(
      (item) => item.id === selectedShippingId.value,
    ) ?? null,
)

const shippingCost = computed(() => {
  if (!selectedShipping.value) {
    return 0
  }
  return resolveShippingCost(selectedShipping.value, subtotal.value)
})

const state = reactive<Address>({
  fullName: '',
  phone: '',
  province: '',
  city: '',
  postalCode: '',
  line: '',
})

const loading = ref(false)
const couponCode = ref('')
const couponLoading = ref(false)
const couponError = ref<string | null>(null)
const appliedCoupon = ref<ValidateCouponResult | null>(null)
const manualCoupon = ref(false)
const useLoyaltyPoints = ref(false)

const couponDiscount = computed(() => appliedCoupon.value?.discount ?? 0)

const loyaltyBalance = computed(() => user.value?.loyaltyPoints ?? 0)

const maxLoyaltyPoints = computed(() => {
  if (!user.value || !settings.value.loyaltyEnabled) {
    return 0
  }
  return maxRedeemablePoints({
    balance: loyaltyBalance.value,
    redeemRialsPerPoint: settings.value.loyaltyRedeemRialsPerPoint,
    subtotal: subtotal.value,
    couponDiscount: couponDiscount.value,
    maxRedeemPercent: settings.value.loyaltyMaxRedeemPercent,
  })
})

const loyaltyRedeem = computed(() => {
  if (!useLoyaltyPoints.value || !maxLoyaltyPoints.value) {
    return { pointsUsed: 0, discount: 0 }
  }
  return computeLoyaltyRedeem({
    pointsRequested: maxLoyaltyPoints.value,
    balance: loyaltyBalance.value,
    redeemRialsPerPoint: settings.value.loyaltyRedeemRialsPerPoint,
    subtotal: subtotal.value,
    couponDiscount: couponDiscount.value,
    maxRedeemPercent: settings.value.loyaltyMaxRedeemPercent,
  })
})

const afterDiscount = computed(() =>
  Math.max(
    0,
    subtotal.value - couponDiscount.value - loyaltyRedeem.value.discount,
  ),
)

const taxAmount = computed(() => {
  const percent = Number(settings.value.taxPercent) || 0
  if (percent <= 0) return 0
  return Math.round((Math.max(0, afterDiscount.value) * percent) / 100)
})

const payableTotal = computed(
  () => afterDiscount.value + shippingCost.value + taxAmount.value,
)


const shippingOptions = computed(() =>
  (shippingMethods.value ?? []).map((method) => {
    const cost = resolveShippingCost(method, subtotal.value)
    const eta = `${method.estimatedDays} روز`
    const fee = cost === 0 ? 'رایگان' : formatPrice(cost)
    return {
      label: `${method.name} · ${fee} · ${eta}`,
      value: method.id,
      description: method.description ?? undefined,
    }
  }),
)

watch(
  addresses,
  (list) => {
    const preferred = list?.find((item) => item.isDefault) ?? list?.[0]
    if (preferred) {
      selectedAddressId.value = preferred.id
      applyAddress(preferred)
    }
  },
  { immediate: true },
)

function applyAddress(address: SavedAddress | Address) {
  state.fullName = address.fullName
  state.phone = address.phone
  state.province = address.province
  state.city = address.city
  state.postalCode = address.postalCode
  state.line = address.line
}

function onSelectAddress(id: string | 'new') {
  selectedAddressId.value = id
  if (id === 'new') {
    state.fullName = ''
    state.phone = ''
    state.province = ''
    state.city = ''
    state.postalCode = ''
    state.line = ''
    return
  }

  const found = addresses.value?.find((item) => item.id === id)
  if (found) {
    applyAddress(found)
  }
}

const addressOptions = computed(() => [
  ...(addresses.value ?? []).map((item) => ({
    label: item.label || `${item.fullName} — ${item.city}`,
    value: item.id,
  })),
  { label: 'آدرس جدید', value: 'new' },
])

async function loadAutomaticCoupon() {
  if (manualCoupon.value || subtotal.value < 1) {
    return
  }
  try {
    const result = await api<ValidateCouponResult | null>('/coupons/automatic', {
      query: { subtotal: subtotal.value },
    })
    appliedCoupon.value = result
    if (result) {
      couponCode.value = result.code
    }
  } catch {
    // optional campaign preview
  }
}

async function applyCoupon() {
  couponError.value = null
  appliedCoupon.value = null
  const code = couponCode.value.trim()
  if (!code) {
    couponError.value = 'کد تخفیف را وارد کنید'
    return
  }

  couponLoading.value = true
  try {
    appliedCoupon.value = await api<ValidateCouponResult>('/coupons/validate', {
      method: 'POST',
      body: {
        code,
        subtotal: subtotal.value,
      },
    })
    manualCoupon.value = true
    couponCode.value = appliedCoupon.value.code
    toast.add({
      title: 'کد تخفیف اعمال شد',
      description: `${formatPrice(appliedCoupon.value.discount)} تخفیف`,
      color: 'success',
    })
  } catch (err) {
    couponError.value = getApiErrorMessage(err, 'کد تخفیف معتبر نیست')
  } finally {
    couponLoading.value = false
  }
}

async function clearCoupon() {
  appliedCoupon.value = null
  couponError.value = null
  couponCode.value = ''
  manualCoupon.value = false
  await loadAutomaticCoupon()
}

watch(subtotal, () => {
  if (!manualCoupon.value) {
    void loadAutomaticCoupon()
  }
})

onMounted(() => {
  void loadAutomaticCoupon()
})

async function onSubmit(event: FormSubmitEvent<Address>) {
  error.value = null

  if (!selectedShippingId.value) {
    error.value = 'روش ارسال را انتخاب کنید'
    return
  }

  const email = guestEmail.value.trim()
  if (!user.value) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.value = 'برای خرید بدون ورود، ایمیل معتبر وارد کنید'
      return
    }
    if (!phoneVerified.value || !otpToken.value) {
      error.value = 'ابتدا موبایل را با کد تایید کنید'
      return
    }
  }

  loading.value = true

  try {
    const order = await api<CreateOrderResult>('/orders', {
      method: 'POST',
      body: {
        address: event.data,
        shippingMethodId: selectedShippingId.value,
        guestEmail: user.value ? null : email,
        guestPhone: user.value ? null : guestPhone.value,
        otpToken: user.value ? null : otpToken.value,
        couponCode:
          appliedCoupon.value?.code ?? (couponCode.value.trim() || null),
        loyaltyPointsToRedeem:
          user.value && useLoyaltyPoints.value
            ? loyaltyRedeem.value.pointsUsed
            : null,
        note: orderNote.value.trim() || null,
        items: items.value.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    })

    if (order.guestToken) {
      saveGuestToken(order.id, order.guestToken)
    }

    track('begin_checkout', {
      order_id: order.id,
      value: order.total,
      item_count: order.items.length,
    })
    clear()
    if (user.value) {
      await fetchMe()
    }
    toast.add({
      title: 'سفارش ثبت شد',
      description: 'به صفحه پرداخت بروید.',
      color: 'success',
    })
    await navigateTo({
      path: '/checkout/callback',
      query: {
        orderId: order.id,
        ...(order.guestToken ? { token: order.guestToken } : {}),
      },
    })
  } catch (err) {
    error.value = getApiErrorMessage(err, 'ثبت سفارش ممکن نشد')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <h1 class="text-2xl font-semibold text-highlighted">
      تسویه حساب
    </h1>

    <UAlert
      v-if="!user"
      title="خرید به‌عنوان مهمان"
      description="می‌توانید بدون ثبت‌نام ادامه دهید. برای پیگیری سفارش‌های بعدی وارد شوید."
      color="neutral"
      variant="subtle"
    >
      <template #actions>
        <UButton
          to="/auth/login?redirect=/checkout"
          label="ورود"
          color="neutral"
          variant="soft"
          size="sm"
        />
      </template>
    </UAlert>

    <div class="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <UForm
        :schema="addressSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-lg font-medium text-default">
            آدرس ارسال
          </h2>
          <UButton
            v-if="user"
            to="/account/addresses"
            label="مدیریت"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </div>

        <UAlert
          v-if="error"
          :title="error"
          color="error"
          variant="subtle"
        />

        <UFormField
          v-if="!user"
          label="ایمیل"
          required
        >
          <UInput
            v-model="guestEmail"
            type="email"
            autocomplete="email"
            class="w-full"
            placeholder="برای رسید سفارش"
          />
        </UFormField>

        <div
          v-if="!user"
          class="border-default space-y-3 rounded-lg border p-4"
        >
          <UFormField
            label="موبایل"
            required
            help="برای تایید سفارش کد پیامکی ارسال می‌شود"
          >
            <div class="flex flex-wrap gap-2">
              <UInput
                v-model="guestPhone"
                type="tel"
                inputmode="numeric"
                autocomplete="tel"
                class="min-w-48 flex-1"
                placeholder="09123456789"
                :disabled="phoneVerified"
              />
              <UButton
                type="button"
                label="ارسال کد"
                color="neutral"
                variant="soft"
                :loading="otpSending"
                :disabled="phoneVerified || otpCooldown > 0"
                @click="sendGuestOtp"
              />
            </div>
            <p
              v-if="otpCooldown > 0 && !phoneVerified"
              class="text-muted mt-1 text-xs"
            >
              ارسال مجدد تا {{ otpCooldown }} ثانیه
            </p>
          </UFormField>

          <UFormField
            v-if="!phoneVerified"
            label="کد تایید"
            required
          >
            <div class="flex flex-wrap gap-2">
              <UInput
                v-model="otpCode"
                type="text"
                inputmode="numeric"
                maxlength="6"
                class="w-36"
                placeholder="۶ رقم"
              />
              <UButton
                type="button"
                label="تایید"
                :loading="otpVerifying"
                @click="verifyGuestOtp"
              />
            </div>
          </UFormField>

          <UAlert
            v-else
            title="موبایل تایید شد"
            :description="guestPhone"
            color="success"
            variant="subtle"
          />
        </div>

        <UFormField
          v-if="user && addressOptions.length > 1"
          label="آدرس ذخیره‌شده"
        >
          <USelect
            :model-value="selectedAddressId"
            :items="addressOptions"
            class="w-full"
            @update:model-value="onSelectAddress(String($event))"
          />
        </UFormField>

        <div class="grid gap-4 sm:grid-cols-2">
          <UFormField
            label="نام کامل"
            name="fullName"
            required
          >
            <UInput
              v-model="state.fullName"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="تلفن"
            name="phone"
            required
          >
            <UInput
              v-model="state.phone"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="استان"
            name="province"
            required
          >
            <UInput
              v-model="state.province"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="شهر"
            name="city"
            required
          >
            <UInput
              v-model="state.city"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="کد پستی"
            name="postalCode"
            required
          >
            <UInput
              v-model="state.postalCode"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          label="آدرس"
          name="line"
          required
        >
          <UTextarea
            v-model="state.line"
            :rows="3"
            class="w-full"
          />
        </UFormField>

        <div class="space-y-2">
          <h2 class="text-lg font-medium text-default">
            روش ارسال
          </h2>
          <UAlert
            v-if="!shippingMethods?.length"
            title="روش ارسالی فعال نیست"
            description="از پنل ادمین حداقل یک روش ارسال اضافه کنید."
            color="warning"
            variant="subtle"
          />
          <URadioGroup
            v-else
            v-model="selectedShippingId"
            :items="shippingOptions"
            variant="card"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <h2 class="text-lg font-medium text-default">
            کد تخفیف
          </h2>
          <div class="flex flex-wrap gap-2">
            <UInput
              v-model="couponCode"
              class="min-w-40 flex-1"
              placeholder="مثلاً SUMMER10"
              :disabled="!!appliedCoupon"
            />
            <UButton
              v-if="!appliedCoupon"
              label="اعمال"
              color="neutral"
              variant="soft"
              :loading="couponLoading"
              @click="applyCoupon"
            />
            <UButton
              v-else
              :label="appliedCoupon?.automatic ? 'حذف کمپین' : 'حذف کد'"
              color="neutral"
              variant="ghost"
              @click="clearCoupon"
            />
          </div>
          <UAlert
            v-if="couponError"
            :title="couponError"
            color="error"
            variant="subtle"
          />
          <UAlert
            v-else-if="appliedCoupon?.automatic"
            :title="`کمپین خودکار ${appliedCoupon.code} اعمال شد`"
            description="می‌توانید کد دستی وارد کنید تا جایگزین شود."
            color="primary"
            variant="subtle"
          />
          <UAlert
            v-else-if="appliedCoupon"
            :title="`کد ${appliedCoupon.code} اعمال شد`"
            color="success"
            variant="subtle"
          />
        </div>

        <div
          v-if="user && settings.loyaltyEnabled && loyaltyBalance > 0"
          class="space-y-2"
        >
          <h2 class="text-lg font-medium text-default">
            امتیاز وفاداری
          </h2>
          <UCheckbox
            v-model="useLoyaltyPoints"
            :label="`استفاده از امتیاز (موجودی ${loyaltyBalance} · حداکثر ${maxLoyaltyPoints})`"
            :disabled="maxLoyaltyPoints < 1"
          />
          <p
            v-if="loyaltyRedeem.discount"
            class="text-muted text-sm"
          >
            تخفیف امتیاز:
            {{ formatPrice(loyaltyRedeem.discount) }}
            ({{ loyaltyRedeem.pointsUsed }} امتیاز)
          </p>
        </div>

        <div class="space-y-2">
          <h2 class="text-lg font-medium text-default">
            یادداشت سفارش
          </h2>
          <UTextarea
            v-model="orderNote"
            :rows="3"
            maxlength="500"
            class="w-full"
            placeholder="مثلاً ساعت تماس، توضیحات پیک…"
          />
          <p class="text-muted text-xs">
            اختیاری · حداکثر ۵۰۰ کاراکتر
          </p>
        </div>

        <UButton
          type="submit"
          label="ثبت سفارش"
          :loading="loading || syncing"
          :disabled="!canCheckout || !selectedShippingId"
        />
      </UForm>

      <aside class="border-default bg-elevated h-fit space-y-4 rounded-lg border p-5">
        <h2 class="font-medium text-highlighted">
          خلاصه سفارش
        </h2>
        <ul class="space-y-2 text-sm">
          <li
            v-for="item in items"
            :key="item.productId"
            class="text-muted flex justify-between gap-3"
          >
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </li>
        </ul>
        <div class="border-default space-y-2 border-t pt-3 text-sm">
          <div class="text-muted flex justify-between gap-3">
            <span>جمع جزء</span>
            <span>{{ formatPrice(subtotal) }}</span>
          </div>
          <div
            v-if="appliedCoupon"
            class="flex justify-between gap-3 text-success"
          >
            <span>تخفیف ({{ appliedCoupon.code }})</span>
            <span>− {{ formatPrice(appliedCoupon.discount) }}</span>
          </div>
          <div
            v-if="loyaltyRedeem.discount"
            class="flex justify-between gap-3 text-success"
          >
            <span>تخفیف امتیاز</span>
            <span>− {{ formatPrice(loyaltyRedeem.discount) }}</span>
          </div>
          <div
            v-if="selectedShipping"
            class="text-muted flex justify-between gap-3"
          >
            <span>ارسال ({{ selectedShipping.name }})</span>
            <span>
              {{
                shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)
              }}
            </span>
          </div>
          <div
            v-if="taxAmount"
            class="text-muted flex justify-between gap-3"
          >
            <span>مالیات ({{ settings.taxPercent }}٪)</span>
            <span>{{ formatPrice(taxAmount) }}</span>
          </div>
          <div class="text-highlighted flex items-center justify-between pt-1 font-semibold">
            <span>قابل پرداخت</span>
            <span>{{ formatPrice(payableTotal) }}</span>
          </div>
        </div>
      </aside>
    </div>
  </UContainer>
</template>
