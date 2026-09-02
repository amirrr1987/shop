<template>
  <div>
    <LayoutShopTopBar />
    <LayoutShopHeader />
    <UMain class="w-full min-w-0 overflow-x-clip">
      <slot />
    </UMain>
    <LayoutShopFooter />
  </div>
</template>
