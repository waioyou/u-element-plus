# Form 表单

通过配置项（options）动态生成表单内容；包含了Element Plus表单组件中的所有组件，并支持对应组件所有的属性和事件。

包括如下组件：`el-autocomplete`、`el-cascader`、`el-checkbox-group`、`el-checkbox`、`el-color-picker`、`el-date-picker`、`el-datetime-picker`、`el-input`、`el-input-number`、`el-radio`、`el-radio-group`、`el-rate`、`el-select`、`el-select-v2`、`el-slider`、`el-switch`、`el-time-picker`、`el-time-select`、`el-transfer`、`el-tree-select`、`el-upload`以及拓展组件`title`。

:::warning
在使用`el-checkbox`或`el-radio`组件时，请使用`el-checkbox-group`或`el-radio-group`组件，并在`attrs`中配置选项列表`options`。
:::

## 基础用法

通过表单配置选项生成一个基础的表单, 将对应的组件属性和事件设置在`attrs`字段中。如`placeholder、disabled、size`等等,具体请查看对应组件的Element Plus文档。

<preview path="../demo/form/basic.vue"></preview>

## 获取表单数据

<preview path="../demo/form/form-data.vue"></preview>

## 自定义表单项

<preview path="../demo/form/slot.vue"></preview>

## 查看模式

通过设置表单属性 `view` 属性来控制表单是否为查看模式。同时也可以通过设置表单项的`view`属性来控制表单项是否为查看模式。

表单属性 `view` 优先级高于表单项的 `view` 属性。

可以通过表单项的`formatter`属性来控制表单项查看模式显示的内容。

<preview path="../demo/form/view.vue"></preview>

## 动态表单

可以通过表单`change`事件和表单项配置中的`if`和`show`字段进行结合，从而实现动态设置表单的展示。<br/>
`change`事件会在表单数据发生变化时触发，它有两个参数`name`为当前触发事件的表单项`prop`，`item`为表单项配置。<br/>
`if`和`show`值均为`boolean`，用于控制表单项的隐藏和现实，分别对应`v-if`和`v-show`

<preview path="../demo/form/dynamic.vue"></preview>

## 标签提示信息

通过配置`tooltip`属性来设置表单项的提示信息。

<preview path="../demo/form/tooltip.vue"></preview>

## 布局

## API

### Props

| 名称          | 类型                            | 默认值    | 说明               |
| ------------- | ------------------------------- | --------- | ------------------ |
| options       | Record<string, FormItemOption>  | {}        | 表单配置项         |
| view          | boolean                         | false     | 是否为查看模式     |
| labelPosition | 'left' \| 'right' \| 'top'      | 'right'   | 标签的位置         |
| labelWidth    | string \| number                | 'auto'    | 标签的宽度         |
| disabled      | boolean                         | false     | 是否禁用表单       |
| size          | 'large' \| 'default' \| 'small' | 'default' | 表单项的尺寸       |
| scrollToError | boolean                         | false     | 是否滚动到错误字段 |

### FormItemOption 配置项

| 名称    | 类型                | 说明                                |
| ------- | ------------------- | ----------------------------------- |
| element | string              | 表单项类型，如 'input'、'select' 等 |
| value   | any                 | 表单项的值                          |
| label   | string              | 标签文本                            |
| rules   | Rule[]              | 验证规则                            |
| attrs   | object              | 传递给表单项的属性                  |
| span    | string              | 表单项宽度占比，如 '1/2'            |
| view    | boolean             | 是否为查看模式                      |
| if      | boolean \| Function | 条件渲染                            |
| show    | boolean \| Function | 条件显示                            |

### Events

| 事件名 | 说明               | 参数                                |
| ------ | ------------------ | ----------------------------------- |
| change | 表单项值变化时触发 | (key: string, item: FormOptionItem) |

### Methods

| 方法名      | 说明         | 参数                                             |
| ----------- | ------------ | ------------------------------------------------ |
| validate    | 验证表单     | (callback?: (valid: boolean) => void)            |
| resetFields | 重置表单     | -                                                |
| getFormData | 获取表单数据 | (validate?: boolean) => Promise<object \| false> |

### Slots

| 插槽名           | 说明             |
| ---------------- | ---------------- |
| `label-${field}` | 自定义标签内容   |
| `error-${field}` | 自定义错误提示   |
| `${field}`       | 自定义表单项内容 |

## 注意事项

::: tip

1. 表单项的宽度可以通过 `span` 属性进行灵活控制，如 `1/2` 表示占据父容器的一半宽度。
2. 查看模式下，表单项会根据不同的类型自动转换为适合展示的格式。
3. 支持通过函数动态控制表单项的显示和渲染条件。
4. 获取表单数据时可以选择是否进行表单验证。

:::
