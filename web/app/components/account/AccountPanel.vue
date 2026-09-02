<script setup lang="ts">
const { user, updateProfile, logout } = useAuth()

const profile = reactive({
  firstName: user.value?.firstName ?? '',
  lastName: user.value?.lastName ?? '',
  email: user.value?.email ?? '',
  phone: user.value?.phone ?? '',
  fax: user.value?.fax ?? ''
})

const password = reactive({
  current: '',
  next: '',
  confirm: ''
})

const address = reactive({
  address: '',
  city: '',
  zip: ''
})

watch(user, (value) => {
  if (!value) return
  profile.firstName = value.firstName
  profile.lastName = value.lastName
  profile.email = value.email
  profile.phone = value.phone
  profile.fax = value.fax ?? ''
}, { immediate: true })

const accordionItems = [
  { label: 'ویرایش اطلاعات حساب', value: 'info', slot: 'info' as const },
  { label: 'تغییر رمز عبور', value: 'password', slot: 'password' as const },
  { label: 'دفترچه آدرس', value: 'address', slot: 'address' as const },
  { label: 'تاریخچه سفارشات', value: 'orders', slot: 'orders' as const }
]

const mockOrders = [
  { id: 'RZ-102345', date: '۱۴۰۴/۰۶/۰۱', total: '۲,890,000 تومان', status: 'تحویل شده' },
  { id: 'RZ-102112', date: '۱۴۰۴/۰۵/۲۰', total: '1,250,000 تومان', status: 'در حال ارسال' }
]

function saveProfile() {
  updateProfile({ ...profile })
}

function savePassword() {
  useToast().add({
    title: 'رمز عبور تغییر کرد',
    icon: 'i-lucide-key',
    color: 'success'
  })
  password.current = ''
  password.next = ''
  password.confirm = ''
}

function saveAddress() {
  useToast().add({
    title: 'آدرس ذخیره شد',
    icon: 'i-lucide-map-pin',
    color: 'success'
  })
}
</script>

<template>
  <UEmpty
    v-if="!user"
    icon="i-lucide-user"
    title="وارد حساب کاربری نشده‌اید"
    description="برای مشاهده حساب خود ابتدا وارد شوید"
    :actions="[{ label: 'ورود', to: '/login', icon: 'i-lucide-log-in' }]"
  />

  <UCard v-else>
    <UPageHeader
      :title="`${user.firstName} ${user.lastName}`"
      :description="user.email"
    />

    <UAccordion
      :items="accordionItems"
      type="multiple"
      :default-value="['info']"
    >
      <template #info>
        <UForm @submit.prevent="saveProfile">
          <UPageColumns>
            <UFormField label="نام">
              <UInput v-model="profile.firstName" />
            </UFormField>
            <UFormField label="نام خانوادگی">
              <UInput v-model="profile.lastName" />
            </UFormField>
          </UPageColumns>
          <UFormField label="ایمیل">
            <UInput
              v-model="profile.email"
              type="email"
            />
          </UFormField>
          <UPageColumns>
            <UFormField label="تلفن">
              <UInput v-model="profile.phone" />
            </UFormField>
            <UFormField label="فکس">
              <UInput v-model="profile.fax" />
            </UFormField>
          </UPageColumns>
          <UButton
            type="submit"
            label="ذخیره"
            icon="i-lucide-save"
          />
        </UForm>
      </template>

      <template #password>
        <UForm @submit.prevent="savePassword">
          <UFormField label="رمز فعلی">
            <UInput
              v-model="password.current"
              type="password"
            />
          </UFormField>
          <UFormField label="رمز جدید">
            <UInput
              v-model="password.next"
              type="password"
            />
          </UFormField>
          <UFormField label="تکرار رمز جدید">
            <UInput
              v-model="password.confirm"
              type="password"
            />
          </UFormField>
          <UButton
            type="submit"
            label="تغییر رمز"
            icon="i-lucide-key"
          />
        </UForm>
      </template>

      <template #address>
        <UForm @submit.prevent="saveAddress">
          <UFormField label="آدرس">
            <UInput v-model="address.address" />
          </UFormField>
          <UPageColumns>
            <UFormField label="شهر">
              <UInput v-model="address.city" />
            </UFormField>
            <UFormField label="کد پستی">
              <UInput v-model="address.zip" />
            </UFormField>
          </UPageColumns>
          <UButton
            type="submit"
            label="ذخیره آدرس"
            icon="i-lucide-map-pin"
          />
        </UForm>
      </template>

      <template #orders>
        <UPageList>
          <UCard
            v-for="order in mockOrders"
            :key="order.id"
          >
            <UUser
              :name="order.id"
              :description="order.date"
              icon="i-lucide-package"
            />
            <UAlert
              color="neutral"
              variant="subtle"
              :title="order.total"
              :description="order.status"
            />
          </UCard>
        </UPageList>
      </template>
    </UAccordion>

    <UButton
      label="خروج"
      color="error"
      variant="outline"
      icon="i-lucide-log-out"
      @click="logout(); navigateTo('/login')"
    />
  </UCard>
</template>
