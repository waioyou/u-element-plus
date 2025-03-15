# Operation 操作按钮

用于表格中的操作按钮栏。

## 基础用法

通过`operations`属性设置操作按钮列表。

::: warning
按钮配置项`buttonAttrs`可以配置`el-button`组件的属性和`click`事件。

按钮配置项`confirmAttrs`可以配置`el-popconfirm`组件的属性和`confirm`事件和`cancel`事件。
:::

<preview path="../demo/operation/basic.vue"></preview>

## 按钮类型

通过`type`属性设置操作栏按钮类型，可选值为`button`、`link`、`text`。默认值为`text`。

:::warning
操作列按钮的类型应当保持一致，因此配置项的`buttonAttrs`不支持返回`text`、`link`字段。
:::

<preview path="../demo/operation/type.vue"></preview>

## 按钮图标

通过按钮配置项`icon`属性设置图标；适用于使用element-plus的图标库。

通过按钮配置项`iconClass`属性设置图标类名；适用于使用iconfont、Font Awesome等图标库。如`iconfont icon-edit`.

::: warning
按钮配置项`icon`和`iconClass`只能设置一个，如果同时设置，以`iconClass`为准。

如果`onlyIcon`属性为`true`，则按钮只显示图标，不显示文字；此时`icon`或`iconClass`不能为空。
:::

<preview path="../demo/operation/icon.vue"></preview>

## 隐藏按钮

通过按钮配置项`if`属性设置按钮是否隐藏。它接受`boolean`或者`(row) => boolean`类型的值。

<preview path="../demo/operation/hidden.vue"></preview>

## 按钮事件和气泡确认框事件

通过按钮配置项`buttonAttrs`的`onClick`属性设置按钮点击事件；

通过按钮配置项`confirmAttrs`的`onConfirm`属性和`onCancel`属性设置气泡确认框确认事件和取消事件。

::: warning
按钮`click`事件和气泡确认框`confirm`事件触发时机优先于表格操作列的`click-operation`事件。
:::

<preview path="../demo/operation/events.vue"></preview>

## API

### Props

| 名称       | 说明                       | 类型                           | 默认值     |
| ---------- | -------------------------- | ------------------------------ | ---------- |
| slotProps  | el-table的列默认插槽属性   | -                              | -          |
| item       | 操作列表格配置项           | -                              | -          |
| operations | 操作按钮配置数组           | `Operations<T>`                | `[]`       |
| type       | 按钮类型                   | `'button' \| 'text' \| 'link'` | `'button'` |
| onlyIcon   | 是否只显示图标，不显示文字 | `boolean`                      | `false`    |

### Events

| 事件名          | 说明               | 参数                                    |
| --------------- | ------------------ | --------------------------------------- |
| click-operation | 点击操作按钮时触发 | `(name: string, row: T, index: number)` |

::: details 操作列配置项类型

```ts
export type Operations<T = any> = OperationItem<T>[]

export interface OperationItem<T = any> {
  name: string
  label: string
  if?: boolean | ((row: T) => boolean)
  buttonAttrs?: (row: T, index: number) => OperationItemButtonAttrs
  confirmAttrs?: (row: T, index: number) => OperationItemConfirmAttrs
}

export type OperationItemButtonAttrs = Partial<
  TypeNoReadonly<Omit<ButtonProps, 'text' | 'link'>>
> & {
  iconClass?: string
  onClick?: () => void
}
export type OperationItemConfirmAttrs = Partial<TypeNoReadonly<PopconfirmProps>> & {
  title?: string
  onConfirm?: () => void
  onCancel?: () => void
}
```

:::
