<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

usePrivateSeo('حساب کاربری', '/account')

const { user, logout } = useAuth()
const { allowCustomerChoice, selectedUnit, unitItems } = useCurrency()
const settings = useStoreSettingsState()

async function onLogout() {
  await logout()
  await navigateTo('/auth/login')
}
</script>

<template>
  <UContainer class="py-10">
    <!-- Guaranteed by auth middleware; keep tree stable for hydration. -->
    <template v-if="user">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-highlighted">
            حساب کاربری
          </h1>
          <p class="mt-2 text-muted">
            {{ user.fullName }} · {{ user.email }}
          </p>
          <p
            v-if="(user.loyaltyPoints ?? 0) > 0 || settings.loyaltyEnabled"
            class="text-primary mt-2 text-sm"
          >
            امتیاز وفاداری: {{ user.loyaltyPoints ?? 0 }}
          </p>
        </div>

        <UButton
          color="neutral"
          variant="outline"
          label="خروج"
          @click="onLogout"
        />
      </div>

      <UFormField
        v-if="allowCustomerChoice"
        class="mt-8 max-w-sm"
        label="واحد نمایش قیمت"
        hint="فقط نمایش؛ مبلغ سفارش همیشه به ریال محاسبه می‌شود"
      >
        <USelect
          v-model="selectedUnit"
          :items="unitItems"
          icon="i-lucide-banknote"
        />
      </UFormField>

      <div class="mt-8 flex flex-wrap gap-3">
        <UButton
          to="/account/profile"
          label="پروفایل"
          variant="soft"
        />
        <UButton
          to="/account/orders"
          label="سفارش‌ها"
          variant="soft"
        />
        <UButton
          to="/account/addresses"
          label="آدرس‌ها"
          variant="soft"
        />
        <UButton
          to="/wishlist"
          label="علاقه‌مندی‌ها"
          variant="soft"
        />
        <UButton
          to="/recent"
          label="اخیراً دیده‌شده"
          variant="soft"
        />
      </div>
    </template>
  </UContainer>
</template>
