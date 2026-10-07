<script setup lang="ts">
import type { Address, SavedAddress } from '@shop/shared'
import { createAddressSchema } from '@shop/shared'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: 'auth',
})

usePrivateSeo('آدرس‌ها', '/account/addresses')

const api = useApi()
const toast = useToast()

const { data: addresses, status, refresh } = await useAsyncData(
  'my-addresses',
  () => api<SavedAddress[]>('/addresses'),
)

const open = ref(false)
const editingId = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const state = reactive<Address & { label: string; isDefault: boolean }>({
  label: '',
  fullName: '',
  phone: '',
  province: '',
  city: '',
  postalCode: '',
  line: '',
  isDefault: false,
})

const formSchema = createAddressSchema

function resetForm() {
  state.label = ''
  state.fullName = ''
  state.phone = ''
  state.province = ''
  state.city = ''
  state.postalCode = ''
  state.line = ''
  state.isDefault = false
  editingId.value = null
  error.value = null
}

function openCreate() {
  resetForm()
  open.value = true
}

function openEdit(address: SavedAddress) {
  editingId.value = address.id
  state.label = address.label ?? ''
  state.fullName = address.fullName
  state.phone = address.phone
  state.province = address.province
  state.city = address.city
  state.postalCode = address.postalCode
  state.line = address.line
  state.isDefault = address.isDefault
  error.value = null
  open.value = true
}

async function onSubmit(
  event: FormSubmitEvent<{
    label?: string | null
    isDefault?: boolean
  } & Address>,
) {
  loading.value = true
  error.value = null

  const body = {
    ...event.data,
    label: state.label.trim() || null,
    isDefault: state.isDefault,
  }

  try {
    if (editingId.value) {
      await api(`/addresses/${editingId.value}`, {
        method: 'PATCH',
        body,
      })
      toast.add({ title: 'آدرس به‌روز شد', color: 'success' })
    } else {
      await api('/addresses', {
        method: 'POST',
        body,
      })
      toast.add({ title: 'آدرس ذخیره شد', color: 'success' })
    }
    open.value = false
    await refresh()
  } catch (err) {
    error.value = getApiErrorMessage(err, 'ذخیره آدرس ممکن نشد')
  } finally {
    loading.value = false
  }
}

async function onDelete(id: string) {
  try {
    await api(`/addresses/${id}`, { method: 'DELETE' })
    toast.add({ title: 'آدرس حذف شد', color: 'neutral' })
    await refresh()
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'حذف ناموفق بود'),
      color: 'error',
    })
  }
}

async function makeDefault(id: string) {
  try {
    await api(`/addresses/${id}`, {
      method: 'PATCH',
      body: { isDefault: true },
    })
    await refresh()
  } catch (err) {
    toast.add({
      title: getApiErrorMessage(err, 'به‌روزرسانی ناموفق بود'),
      color: 'error',
    })
  }
}
</script>

<template>
  <UContainer class="space-y-8 py-10">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-highlighted">
          آدرس‌ها
        </h1>
        <p class="mt-1 text-muted">
          آدرس‌های ارسال برای تسویه حساب.
        </p>
      </div>
      <UButton
        label="افزودن آدرس"
        icon="i-lucide-plus"
        @click="openCreate"
      />
    </div>

    <div
      v-if="status === 'pending'"
      class="space-y-3"
    >
      <USkeleton
        v-for="n in 2"
        :key="n"
        class="h-28 rounded-lg"
      />
    </div>

    <ul
      v-else-if="addresses?.length"
      class="grid gap-4 md:grid-cols-2"
    >
      <li
        v-for="address in addresses"
        :key="address.id"
        class="border-default space-y-3 rounded-lg border p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-highlighted font-medium">
              {{ address.label || address.fullName }}
            </p>
            <p class="text-muted mt-1 text-sm">
              {{ address.fullName }} · {{ address.phone }}
            </p>
          </div>
          <UBadge
            v-if="address.isDefault"
            label="پیش‌فرض"
            color="primary"
            variant="subtle"
          />
        </div>
        <p class="text-muted text-sm">
          {{ address.line }}
          <br>
          {{ address.city }}، {{ address.province }} {{ address.postalCode }}
        </p>
        <div class="flex flex-wrap gap-2">
          <UButton
            size="sm"
            variant="soft"
            color="neutral"
            label="ویرایش"
            @click="openEdit(address)"
          />
          <UButton
            v-if="!address.isDefault"
            size="sm"
            variant="ghost"
            color="neutral"
            label="پیش‌فرض"
            @click="makeDefault(address.id)"
          />
          <UButton
            size="sm"
            variant="ghost"
            color="error"
            label="حذف"
            @click="onDelete(address.id)"
          />
        </div>
      </li>
    </ul>

    <p
      v-else
      class="text-muted"
    >
      هنوز آدرسی ذخیره نشده است.
    </p>

    <UModal
      v-model:open="open"
      title="آدرس"
    >
      <template #body>
        <UForm
          :schema="formSchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UAlert
            v-if="error"
            :title="error"
            color="error"
            variant="subtle"
          />

          <UFormField
            label="برچسب"
            name="label"
          >
            <UInput
              v-model="state.label"
              placeholder="منزل، محل کار..."
              class="w-full"
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

          <UCheckbox
            v-model="state.isDefault"
            label="به‌عنوان آدرس پیش‌فرض"
          />

          <div class="flex justify-end gap-2">
            <UButton
              label="انصراف"
              color="neutral"
              variant="ghost"
              @click="open = false"
            />
            <UButton
              type="submit"
              label="ذخیره"
              :loading="loading"
            />
          </div>
        </UForm>
      </template>
    </UModal>
  </UContainer>
</template>
