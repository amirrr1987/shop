<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const { items, remove } = useWishlist()
const { add } = useCart()
</script>

<template>
  <USlideover
    v-model:open="open"
    title="علاقه‌مندی‌ها"
    description="محصولات ذخیره‌شده"
  >
    <template #body>
      <UEmpty
        v-if="!items.length"
        icon="i-lucide-heart"
        title="لیست علاقه‌مندی خالی است"
        description="محصولاتی که دوست دارید را اینجا ذخیره کنید"
        :actions="[{ label: 'مشاهده فروشگاه', to: '/shop', icon: 'i-lucide-store' }]"
      />

      <UPageList v-else>
        <UCard
          v-for="product in items"
          :key="product.id"
        >
          <UUser
            :name="product.name"
            :description="product.brand"
            :avatar="product.image"
          />

          <template #footer>
            <UFieldGroup orientation="horizontal">
              <UButton
                label="افزودن به سبد"
                icon="i-lucide-shopping-cart"
                @click="add(product)"
              />
              <UButton
                color="error"
                variant="ghost"
                icon="i-lucide-trash-2"
                @click="remove(product.id)"
              />
            </UFieldGroup>
          </template>
        </UCard>
      </UPageList>
    </template>

    <template #footer>
      <UButton
        label="مشاهده همه"
        color="neutral"
        variant="outline"
        to="/wishlist"
        block
      />
    </template>
  </USlideover>
</template>
