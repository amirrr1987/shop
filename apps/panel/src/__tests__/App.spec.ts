import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ConfigProvider } from 'ant-design-vue'
import App from '../App.vue'

describe('App', () => {
  it('renders ConfigProvider shell', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          ConfigProvider: false,
        },
      },
    })

    expect(wrapper.findComponent(ConfigProvider).exists()).toBe(true)
  })
})
