# useForm

## 基础用法

`useForm` 是一个便捷的表单数据管理钩子函数，它封装了表单数据加载、项配置、动态组件等常用功能。需要结合表单组件使用。

通过 `useForm`，您可以轻松管理表单的各个方面，提高开发效率。

<preview path="../demo/use-form/basic.vue"></preview>

## 手动触发数据加载

默认情况下，`useForm` 会在组件挂载时自动获取数据，但您也可以通过设置 `auto: false` 来手动调用 `getFormData` 方法控制数据加载时机：

```typescript
const { getFormData } = useForm(() => getUserDetail(), false)

// 在需要的时候手动加载数据
const handleLoadData = () => {
  getFormData()
}
```

## 更新表单项配置

您可以使用 `updateFormColumn` 方法动态更新表单项的配置：

```typescript
const { updateFormColumn } = useForm()

// 更新表单项的标签
updateFormColumn('name', 'label', '姓名')

// 更新表单项的占位符
updateFormColumn('name', 'attrs.placeholder', '请输入姓名')

// 更新表单项的验证规则
updateFormColumn('name', 'rules.0.required', true)
```

## 创建表单项配置

通过 `createFormColumnWithElement` 和 `createFormColumnWithComponent` 方法创建表单项配置：从而获得`attrs`的类型提示

```typescript
const { createFormColumnWithElement, createFormColumnWithComponent } = useForm()

// 使用表单元素创建表单项
const nameColumn = createFormColumnWithElement('input', {
  prop: 'name',
  label: '姓名',
  attrs: {
    placeholder: '请输入姓名',
  },
})

// 使用组件创建表单项
const educationColumn = createFormColumnWithComponent<TitleBarProps>(UTitleBar, {
  prop: 'education',
  label: '教育经历',
  attrs: {
    iconClass: 'iconfont icon-education',
  },
})
```

## 重置表单数据

`resetFormData` 方法用于重置表单数据。在hook内部, 会在getFormData获取表单数据后，深拷贝一份数据到`_formData`中，当调用`resetFormData`时，会使用`_formData`的值来重置`formData`。

```typescript
const { resetFormData } = useForm()

// 重置表单数据
resetFormData()
```

## API

### 完整参数

`useForm` 接受泛型参数，泛型参数为表单数据类型。

`useForm` 接受两个参数：

1. `callback`: 获取表单数据的函数，需要返回表单数据
2. `auto`: 是否自动获取数据，默认为 `true`

### 返回值

`useForm` 返回以下内容供您使用：

| 返回值                        | 说明             | 默认值  |
| ----------------------------- | ---------------- | ------- |
| loading                       | 表单加载状态     | `false` |
| formRef                       | 表单实例引用     | -       |
| formData                      | 表单数据         | `{}`    |
| formColumns                   | 表单项配置       | `[]`    |
| createFormColumnWithElement   | 创建表单项方法   | -       |
| createFormColumnWithComponent | 创建表单项方法   | -       |
| setFormColumns                | 设置表单项方法   | -       |
| updateFormColumn              | 更新表单项方法   | -       |
| resetFormData                 | 重置表单数据方法 | -       |
| getFormData                   | 获取表单数据方法 | -       |

## 最佳实践

::: warning

1. 始终在 `onMounted` 或其他生命周期钩子中设置表单项，确保它们在组件初始化后被正确配置。

2. 当表单数据依赖于用户交互（如搜索、筛选）时，将 `auto` 设置为 `false`，并在适当的时机手动调用 `getFormData()`。

3. 合理利用 `updateFormColumn` 动态更新表单项配置，以适应不同的业务需求。

4. 使用 `createFormColumnWithElement` 和 `createFormColumnWithComponent` 方法来简化表单项的创建过程。

:::
