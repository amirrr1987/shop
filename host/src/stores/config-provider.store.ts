import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { VueNode } from 'ant-design-vue/es/_util/type'
import type { CSPConfig, SizeType } from 'ant-design-vue/es/config-provider'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { RequiredMark } from 'ant-design-vue/es/form/Form'
import type { ValidateMessages } from 'ant-design-vue/es/form/interface'
import type { Locale } from 'ant-design-vue/es/locale'
import type { TransformCellTextProps } from 'ant-design-vue/es/table/interface'

export const useConfigProviderStore = defineStore('ConfigProvider', () => {
  // State
  const iconPrefixCls = ref<string | undefined>()
  const getTargetContainer = ref<(() => HTMLElement | Window) | undefined>()
  const getPopupContainer = ref<((triggerNode?: HTMLElement) => HTMLElement) | undefined>()
  const prefixCls = ref<string | undefined>()
  const getPrefixCls = ref<
    ((suffixCls?: string, customizePrefixCls?: string) => string) | undefined
  >()
  const renderEmpty = ref<((name?: string) => any) | undefined>()
  const transformCellText = ref<((tableProps: TransformCellTextProps) => any) | undefined>()
  const csp = ref<CSPConfig | undefined>()
  const input = ref<{ autocomplete?: string } | undefined>()
  const autoInsertSpaceInButton = ref<boolean | undefined>()
  const locale = ref<Locale | undefined>()
  const pageHeader = ref<{ ghost?: boolean } | undefined>()
  const componentSize = ref<SizeType | undefined>()
  const componentDisabled = ref<boolean | undefined>()
  const direction = ref<'rtl' | 'ltr' | undefined>()
  const space = ref<{ size?: SizeType | number } | undefined>()
  const virtual = ref<boolean | undefined>()
  const dropdownMatchSelectWidth = ref<number | boolean | undefined>()
  const form = ref<
    | {
        validateMessages?: ValidateMessages
        requiredMark?: RequiredMark
        colon?: boolean
      }
    | undefined
  >()
  const pagination = ref<{ showSizeChanger?: boolean } | undefined>()
  const theme = ref<ThemeConfig | undefined>()
  const select = ref<{ showSearch?: boolean } | undefined>()
  const wave = ref<{ disabled?: boolean } | undefined>()

  // Computed object representing the full config
  const config = computed(() => ({
    iconPrefixCls: iconPrefixCls.value,
    getTargetContainer: getTargetContainer.value,
    getPopupContainer: getPopupContainer.value,
    prefixCls: prefixCls.value,
    getPrefixCls: getPrefixCls.value,
    renderEmpty: renderEmpty.value,
    transformCellText: transformCellText.value,
    csp: csp.value,
    input: input.value,
    autoInsertSpaceInButton: autoInsertSpaceInButton.value,
    locale: locale.value,
    pageHeader: pageHeader.value,
    componentSize: componentSize.value,
    componentDisabled: componentDisabled.value,
    direction: direction.value,
    space: space.value,
    virtual: virtual.value,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth.value,
    form: form.value,
    pagination: pagination.value,
    theme: theme.value,
    select: select.value,
    wave: wave.value,
  }))

  // Actions to update individual configs
  function setIconPrefixCls(value: string | undefined) {
    iconPrefixCls.value = value
  }

  function setGetTargetContainer(value: (() => HTMLElement | Window) | undefined) {
    getTargetContainer.value = value
  }

  function setGetPopupContainer(value: ((triggerNode?: HTMLElement) => HTMLElement) | undefined) {
    getPopupContainer.value = value
  }

  function setPrefixCls(value: string | undefined) {
    prefixCls.value = value
  }

  function setGetPrefixCls(
    value: ((suffixCls?: string, customizePrefixCls?: string) => string) | undefined,
  ) {
    getPrefixCls.value = value
  }

  function setRenderEmpty(value: ((name?: string) => any) | undefined) {
    renderEmpty.value = value
  }

  function setTransformCellText(value: ((tableProps: any) => any) | undefined) {
    transformCellText.value = value
  }

  function setCsp(value: CSPConfig | undefined) {
    csp.value = value
  }

  function setInput(value: { autocomplete?: string } | undefined) {
    input.value = value
  }

  function setAutoInsertSpaceInButton(value: boolean | undefined) {
    autoInsertSpaceInButton.value = value
  }

  function setLocale(value: Locale | undefined) {
    locale.value = value
  }

  function setPageHeader(value: { ghost?: boolean } | undefined) {
    pageHeader.value = value
  }

  function setComponentSize(value: SizeType | undefined) {
    componentSize.value = value
  }

  function setComponentDisabled(value: boolean | undefined) {
    componentDisabled.value = value
  }

  function setDirection(value: 'rtl' | 'ltr' | undefined) {
    direction.value = value
  }

  function setSpace(value: { size?: SizeType | number } | undefined) {
    space.value = value
  }

  function setVirtual(value: boolean | undefined) {
    virtual.value = value
  }

  function setDropdownMatchSelectWidth(value: number | boolean | undefined) {
    dropdownMatchSelectWidth.value = value
  }

  function setForm(
    value:
      | {
          validateMessages?: ValidateMessages
          requiredMark?: RequiredMark
          colon?: boolean
        }
      | undefined,
  ) {
    form.value = value
  }

  function setPagination(value: { showSizeChanger?: boolean } | undefined) {
    pagination.value = value
  }

  function setTheme(value: ThemeConfig | undefined) {
    theme.value = value
  }

  function setSelect(value: { showSearch?: boolean } | undefined) {
    select.value = value
  }

  function setWave(value: { disabled?: boolean } | undefined) {
    wave.value = value
  }

  return {}
})
