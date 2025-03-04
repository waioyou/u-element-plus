import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'U Element Plus',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  description: '基于Element Plus的二次封装,实现如表格组件,表单组件等功能.',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
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

    sidebar: [
      {
        text: '组件',
        items: [
          { text: 'Form 表单', link: '/components/form' },
          { text: 'Table 表格', link: '/components/table' },
          { text: 'ContextMenu 右键菜单', link: '/components/context-menu' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
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
