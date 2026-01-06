---
description: 'Vue 3 development standards for admin panel - Composition API, Pinia, Ant Design Vue 4.2.6 and TailwindCSS v4.1'
alwaysApply: true
globs:
  - '**/*.vue'
  - '**/*.ts'
  - '**/composable/**'
  - '**/stores/**'
---

# Admin Panel Development Standards

Always follow these rules when working on this project.

## Vue 3 and Composition API

### Requirements

- Always use **Vue 3** and **Composition API**
- Use `<script setup lang="ts">` for all Vue components
- **Never** use Options API
- Use `ref`, `computed`, `watch` and other Composition API functions

### Correct Example

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### Incorrect Example

```vue
<!-- ❌ Never use Options API -->
<script lang="ts">
export default {
  data() {
    return { count: 0 }
  },
}
</script>
```

## State Management

- Use **Pinia** for state management
- Place stores in `src/stores` folder
- Use composables instead of mixins
- Create composables for reusable logic and place them in `src/composable`

## Project Structure

- Follow the current folder structure
- Place composable files in `src/composable`
- Place components in `src/components`
- Place stores in `src/stores`
- Place views in `src/views`

## Libraries and Dependencies

- **Do not add new libraries without approval**
- Get team approval before adding any new dependency
- Use existing dependencies: Vue 3, Pinia, Ant Design Vue 4.2.6, TailwindCSS v4.1

## UI Components

- Prioritize using core **Ant Design Vue (antdv)** components in the project
- Use custom components only when necessary
- Before creating a custom component, check if antdv has it

## Styling

### Priority Order

1. **antdv tokens** - for colors, fonts, spacing and other design tokens
2. **TailwindCSS v4.1** - for layout, display, spacing and utility classes
3. **Pure CSS** - only for complex or dynamic styles with `v-bind`

### Using Ant Design Vue Tokens

- Use `theme.useToken()` to access tokens
- For colors: `token.colorPrimary`, `token.colorTextSecondary`, `token.colorError`
- For sizes: `token.fontSize`, `token.fontSizeLG`, `token.fontSizeSM`
- For spacing: `token.paddingXS`, `token.marginXS`, `token.borderRadius`

```vue
<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { computed } from 'vue'

const { token } = theme.useToken()
const tokenValues = computed(() => token.value)
</script>

<template>
  <div :style="{ color: tokenValues.colorPrimary }">Content</div>
</template>
```

### TailwindCSS v4.1 - Important Rules

#### ❌ Never Use

- **`@apply` has been removed in TailwindCSS v4.1** - never use `@apply`
- Do not use pure CSS for display, flex, grid

#### ✅ Always Do

- Use TailwindCSS classes directly in template
- For complex or dynamic styles, use pure CSS with `v-bind` for tokens
- Use utility classes directly in `class` or `:class` attribute

### Display and Layout - Required

**Always use TailwindCSS for flex, grid and all display properties**

- Never use pure CSS for `display`, `flex`, `grid` and related properties
- Use TailwindCSS utility classes for all layout properties

#### Correct Examples

```vue
<!-- Flex -->
<Space class="flex items-center justify-between">
  <div>Content</div>
</Space>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Display -->
<div class="block">Block</div>
<div class="inline">Inline</div>
<div class="hidden">Hidden</div>

<!-- Combined with tokens -->
<Button
  class="flex items-center justify-center w-10 h-10 rounded-lg transition-all"
  :style="{ backgroundColor: tokenValues.colorPrimary }"
>
  Click me
</Button>
```

#### Incorrect Examples

```vue
<!-- ❌ Using pure CSS for display -->
<style scoped>
.container {
  display: flex;
  align-items: center;
}
</style>

<!-- ❌ Using @apply -->
<style scoped>
.button {
  @apply flex items-center; /* ❌ Doesn't work in v4.1 */
}
</style>
```

### Common TailwindCSS Classes

#### Display

- `flex`, `grid`, `block`, `inline`, `inline-block`, `hidden`, `inline-flex`

#### Flex

- Direction: `flex-col`, `flex-row`, `flex-col-reverse`, `flex-row-reverse`
- Alignment: `items-center`, `items-start`, `items-end`, `items-stretch`
- Justify: `justify-between`, `justify-center`, `justify-start`, `justify-end`, `justify-around`
- Gap: `gap-2`, `gap-4`, `gap-6`, `gap-x-4`, `gap-y-4`

#### Grid

- Columns: `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, `grid-cols-4`, `grid-cols-12`
- Gap: `gap-4`, `gap-x-4`, `gap-y-4`
- Rows: `grid-rows-1`, `grid-rows-2`, `grid-rows-3`

#### Spacing

- Padding: `p-2`, `p-4`, `px-4`, `py-2`, `pt-4`, `pb-4`
- Margin: `m-2`, `m-4`, `mx-auto`, `my-4`, `mt-4`, `mb-4`

#### Sizing

- Width: `w-full`, `w-1/2`, `w-10`, `w-[300px]`
- Height: `h-full`, `h-screen`, `h-10`, `h-[100px]`

#### Border & Radius

- `rounded`, `rounded-lg`, `rounded-full`, `border`, `border-2`

#### Typography

- `text-sm`, `text-base`, `text-lg`, `font-bold`, `text-center`

## Pre-Commit Checklist

Before committing code, make sure:

- [ ] `<script setup lang="ts">` is used
- [ ] Options API is not used
- [ ] `@apply` is not used
- [ ] TailwindCSS is used for display/flex/grid
- [ ] antdv tokens are used for colors and sizes
- [ ] Folder structure is followed
- [ ] Composables are used for reusable logic
