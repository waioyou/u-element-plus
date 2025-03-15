# Table 表格

通过配置项（columns）动态生成表格内容；包含了Element Plus表格组件中的所有功能，并支持对应组件所有的属性和事件。

## 基础用法

通过表格配置选项生成一个基础的表格，将对应的列属性设置在`columns`字段中。

<preview  path="../demo/table/basic.vue"></preview>

## 自定义列模板

方式一：通过插槽形式自定义列内容。`UTable`组件会根据表格配置项中的`prop`字段，生成3种插槽，分别是`${prop}`、`header-${prop}`、`filter-icon-${prop}`。

方式二：通过表格配置项种的`formatter`属性自定义列内容；`renderHeader`属性自定义表头内容；`renderFilterIcon`属性自定义筛选图标。

::: warning
插槽优先级高于配置项（formatter、renderHeader、renderFilterIcon）。
:::

<preview  path="../demo/table/slot.vue"></preview>

## 多级表头

通过表格配置项 `children` 属性实现多级表头。

::: warning
表格配置项中的 prop支持 x.y.z形式的多级数据形式。
:::

<preview  path="../demo/table/grouping.vue"></preview>

## 序号

::: warning
对应的是el-table-column的type="index"。[请查看](https://element-plus.org/zh-CN/component/table.html#%E5%8D%95%E9%80%89)
:::

通过设置表格属性`showIndex`和`indexProps`；实现序号功能。

<preview  path="../demo/table/index.vue"></preview>

## 多选

::: warning
对应的是el-table-column的type="selection"。[请查看](https://plus-pro-components.com/components/table.html#%E5%A4%9A%E9%80%89)
:::

通过设置表格属性`showSelection`和`selectionProps`；实现多选功能。

<preview  path="../demo/table/selection.vue"></preview>

## 展开行

::: warning
对应的是el-table-column的type="expand"。[请查看](https://element-plus.org/zh-CN/component/table.html#%E5%B1%95%E5%BC%80%E8%A1%8C)
:::

通过设置表格属性`showExpand`和`expandProps`；以及结合表格插槽`expand`；实现展开行功能。

<preview  path="../demo/table/expand.vue"></preview>

## 表格操作栏

通过指定表格配置项中的`component`属性为`operation`，可以渲染表格操作栏。详细配置请查看[UOperation组件文档](../components/operation.md)。

<preview  path="../demo/operation/basic.vue"></preview>

## 渲染动态组件

通过设置表格配置项中的`component`属性，可以渲染动态组件。需要传入组件对象或者`operation`。

默认会传入表格列的配置项（`item`），以及表格列的插槽参数（`slotProps`）。

对于组件的`props`和`events`，可以通过表格配置项的`attrs`属性传入。

::: warning
在使用表格组件过程中，发现有很多重复的逻辑，可以考虑封装成一个组件，然后通过`component`属性渲染动态组件。如表格操作栏、时间日期格式化等
:::

<preview  path="../demo/table/component.vue"></preview>

## 表格编辑

通过设置 `editable` 属性开启表格编辑功能。同时在表格配置项中配置 `element` 属性设置对应的表单元素。

::: warning
可以通过配置项中的`attrs`属性设置表单元素的属性和事件。
:::

<preview  path="../demo/table/edit.vue"></preview>

## API

支持`el-table`组件的属性、事件、插槽、对外暴露的方法；具体请查看[Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html)

以下只列举与`el-table`组件不同的属性、事件、插槽、对外暴露的方法。

### Props

| 名称           | 说明           | 类型            | 默认值  |
| -------------- | -------------- | --------------- | ------- |
| columns        | 表格列配置列表 | `TableColumn[]` | `[]`    |
| editable       | 是否可编辑     | `boolean`       | `false` |
| showSelection  | 是否显示多选列 | `boolean`       | `false` |
| selectionProps | 选择列的属性   | `object`        | -       |
| showIndex      | 是否显示序号列 | `boolean`       | `false` |
| indexProps     | 序号列的属性   | `object`        | -       |
| showExpand     | 是否显示展开列 | `boolean`       | `false` |
| expandProps    | 展开列的属性   | `object`        | -       |

#### selectionProps

| 名称             | 说明                                     | 类型                            | 默认值 |
| ---------------- | ---------------------------------------- | ------------------------------- | ------ |
| width            | 列宽度                                   | `string \| number`              | -      |
| align            | 对齐方式                                 | `'left' \| 'center' \| 'right'` | -      |
| selectable       | 决定这一行的 CheckBox 是否可以勾选的函数 | `(row, index) => boolean`       | -      |
| reserveSelection | 是否保留选项的选中状态                   | `boolean`                       | -      |

#### indexProps

| 名称         | 说明             | 类型                                    | 默认值 |
| ------------ | ---------------- | --------------------------------------- | ------ |
| label        | 显示的标题       | `string`                                | -      |
| width        | 列宽度           | `string \| number`                      | -      |
| align        | 对齐方式         | `'left' \| 'center' \| 'right'`         | -      |
| index        | 自定义索引方法   | `number \| ((index: number) => number)` | -      |
| formatter    | 自定义格式化方法 | `Function`                              | -      |
| renderHeader | 自定义表头方法   | `Function`                              | -      |
| sortable     | 是否可排序       | `boolean \| 'custom'`                   | -      |
| sortMethod   | 排序方法         | `Function`                              | -      |
| sortOrders   | 排序顺序         | `Array`                                 | -      |

#### expandProps

| 名称  | 说明       | 类型                            | 默认值 |
| ----- | ---------- | ------------------------------- | ------ |
| label | 显示的标题 | `string`                        | -      |
| width | 列宽度     | `string \| number`              | -      |
| align | 对齐方式   | `'left' \| 'center' \| 'right'` | -      |

### Events

| 事件名         | 说明           | 参数                                                      |
| -------------- | -------------- | --------------------------------------------------------- |
| validate       | 表单验证事件   | `(valid: boolean, invalidFields?: any) => void`           |
| validate-field | 表单项验证事件 | `(prop: string, valid: boolean, message: string) => void` |

### Slots

| 插槽名                | 说明                         | 作用域参数                |
| --------------------- | ---------------------------- | ------------------------- |
| `${prop}`             | 自定义列内容                 | `{ row, column, $index }` |
| `header-${prop}`      | 自定义表头内容               | `{ column, $index }`      |
| `filter-icon-${prop}` | 自定义筛选图标               | `{ column, $index }`      |
| `expand`              | 展开行内容                   | `{ row, column, $index }` |
| `empty`               | 空数据时的内容               | -                         |
| `append`              | 插入至表格最后一行之后的内容 | -                         |

### TableColumnOption 配置项

| 名称                | 说明                                 | 类型                                              | 默认值 |
| ------------------- | ------------------------------------ | ------------------------------------------------- | ------ |
| prop                | 字段名称                             | `string`                                          | -      |
| label               | 显示的标题                           | `string`                                          | -      |
| width               | 对应列的宽度                         | `string \| number`                                | -      |
| minWidth            | 对应列的最小宽度                     | `string \| number`                                | -      |
| fixed               | 列是否固定                           | `'left' \| 'right' \| boolean`                    | -      |
| if                  | 是否渲染该列                         | `boolean \| ComputedRef<boolean> \| Ref<boolean>` | -      |
| children            | 多级表头的子列                       | `TableColumn[]`                                   | -      |
| component           | 动态组件                             | `Component`                                       | -      |
| element             | 表单元素类型                         | `FormItemElement`                                 | -      |
| rules               | 表单校验规则                         | `FormItemRule[]`                                  | -      |
| required            | 是否必填                             | `boolean`                                         | -      |
| attrs               | 对应的表单元素属性或者动态组件属性   | `Record<string, any>`                             | -      |
| formatter           | 自定义格式化                         | `Function`                                        | -      |
| renderHeader        | 自定义表头                           | `Function`                                        | -      |
| renderFilterIcon    | 自定义过滤图标                       | `Function`                                        | -      |
| sortable            | 对应列是否可以排序                   | `boolean \| 'custom'`                             | -      |
| sortBy              | 指定数据按照哪个属性进行排序         | `string \| string[] \| Function`                  | -      |
| sortOrders          | 数据在排序时所使用排序策略的轮转顺序 | `Array`                                           | -      |
| sortMethod          | 对数据进行排序的时候使用的方法       | `Function`                                        | -      |
| resizable           | 对应列是否可以通过拖动改变宽度       | `boolean`                                         | -      |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip       | `boolean \| object`                               | -      |
| align               | 对齐方式                             | `'left' \| 'center' \| 'right'`                   | -      |
| headerAlign         | 表头对齐方式                         | `'left' \| 'center' \| 'right'`                   | -      |
| className           | 列的 className                       | `string`                                          | -      |
| labelClassName      | 当前列标题的自定义类名               | `string`                                          | -      |
| filters             | 数据过滤的选项                       | `Array<{ text: string, value: string }>`          | -      |
| filterPlacement     | 过滤弹出框的定位                     | `string`                                          | -      |
| filterClassName     | 过滤弹出框的 className               | `string`                                          | -      |
| filterMultiple      | 数据过滤的选项是否多选               | `boolean`                                         | -      |
| filterMethod        | 数据过滤使用的方法                   | `Function`                                        | -      |
| filteredValue       | 选中的数据过滤项                     | `string[]`                                        | -      |
