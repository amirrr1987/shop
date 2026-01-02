import type { Direction } from 'ant-design-vue/es/config-provider'
import type { Locale } from 'ant-design-vue/es/locale'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import faIR from 'ant-design-vue/es/locale/fa_IR'
import type { MappingAlgorithm, SizeType } from 'ant-design-vue/es/config-provider/context'
import type { AliasToken } from 'ant-design-vue/es/theme/internal'
import type { OverrideToken } from 'ant-design-vue/es/theme/interface'
import { theme } from 'ant-design-vue'
import { theme as antTheme } from 'ant-design-vue/es'
export const usePanelThemeStore = defineStore('panelTheme', () => {
  const { token: antToken } = antTheme.useToken()
  const componentSize = ref<SizeType>('middle')
  const locale = ref<Locale>(faIR)
  const direction = ref<Direction>('rtl')
  const isDark = ref<boolean>(false)
  const toggleDark = () => {
    isDark.value = !isDark.value
  }
  const isCompact = ref<boolean>(false)
  const toggleCompact = () => {
    isCompact.value = !isCompact.value
  }

  const token = ref<Partial<AliasToken>>({
    fontFamily: 'var(--font-sans)',
    colorPrimary: '#1677ff',
    borderRadius: 6,
    fontSize: 14,
  })
  const components = ref<OverrideToken>({
    Layout: {
      get colorBgHeader() {
        return antToken.value.colorBgContainer
      },
      get colorBgTrigger() {
        return token.value.colorPrimary
      },
    },
  })
  const algorithm = ref<MappingAlgorithm[]>([])

  watch([isDark, isCompact], ([darkVal, compactVal]) => {
    const algorithms: MappingAlgorithm[] = []
    if (darkVal) {
      algorithms.push(theme.darkAlgorithm)
    }
    if (compactVal) {
      algorithms.push(theme.compactAlgorithm)
    }
    algorithm.value = algorithms
  })

  const hashed = ref<boolean>(false)
  const inherit = ref<boolean>(false)
  return {
    direction,
    componentSize,
    locale,
    token,
    components,
    isDark,
    toggleDark,
    isCompact,
    toggleCompact,
    algorithm,
    hashed,
    inherit,
  }
})
