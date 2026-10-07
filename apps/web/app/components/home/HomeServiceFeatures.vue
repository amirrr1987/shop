<script setup lang="ts">
import { trustFeatures } from '~/utils/trust'

const settings = useStoreSettingsState()
const shopName = computed(() => settings.value.shopName || 'فروشگاه')
const items = trustFeatures
const multi = items.length > 1
</script>

<template>
  <section class="space-y-4">
    <div class="space-y-1">
      <h2 class="text-highlighted text-xl font-semibold sm:text-2xl">
        چرا {{ shopName }}؟
      </h2>
      <p class="text-muted text-sm sm:text-base">
        خرید مطمئن با ارسال به‌موقع، پرداخت امن و پشتیبانی واقعی.
      </p>
    </div>

    <UCarousel
      v-slot="{ item }"
      :items="items"
      :loop="multi"
      :arrows="multi"
      :dots="false"
      :autoplay="{ delay: 4000, stopOnInteraction: true }"
      :ui="{
        item: 'basis-[80%] ps-3 sm:basis-1/2 lg:basis-1/4',
        container: 'ms-0',
      }"
      class="w-full"
    >
      <NuxtLink
        :to="item.to || '/'"
        class="border-default bg-elevated hover:bg-accented flex h-full flex-col gap-3 rounded-lg border p-4 transition"
      >
        <div class="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
          <UIcon
            :name="item.icon"
            class="size-5"
          />
        </div>
        <div class="space-y-1">
          <p class="text-highlighted font-medium">
            {{ item.title }}
          </p>
          <p class="text-muted text-sm leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </NuxtLink>
    </UCarousel>
  </section>
</template>
