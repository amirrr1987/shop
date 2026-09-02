<script setup lang="ts">
import type { BlogPost } from '~/data/blog'

defineProps<{
  post: BlogPost
}>()
</script>

<template>
  <div class="space-y-8">
    <UBlogPost
      :title="post.title"
      :description="post.excerpt"
      :date="post.date"
      :image="post.image"
      :badge="post.category"
      :authors="[{ name: post.author }]"
      orientation="vertical"
    />

    <UCarousel
      v-if="post.images?.length"
      v-slot="{ item }"
      :items="post.images"
      arrows
      dots
    >
      <NuxtImg
        :src="item"
        :alt="post.title"
        width="800"
        height="500"
        loading="lazy"
      />
    </UCarousel>

    <UPageList>
      <UAlert
        v-for="(paragraph, index) in post.content"
        :key="index"
        color="neutral"
        variant="subtle"
        :title="paragraph"
      />
    </UPageList>

    <UAlert
      v-if="post.quote"
      color="info"
      variant="subtle"
      icon="i-lucide-quote"
      :title="post.quote"
    />

    <UFieldGroup orientation="horizontal">
      <UBadge
        v-for="tag in post.tags"
        :key="tag"
        color="primary"
        variant="subtle"
        :label="tag"
      />
    </UFieldGroup>

    <UFieldGroup orientation="horizontal">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-facebook"
        to="#"
      />
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-x"
        to="#"
      />
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-telegram"
        to="#"
      />
    </UFieldGroup>
  </div>
</template>
