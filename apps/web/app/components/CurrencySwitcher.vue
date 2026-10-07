<script setup lang="ts">
const { allowCustomerChoice, selectedUnit, unitItems } = useCurrency()
</script>

<template>
  <USelect
    v-if="allowCustomerChoice"
    v-model="selectedUnit"
    :items="unitItems"
    icon="i-lucide-banknote"
    size="sm"
    color="neutral"
    variant="ghost"
    class="w-36"
    aria-label="واحد نمایش قیمت"
  />
</template>
