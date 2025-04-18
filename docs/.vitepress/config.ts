import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import typePopoverPlugin from './plugins/typePopoverPlugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'U Element Plus',
  head: [['link', { rel: 'icon', href: '/u-element-plus-docs/favicon.ico' }]],
  description: '基于Element Plus的二次封装,实现如表格组件,表单组件等功能.',
  base: '/u-element-plus-docs/',
  vite: {
    plugins: [vueJsx(), UnoCSS()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
        '@docs': fileURLToPath(new URL('../../docs', import.meta.url)),
        'u-element-plus': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview)
      md.use(componentPreview)
      md.use(typePopoverPlugin)
    },
    //显示行数
    lineNumbers: false,
    //中文配置
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '危险',
      detailsLabel: '详情',
      infoLabel: '信息',
    },
  },
  lang: 'zh-CN',

  lastUpdated: true, // 启用最后更新时间

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/form' },
    ],
    outline: {
      level: [2, 3],
    },
    sidebar: [
      {
        text: '组件',
        items: [
          { text: 'Form 表单', link: '/components/form' },
          { text: 'Table 表格', link: '/components/table' },
          { text: 'Operation 操作栏', link: '/components/operation' },
          { text: 'ContextMenu 右键菜单', link: '/components/context-menu' },
          { text: 'TitleBar 标题栏', link: '/components/title-bar' },
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          { text: 'useForm 表单Hook', link: '/hooks/use-form' },
          { text: 'useTable 表格Hook', link: '/hooks/use-table' },
          { text: 'useFullscreen 全屏Hook', link: '/hooks/use-fullscreen' },
        ],
      },
    ],

    // 添加最后更新时间的中文设置
    lastUpdatedText: '最后更新于',

    // 添加外观切换的中文设置
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    // 大纲标题
    outlineTitle: '本页目录',
    // 返回顶部按钮文字
    returnToTopLabel: '返回顶部',
    // 社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/waioyou/u-element-plus.git' }],
    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
})
