# Form 表单

通过配置项（options）动态生成表单内容；包含了Element Plus表单组件中的所有组件，并支持对应组件所有的属性和事件。

包括如下组件：`el-autocomplete`、`el-cascader`、`el-checkbox-group`、`el-checkbox`、`el-color-picker`、`el-date-picker`、`el-datetime-picker`、`el-input`、`el-input-number`、`el-radio`、`el-radio-group`、`el-rate`、`el-select`、`el-select-v2`、`el-slider`、`el-switch`、`el-time-picker`、`el-time-select`、`el-transfer`、`el-tree-select`、`el-upload`以及拓展组件`u-title-bar`。

:::warning
在使用多个`el-checkbox`或`el-radio`组件时，请使用`el-checkbox-group`或`el-radio-group`组件，并在`attrs`中配置选项列表`options`。
:::

## 基础用法

通过表单配置选项生成一个基础的表单, 将对应的组件属性和事件设置在`attrs`字段中。如`placeholder、disabled、size`等等,具体请查看对应组件的Element Plus文档。

<preview path="../demo/form/basic.vue"></preview>

## 混合布局

通过配置`span`属性来设置表单项的宽度，如`1/2`表示占据父容器的二分之一宽度。

通过表单的`gutter`属性来设置表单项之间的间距。默认为：`20`。

<preview path="../demo/form/span.vue"></preview>

## 自定义表单项

支持通过作用域插槽和表单配置项的`render`、`renderLabel`、`renderError`属性来设置表单项的label、error、default插槽内容。

::: warning
作用域插槽优先级高于表单配置项的`render`、`renderLabel`、`renderError`属性。

`render`、`renderLabel`、`renderError` 需要返回`VNode｜string`; 可以通过`h`函数或者指定`lang="tsx"`。
:::

<preview path="../demo/form/slot.vue"></preview>

## 查看模式

通过设置表单属性 `view` 属性来控制表单是否为查看模式。同时也可以通过设置表单项的`view`属性来控制表单项是否为查看模式。

`view`的类型为：`boolean` | `Ref<boolean>` | `ComputedRef<boolean>`

可以通过表单项的`formatter`属性来自定义表单项查看模式的显示内容。

::: warning
表单属性 `view` 优先级高于表单项的 `view` 属性。
:::

<preview path="../demo/form/view.vue"></preview>

## 动态表单

通过配置表单项中的`rendered`和`display`字段，从而实现动态设置表单的展示。

`rendered`和`display`值类型为：`boolean` | `Ref<boolean>` | `ComputedRef<boolean>`，用于控制表单项的隐藏和现实，分别对应`v-if`和`v-show`

::: warning
建议使用计算属性，如`rendered: computed(() => formData.value.q1 === '1')`
:::

<preview path="../demo/form/dynamic.vue"></preview>

## 标签提示信息

通过配置`tooltip`属性来设置表单项的提示信息。

<preview path="../demo/form/tooltip.vue"></preview>

## 行内表单

通过设置表单属性 `inline` 来控制表单是否为行内表单。通过用于查询条件。

行内模式时；表单有一个搜索栏插槽`searchbar`，用于放置如查询、重置按钮。

行内模式时，表单元素的宽度不会自适应父容器，需要自行设置默认宽度；可以通过配置表单项的`span`、`class`、`style`属性来设置表单项的宽度。

<preview path="../demo/form/inline.vue"></preview>

## API

支持`el-form`组件的属性、事件、插槽、对外暴露的方法；具体请查看[Element Plus Form 文档](https://element-plus.org/zh-CN/component/form.html)

以下只列举与`el-form`、`el-form-item`组件不同的属性、事件、插槽、对外暴露的方法。

### Props

| 名称      | 说明                        | 类型                  | 默认值       |
| --------- | --------------------------- | --------------------- | ------------ |
| columns   | 表单配置项                  | `FromColumns`         | `[]`         |
| view      | 是否为查看模式              | `boolean`             | `false`      |
| gutter    | 栅格间隔                    | `number`              | `20`         |
| ~~model~~ | 已废弃，请使用`v-model`代替 | `Record<string,any> ` | 表单数据对象 |

### Events

| 事件名   | 说明                   | 参数类型                                                     |
| -------- | ---------------------- | ------------------------------------------------------------ |
| validate | 任一表单项被校验后触发 | `(field: string, isValid: boolean, message: string) => void` |
| change   | 任一表单项被改变后触发 | `(field: string, item: FormColumn) => void`                  |

### Slots

| 插槽名          | 说明             | 作用域参数                            |
| --------------- | ---------------- | ------------------------------------- |
| `label-${prop}` | 自定义标签内容   | `{ item: FormColumn, label: string }` |
| `error-${prop}` | 自定义错误提示   | `{ item: FormColumn, error: string }` |
| `${prop}`       | 自定义表单项内容 | `{ item: FormColumn}`                 |

### FormColumn

`FormColumn` 是用于定义表单项的配置对象，支持多种属性以满足不同的表单需求。以下是 `FormColumn` 的详细配置项说明：

| 名称        | 说明                                                 | 类型                                                                  |
| ----------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| prop        | 表单项的唯一标识符                                   | `string`                                                              |
| element     | 表单项类型，支持所有 Element Plus 表单组件及扩展组件 | `enum` <TypePopover typeName="FormItemElement"/>                      |
| rules       | 表单验证规则                                         | `FormItemRule[]`                                                      |
| render      | 渲染默认插槽                                         | `(slotProps: { item: FormColumn; view: boolean }) => VNode \| string` |
| renderError | 渲染错误插槽                                         | `(slotProps: { item: FormColumn; error: string }) => VNode \| string` |
| renderLabel | 渲染标签插槽                                         | `(slotProps: { item: FormColumn; label: string }) => VNode \| string` |
| view        | 是否为查看模式                                       | `boolean \| Ref<boolean> \| ComputedRef<boolean>`                     |
| formatter   | 查看模式下的格式化函数                               | `(item: FormColumn) => VNode \| string \| number`                     |
| rendered    | 条件渲染（v-if）                                     | `boolean \| Ref<boolean> \| ComputedRef<boolean>`                     |
| display     | 条件显示（v-show）                                   | `boolean \| Ref<boolean> \| ComputedRef<boolean>`                     |
| component   | 自定义动态组件                                       | `Component`                                                           |
| style       | 自定义样式                                           | `CSSProperties`                                                       |
| class       | 自定义类名                                           | `string`                                                              |
| span        | 表单项宽度占比，如 '1/2'                             | `string`                                                              |
| attrs       | 传递给表单项组件的属性                               | `Record<string, any>`                                                 |
| tooltip     | 标签提示信息                                         | `string`                                                              |
