import type { VueNode } from 'ant-design-vue/es/_util/type'
import type { CSPConfig, SizeType } from 'ant-design-vue/es/config-provider'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { RequiredMark } from 'ant-design-vue/es/form/Form'
import type { ValidateMessages } from 'ant-design-vue/es/form/interface'
import type { Locale } from 'ant-design-vue/es/locale'
import type { TransformCellTextProps } from 'ant-design-vue/es/table/interface'

export interface ConfigProvider {
  iconPrefixCls?: string
  getTargetContainer?: () => HTMLElement | Window
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  prefixCls?: string
  getPrefixCls?: (suffixCls?: string, customizePrefixCls?: string) => string
  renderEmpty?: (name?: string) => VueNode
  transformCellText?: (tableProps: TransformCellTextProps) => any
  csp?: CSPConfig
  input?: {
    autocomplete?: string
  }
  autoInsertSpaceInButton?: boolean
  locale?: Locale
  pageHeader?: {
    ghost?: boolean
  }
  componentSize?: SizeType
  componentDisabled?: boolean
  direction?: 'rtl' | 'ltr'
  space?: {
    size?: SizeType | number
  }
  virtual?: boolean
  dropdownMatchSelectWidth?: number | boolean
  form?: {
    validateMessages?: ValidateMessages
    requiredMark?: RequiredMark
    colon?: boolean
  }
  pagination?: {
    showSizeChanger?: boolean
  }
  theme?: ThemeConfig
  select?: {
    showSearch?: boolean
  }
  wave?: {
    disabled?: boolean
  }
}
