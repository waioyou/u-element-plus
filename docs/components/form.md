# Form 表单

通过配置项（options）动态生成表单内容；包含了Element Plus表单组件中的所有组件，并支持对应组件所有的属性和事件。

包括如下组件：`el-autocomplete`、`el-cascader`、`el-checkbox-group`、`el-checkbox`、`el-color-picker`、`el-date-picker`、`el-datetime-picker`、`el-input`、`el-input-number`、`el-radio`、`el-radio-group`、`el-rate`、`el-select`、`el-select-v2`、`el-slider`、`el-switch`、`el-time-picker`、`el-time-select`、`el-transfer`、`el-tree-select`、`el-upload`以及拓展组件`u-section-header`。

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

## 获取表单数据

通过调用表单实例中的`getFormData`方法获取表单数据，并进行表单验证。

:::warning
如果表单项没有设置`value`属性，则在获取表单数据时会跳过该表单项。
:::

<preview path="../demo/form/form-data.vue"></preview>

## 自定义表单项

支持通过作用域插槽和表单项的`slot`属性来设置表单项的label、error、default插槽内容。

::: warning
作用域插槽优先级高于表单项的`slot`属性。
:::

<preview path="../demo/form/slot.vue"></preview>

## 查看模式

通过设置表单属性 `view` 属性来控制表单是否为查看模式。同时也可以通过设置表单项的`view`属性来控制表单项是否为查看模式。

可以通过表单项的`formatter`属性来自定义表单项查看模式的显示内容。

::: warning
表单属性 `view` 优先级高于表单项的 `view` 属性。
:::

<preview path="../demo/form/view.vue"></preview>

## 动态表单

可以通过表单`change`事件和表单项配置中的`if`和`show`字段进行结合，从而实现动态设置表单的展示。

`change`事件会在表单数据发生变化时触发，它有两个参数`name`为当前触发事件的表单项`prop`，`item`为表单项配置。

`if`和`show`值均为`boolean`，用于控制表单项的隐藏和现实，分别对应`v-if`和`v-show`

<preview path="../demo/form/dynamic.vue"></preview>

## 标签提示信息

通过配置`tooltip`属性来设置表单项的提示信息。

<preview path="../demo/form/tooltip.vue"></preview>

## API

支持`el-form`组件的属性、事件、插槽、对外暴露的方法；具体请查看[Element Plus Form 文档](https://element-plus.org/zh-CN/component/form.html)

以下只列举与`el-form`、`el-form-item`组件不同的属性、事件、插槽、对外暴露的方法。

### Props

| 名称      | 说明                                | 类型                             | 默认值       |
| --------- | ----------------------------------- | -------------------------------- | ------------ |
| options   | 表单配置项                          | `Record<string, FormItemOption>` | `{}`         |
| view      | 是否为查看模式                      | `boolean`                        | `false`      |
| gutter    | 栅格间隔                            | `number`                         | `20`         |
| ~~model~~ | 已废弃，请使用`v-model:options`代替 |                                  | 表单数据对象 |

### Events

| 事件名   | 说明                       | 参数类型                                                     |
| -------- | -------------------------- | ------------------------------------------------------------ |
| change   | 任一表单项值发生变化时触发 | `(field: string, item: FormItemOption) => void`              |
| validate | 任一表单项被校验后触发     | `(field: string, isValid: boolean, message: string) => void` |

### Slots

| 插槽名           | 说明             | 作用域参数                                |
| ---------------- | ---------------- | ----------------------------------------- |
| `label-${field}` | 自定义标签内容   | `{ item: FormItemOption, label: string }` |
| `error-${field}` | 自定义错误提示   | `{ item: FormItemOption, error: string }` |
| `${field}`       | 自定义表单项内容 | `{ item: FormItemOption}`                 |

### FormItemOption 配置项

<table style="width: 100%;">
    <tr>
        <th style="width: 30%;">名称</th>
        <th style="width: 30%;">说明</th>
        <th style="width: 40%;">类型</th>
    </tr>
    <tr>
        <td>element</td>
        <td>表单项类型，支持所有 Element Plus 表单组件及扩展组件</td>
        <td>
            <code>
                autocomplete、cascader、checkbox-group、checkbox、color-picker、date-picker、datetime-picker、input、input-number、radio、radio-group、rate、select、select-v2、slider、switch、time-picker、time-select、transfer、tree-select、upload、section-header
            </code>
        </td>
    </tr>
    <tr>
        <td>value</td>
        <td>表单项的值</td>
        <td><code>any</code></td>
    </tr>
    <tr>
        <td>label</td>
        <td>标签文本</td>
        <td><code>string</code></td>
    </tr>
    <tr>
        <td>required</td>
        <td>是否必填</td>
        <td><code>boolean</code></td>
    </tr>
    <tr>
        <td>rules</td>
        <td>表单验证规则</td>
        <td><code>FormItemRule[]</code></td>
    </tr>
    <tr>
        <td>attrs</td>
        <td>传递给表单项组件的属性</td>
        <td><code>object</code></td>
    </tr>
    <tr>
        <td>span</td>
        <td>表单项宽度占比，如 '1/2'</td>
        <td><code>string</code></td>
    </tr>
    <tr>
        <td>view</td>
        <td>是否为查看模式</td>
        <td><code>boolean</code></td>
    </tr>
    <tr>
        <td>if</td>
        <td>条件渲染（v-if）</td>
        <td><code>boolean | ((options: FormOptions) => boolean)</code></td>
    </tr>
    <tr>
        <td>show</td>
        <td>条件显示（v-show）</td>
        <td><code>boolean | ((options: FormOptions) => boolean)</code></td>
    </tr>
    <tr>
        <td>formatter</td>
        <td>查看模式下的格式化函数</td>
        <td><code>(value: any) => VNode | string | number</code></td>
    </tr>
    <tr>
        <td>component</td>
        <td>自定义动态组件</td>
        <td><code>Component</code></td>
    </tr>
    <tr>
        <td>style</td>
        <td>自定义样式</td>
        <td><code>CSSProperties</code></td>
    </tr>
    <tr>
        <td>class</td>
        <td>自定义类名</td>
        <td><code>string</code></td>
    </tr>
    <tr>
        <td>tooltip</td>
        <td>标签提示信息</td>
        <td><code>string</code></td>
    </tr>
    <tr>
        <td>slot</td>
        <td>插槽配置</td>
        <td><code>FormItemSlot</code></td>
    </tr>
</table>

:::details 查看 FormItemSlot 类型

```ts
type FormItemSlot = {
  label?: ({ item, label }: { item: FormItemOption; label: string }) => VNode | string | number
  error?: ({ item, error }: { item: FormItemOption; error: string }) => VNode | string | number
  default?: ({ item, view }: { item: FormItemOption; view: boolean }) => VNode | string | number
}
```
