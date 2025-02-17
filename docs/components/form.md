# Form 表单

通过配置项（options）动态生成表单内容； 支持所有 Element Plus 的表单组件, 以及拓展组件`title`。

## 基础用法

<preview path="../demo/form/basic.vue"></preview>

## 获取表单数据

<preview path="../demo/form/form-data.vue"></preview>

## 自定义表单项

<preview path="../demo/form/slot.vue"></preview>

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

::: info

1. 表单项的宽度可以通过 `span` 属性进行灵活控制，如 `1/2` 表示占据父容器的一半宽度。
2. 查看模式下，表单项会根据不同的类型自动转换为适合展示的格式。
3. 支持通过函数动态控制表单项的显示和渲染条件。
4. 获取表单数据时可以选择是否进行表单验证。
   :::
