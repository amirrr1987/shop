<script setup lang="ts">
import { countryOptions, paymentMethods, shippingMethods } from '~/data/checkout'

const { form } = useCheckout()
const { register } = useAuth()

const emit = defineEmits<{ submit: [] }>()

function onSubmit() {
  if (form.value.createAccount && form.value.email) {
    register({
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName
    })
  }
  emit('submit')
}
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{ root: 'ring-1 ring-default', body: 'space-y-4 p-4 sm:p-5' }"
  >
    <div class="space-y-1 border-b border-default pb-4">
      <p class="text-sm font-medium text-default">
        جزئیات صورتحساب
      </p>
      <p class="text-xs text-muted">
        اطلاعات تحویل‌گیرنده را وارد کنید
      </p>
    </div>

    <UForm
      class="space-y-4"
      @submit.prevent="onSubmit"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField label="نام">
          <UInput
            v-model="form.firstName"
            icon="i-lucide-user"
            placeholder="نام"
          />
        </UFormField>

        <UFormField label="نام خانوادگی">
          <UInput
            v-model="form.lastName"
            icon="i-lucide-user"
            placeholder="نام خانوادگی"
          />
        </UFormField>
      </div>

      <UFormField label="نام شرکت (اختیاری)">
        <UInput
          v-model="form.company"
          icon="i-lucide-building"
          placeholder="نام شرکت"
        />
      </UFormField>

      <UFormField label="کشور">
        <USelect
          v-model="form.country"
          :items="countryOptions"
          value-key="value"
          label-key="label"
        />
      </UFormField>

      <UFormField label="آدرس">
        <UInput
          v-model="form.address"
          icon="i-lucide-map-pin"
          placeholder="خیابان و پلاک"
        />
      </UFormField>

      <UFormField label="واحد / طبقه (اختیاری)">
        <UInput
          v-model="form.address2"
          placeholder="واحد، طبقه و..."
        />
      </UFormField>

      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField label="شهر">
          <UInput
            v-model="form.city"
            icon="i-lucide-building-2"
          />
        </UFormField>

        <UFormField label="استان">
          <UInput v-model="form.state" />
        </UFormField>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <UFormField label="کد پستی">
          <UInput v-model="form.zip" />
        </UFormField>

        <UFormField label="تلفن">
          <UInput
            v-model="form.phone"
            type="tel"
            icon="i-lucide-phone"
          />
        </UFormField>
      </div>

      <UFormField label="ایمیل">
        <UInput
          v-model="form.email"
          type="email"
          icon="i-lucide-mail"
        />
      </UFormField>

      <USwitch
        v-model="form.createAccount"
        label="ایجاد حساب کاربری؟"
      />

      <USwitch
        v-model="form.shipDifferent"
        label="ارسال به آدرس دیگر؟"
      />

      <UFormField label="یادداشت سفارش">
        <UTextarea
          v-model="form.notes"
          placeholder="توضیحات اضافه برای تحویل..."
          autoresize
        />
      </UFormField>

      <UFormField label="روش ارسال">
        <URadioGroup
          v-model="form.shipping"
          :items="shippingMethods.map(s => ({ label: s.label, value: s.value }))"
        />
      </UFormField>

      <UFormField label="روش پرداخت">
        <URadioGroup
          v-model="form.payment"
          :items="paymentMethods.map(p => ({ label: p.label, value: p.value }))"
        />
      </UFormField>

      <UButton
        type="submit"
        label="ثبت سفارش"
        icon="i-lucide-check-circle"
        block
      />
    </UForm>
  </UCard>
</template>
