// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.scss'

// 使用组件demo效果预览插件
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

// 导入组件
import UElementPlus from 'u-element-plus'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', ElementPlusContainer)
    app.use(ElementPlus, {
      locale: zhCn,
    })
    app.use(UElementPlus as unknown as any)
  },
}
