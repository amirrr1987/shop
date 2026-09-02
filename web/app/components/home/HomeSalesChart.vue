<script setup lang="ts">
import { categoryShareData, monthlySalesData } from '~/data/home-stats'

const colorMode = useColorMode()

const textColor = computed(() =>
  colorMode.value === 'dark' ? '#e5e7eb' : '#374151'
)

const axisColor = computed(() =>
  colorMode.value === 'dark' ? '#6b7280' : '#9ca3af'
)

const salesOption = computed<ECOption>(() => ({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['فروش (میلیون)', 'سفارش'],
    textStyle: { color: textColor.value }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: monthlySalesData.months,
    axisLabel: { color: axisColor.value },
    axisLine: { lineStyle: { color: axisColor.value } }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: axisColor.value },
    splitLine: { lineStyle: { color: axisColor.value, opacity: 0.2 } }
  },
  series: [
    {
      name: 'فروش (میلیون)',
      type: 'bar',
      data: monthlySalesData.sales,
      itemStyle: { borderRadius: [4, 4, 0, 0] }
    },
    {
      name: 'سفارش',
      type: 'line',
      smooth: true,
      data: monthlySalesData.orders
    }
  ]
}))

const categoryOption = computed<ECOption>(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%'
  },
  legend: {
    orient: 'vertical',
    right: 0,
    top: 'center',
    textStyle: { color: textColor.value }
  },
  series: [
    {
      name: 'سهم دسته',
      type: 'pie',
      radius: ['42%', '70%'],
      center: ['38%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 6,
        borderWidth: 2
      },
      label: {
        color: textColor.value
      },
      data: categoryShareData
    }
  ]
}))
</script>

<template>
  <UPageSection
    headline="آمار"
    title="روند فروش روزر"
    description="نمودارهای زنده با ECharts — فروش ماهانه و سهم دسته‌بندی‌ها"
    :ui="{
      root: 'space-y-6',
      title: 'text-xl sm:text-2xl',
      description: 'text-base text-muted'
    }"
  >
    <div class="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <UCard
        variant="subtle"
        class="lg:col-span-8"
        :ui="{ root: 'ring-1 ring-default', body: 'p-4 sm:p-5' }"
      >
        <p class="mb-4 text-sm font-medium text-default">
          فروش و سفارش ۶ ماه اخیر
        </p>
        <div class="min-w-0 overflow-hidden">
          <VChartServer
            :option="salesOption"
            autoresize
            class="h-72 w-full max-w-full sm:h-80"
          />
        </div>
      </UCard>

      <UCard
        variant="subtle"
        class="lg:col-span-4"
        :ui="{ root: 'ring-1 ring-default', body: 'p-4 sm:p-5' }"
      >
        <p class="mb-4 text-sm font-medium text-default">
          سهم دسته‌بندی‌ها
        </p>
        <ClientOnly>
          <div class="min-w-0 overflow-hidden">
            <VChart
              :option="categoryOption"
              autoresize
              class="h-72 w-full max-w-full sm:h-80"
            />
          </div>
          <template #fallback>
            <div class="min-w-0 overflow-hidden">
              <VChartServer
                :option="categoryOption"
                autoresize
                class="h-72 w-full max-w-full sm:h-80"
              />
            </div>
          </template>
        </ClientOnly>
      </UCard>
    </div>
  </UPageSection>
</template>
