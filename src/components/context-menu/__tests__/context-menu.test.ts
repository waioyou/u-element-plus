import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ContextMenu from '../context-menu.vue'

describe('ContextMenu 组件', () => {
  let wrapper: any

  // 每个测试用例前都重置组件
  beforeEach(() => {
    wrapper = mount(ContextMenu, {
      props: {
        afterClickHide: true,
        offsetX: 0,
        offsetY: 0,
        manual: false,
      },
      slots: {
        default: '<div>菜单内容</div>',
      },
    })
  })

  it('应该正确渲染组件', () => {
    const element = document.querySelector('.u-context-menu')!
    expect(element).toBeTruthy()
    expect(element.textContent).toBe('菜单内容')
  })

  it('应该在右键点击时显示菜单,并出现在正确位置', async () => {
    // 模拟 window 的尺寸
    global.innerWidth = 1024
    global.innerHeight = 768
    // 模拟右键点击
    const clickEvent = new MouseEvent('contextmenu', {
      clientX: 200,
      clientY: 200,
    })
    document.dispatchEvent(clickEvent)
    // 验证菜单是否显示
    expect(wrapper.vm.visible).toBe(true)
    const { top, left } = wrapper.vm.position
    expect(top).toBe(200)
    expect(left).toBe(200)
  })

  it('应该在点击外部时隐藏菜单', async () => {
    // 模拟 window 的尺寸
    global.innerWidth = 1024
    global.innerHeight = 768
    // 模拟右键点击
    document.dispatchEvent(
      new MouseEvent('contextmenu', {
        clientX: 200,
        clientY: 200,
      }),
    )
    expect(wrapper.vm.visible).toBe(true)
    document.dispatchEvent(
      new MouseEvent('click', {
        clientX: 100,
        clientY: 100,
      }),
    )
    expect(wrapper.vm.visible).toBe(false)
  })

  it('应该在设置 manual=true 时不自动监听右键事件', () => {
    // 模拟 window 的尺寸
    global.innerWidth = 1024
    global.innerHeight = 768
    const wrapper = mount(ContextMenu, {
      props: {
        manual: true,
      },
    })

    // 使用 vi.spyOn 监听 addEventListener
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')

    // 触发 mounted 钩子
    wrapper.vm.$nextTick()

    // 验证是否没有添加右键事件监听
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('contextmenu', expect.any(Function))
  })

  it('应该正确响应 triggerSelectors 属性', async () => {
    const wrapper1 = mount(ContextMenu, {
      props: {
        afterClickHide: true,
        offsetX: 0,
        offsetY: 0,
        manual: false,
        // triggerSelectors: '.trigger-selector',
      },
    })
    // 模拟 window 的尺寸
    global.innerWidth = 1024
    global.innerHeight = 768
    // 模拟右键点击
    document.dispatchEvent(
      new MouseEvent('contextmenu', {
        clientX: 200,
        clientY: 200,
      }),
    )
    expect(wrapper1.vm.visible).toBe(true)
  })
})
