# u-element-plus

## 提交规范

- feat: 新功能
- fix: 修复bug
- docs: 文档修改
- style: 代码格式修改
- refactor: 代码重构
- perf: 性能优化
- test: 测试用例修改
- chore: 其他修改
- revert: 回滚
- build: 打包
- ci: CI配置

示例：
feat: 添加用户登录功能
fix(button): 修复按钮点击无响应的问题

## 为什么需要 `SFCWithInstall`

1. 不使用 SFCWithInstall：

```ts
// 当前的写法
export default {
  install: (app: App) => {
    app.component('UContextMenu', Contextmenu)
  },
}
```

在这种情况下：

- ✅ 可以使用 `app.use()` 全局注册
- ❌ 不能直接将组件当作普通组件使用
- ❌ 没有完整的类型推导
- ❌ 不能使用 `import Contextmenu from './index'` 直接获取到组件实例

1. 使用 SFCWithInstall：

```ts
type SFCWithInstall<T> = T & {
  install(app: App): void
}

const _Contextmenu = Contextmenu as SFCWithInstall<typeof Contextmenu>
_Contextmenu.install = (app: App) => {
  app.component('UContextMenu', Contextmenu)
}

export default _Contextmenu
```

在这种情况下：

- ✅ 可以使用 `app.use()` 全局注册
- ✅ 可以直接将组件当作普通组件使用
- ✅ 完整的 TypeScript 类型推导
- ✅ 可以使用多种方式导入和使用组件
