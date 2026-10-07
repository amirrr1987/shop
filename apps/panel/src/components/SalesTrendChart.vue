<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  points: Array<{ label: string; revenue: number; orders: number }>
}>()

const width = 640
const height = 180
const padX = 12
const padY = 16

const maxRevenue = computed(() =>
  Math.max(1, ...props.points.map((point) => point.revenue)),
)

const path = computed(() => {
  if (!props.points.length) {
    return ''
  }
  const step =
    props.points.length === 1
      ? 0
      : (width - padX * 2) / (props.points.length - 1)
  return props.points
    .map((point, index) => {
      const x = padX + index * step
      const y =
        height -
        padY -
        (point.revenue / maxRevenue.value) * (height - padY * 2)
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const bars = computed(() => {
  if (!props.points.length) {
    return []
  }
  const gap = 4
  const barWidth = Math.max(
    4,
    (width - padX * 2) / props.points.length - gap,
  )
  return props.points.map((point, index) => {
    const h = (point.revenue / maxRevenue.value) * (height - padY * 2)
    const x = padX + index * (barWidth + gap)
    const y = height - padY - h
    return {
      key: `${point.label}-${index}`,
      x,
      y,
      width: barWidth,
      height: h,
      title: `${point.label}: ${point.orders} سفارش`,
    }
  })
})
</script>

<template>
  <div style="width: 100%; overflow-x: auto">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      aria-label="نمودار فروش"
      style="width: 100%; max-width: 640px; height: auto; display: block"
    >
      <line
        :x1="padX"
        :y1="height - padY"
        :x2="width - padX"
        :y2="height - padY"
        stroke="rgba(0,0,0,0.12)"
        stroke-width="1"
      />
      <rect
        v-for="bar in bars"
        :key="bar.key"
        :x="bar.x"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height"
        rx="2"
        fill="rgba(114, 46, 209, 0.28)"
      >
        <title>{{ bar.title }}</title>
      </rect>
      <path
        v-if="path"
        :d="path"
        fill="none"
        stroke="#722ed1"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>
