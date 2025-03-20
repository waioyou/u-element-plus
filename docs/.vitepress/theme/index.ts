// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import TypePopover from '../components/type-popover/type-popover.vue'
import './style.scss'

// 使用组件demo效果预览插件
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

// // 导入组件
// import UElementPlus from 'u-element-plus'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'uno.css'
import { Theme } from 'vitepress'
import { generateUserList } from '@docs/mock/user'
generateUserList()
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const plugin = await import('u-element-plus')
      app.use(plugin.default)
    }
    app.component('demo-preview', ElementPlusContainer)
    app.use(ElementPlus as unknown as any, {
      locale: zhCn,
    })
    // app.use(UElementPlus)
    app.component('TypePopover', TypePopover)
  },
} satisfies Theme
