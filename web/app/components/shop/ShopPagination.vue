<script setup lang="ts">
const { page, totalPages, totalProducts, pageSize, setPage } = useShopCatalog()
</script>

<template>
  <UPagination
    v-if="totalPages > 1"
    :page="page"
    :total="totalProducts"
    :items-per-page="pageSize"
    show-edges
    @update:page="setPage"
  />
</template>
